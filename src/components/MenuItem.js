import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';

const MenuItem = (props) => {
  const { collectionItem } = props;
  const [isAdd, setIsAdd] = useState(false);
  const [contentItems, setContentItems] = useState();

  const openRecipe = (cardLink) => {
    getData(cardLink);
    setIsAdd(true);
  };

  const getData = (cardLink) => {
    fetch('/api/goodfoodrecipescontact', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardLink: cardLink,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setContentItems(data?.data);
        console.log('contentItems = ', contentItems);
      });
  };

  return (
    <>
      <div className="flow-root">
        <ul className="divide-y divide-gray-300 px-5 sm:px-8">
          {collectionItem.length > 0 &&
            collectionItem?.map((item, index) => {
              return (
                <>
                  <li
                    className="py-3 px-5 sm:py-4 sm:px-8 hover:bg-yellow-50 cursor-pointer"
                    key={item.card_title + '_' + index}
                    onClick={() => {
                      openRecipe(item.card_link);
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          className="h-28 w-28 rounded-full"
                          src={item.card_img}
                          alt={item.card_title + 'image'}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {item.card_title}
                        </p>
                        <p className="truncate text-sm text-gray-500 ">
                          {item.card_desc}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        {item.card_rating}
                      </div>
                    </div>
                  </li>
                </>
              );
            })}
        </ul>
      </div>
      <Modal size="5xl" show={isAdd} onClose={() => setIsAdd(false)}>
        <Modal.Header>
          <div className="text-4xl text-gray-300 font-mono">
            {contentItems.title}
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="overflow-auto h-80 display: flex text-gray-300 font-mono">
            <section className="p-1 mx-5 w-1/3">
              <h2 className="text-3xl mb-2">Ingredients</h2>
              <div>
                <ul className="divide-y divide-gray-500">
                  {contentItems?.ingredients?.length > 0 &&
                    contentItems?.ingredients?.map((item, index) => {
                      return (
                        <li className="py-1" key={index}>
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </section>
            <section className="p-1 mx-5 w-2/3">
              <h2 className="text-3xl mb-2">Method</h2>
              <div>
                <ul className="divide-y divide-gray-500">
                  {contentItems?.method?.length > 0 &&
                    contentItems?.method?.map((item, index) => {
                      return (
                        <li key={index} className="py-1">
                          <span className="text-2xl">
                            {item?.steps_heading}
                          </span>
                          <div>{item?.steps_editor_conten}</div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer className="font-mono">
          <Button color="light" onClick={() => setIsAdd(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MenuItem;
