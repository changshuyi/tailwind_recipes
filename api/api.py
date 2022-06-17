from datetime import time
import bs4
import os  # 判斷文件存在
import requests
import json
from flask import Flask, request, jsonify

app = Flask(__name__, static_folder='../build', static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/goodfoodcategory')
def get_recipes_category():
    url = "https://www.bbcgoodfood.com/recipes/category/all-healthy"
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    params = {}
    response = requests.get(url, headers=headers, params=params)
    soup = bs4.BeautifulSoup(response.text, "html.parser")
    # print(soup)
    recipes_contact = soup.find_all('article', class_='card text-align-left card--with-borders')

    data_list=[]
    for recipes_contact_card in recipes_contact:
        recipes_contact_card_img = recipes_contact_card.find('img')['src']
        # print('recipes_contact_card_img = ', recipes_contact_card_img)
        recipes_contact_card_desc = recipes_contact_card.find('p').getText()
        # print('recipes_contact_card_desc = ', recipes_contact_card_desc)
        recipes_contact_card_link = recipes_contact_card.find('a')['href']
        # print('recipes_contact_card_link = ', recipes_contact_card_link)
        recipes_contact_card_title = recipes_contact_card.find('h2').getText()
        # print('recipes_contact_card_title = ', recipes_contact_card_title)
        data_list.append({'card_link':recipes_contact_card_link , 'card_title': recipes_contact_card_title,'card_img':recipes_contact_card_img , 'card_desc': recipes_contact_card_desc})
  
        # content = recipes_contact_card.getText()
        # print('content = ', content)
    json_string = json.dumps({'data': data_list})
    # 爬完匯入到json檔
    save_path = 'D:/tailwind_recipes/src/jsonfile'
    complete_name = os.path.join(save_path,'recipes_category.json')         
    with open(complete_name, 'w') as outfile:
        outfile.write(json_string)

    return jsonify({'data': data_list})

@app.route('/api/goodfoodcollection', methods=['GET', 'POST'])
def get_recipes_collection():
    url = "https://www.bbcgoodfood.com" + request.get_json()['collection']
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    params = {}
    response = requests.get(url, headers=headers, params=params)
    soup = bs4.BeautifulSoup(response.text, "html.parser")
    # print(soup)
    recipes_collection = soup.find_all('article', class_='card text-align-left card--horizontal card--inline')

    data_list=[]
    for collection_contact_card in recipes_collection:
        collection_contact_card_img = collection_contact_card.find('img')['src']
        # print('collection_contact_card_img = ', collection_contact_card_img)
        collection_contact_card_desc = collection_contact_card.find('p').getText()
        # print('collection_contact_card_desc = ', collection_contact_card_desc)
        collection_contact_card_link = collection_contact_card.find('a')['href']
        # print('collection_contact_card_link = ', collection_contact_card_link)
        collection_contact_card_title = collection_contact_card.find('h2').getText()
        # print('collection_contact_card_title = ', collection_contact_card_title)
        collection_contact_card_rating = collection_contact_card.find('span', class_='rating__count-text body-copy-small').getText()
        data_list.append({'card_rating': collection_contact_card_rating,'card_link':collection_contact_card_link , 'card_title': collection_contact_card_title,'card_img':collection_contact_card_img , 'card_desc': collection_contact_card_desc})

    json_string = json.dumps({'data': data_list})
    # 爬完匯入到json檔
    save_path = 'D:/tailwind_recipes/src/jsonfile'
    complete_name = os.path.join(save_path,'recipes_collection'+request.get_json()['type'].replace(":", ""))         
    if os.path.exists(complete_name):
        with open(complete_name+'.json', 'r') as outfile:
            old_data = outfile.read()

    with open(complete_name +'.json', 'w') as outfile:
        outfile.write(json_string)

    return jsonify({'data': data_list})

@app.route('/api/goodfoodrecipescontact', methods=['GET', 'POST'])
def get_recipes_contact():
    url = "https://www.bbcgoodfood.com" + request.get_json()['cardLink']
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    params = {}
    response = requests.get(url, headers=headers, params=params)
    soup = bs4.BeautifulSoup(response.text, "html.parser")
    # print(soup)
    recipes_title = soup.find_all('h1', class_='heading-1')
    recipes_ingredients_items = soup.find_all('li', class_='pb-xxs pt-xxs list-item list-item--separator')
    recipes_method_items = soup.find_all('li', class_='pb-xs pt-xs list-item')
    
    ingredients=[]
    method=[]

    for title in recipes_title:
        title_text = title.getText()

    for items in recipes_ingredients_items:
        ingredients_items = items.getText()
        ingredients.append(ingredients_items)

    for steps in recipes_method_items:
        steps_heading = steps.find('span').getText()
        steps_editor_conten = steps.find('div').getText()
        method.append({'steps_heading': steps_heading, 'steps_editor_conten': steps_editor_conten})

    json_string = json.dumps({'data': {'title':title_text, 'ingredients':ingredients, 'method':method}})
    # # 爬完匯入到json檔
    save_path = 'D:/tailwind_recipes/src/jsonfile'
    complete_name = os.path.join(save_path,'recipes_contact_'+title_text)         
    if os.path.exists(complete_name):
        with open(complete_name+'.json', 'r') as outfile:
            old_data = outfile.read()

    with open(complete_name +'.json', 'w') as outfile:
        outfile.write(json_string)

    return jsonify({'data': {'title':title_text, 'ingredients':ingredients, 'method':method}})

if __name__ == '__main__':
    app.run(debug=True)
