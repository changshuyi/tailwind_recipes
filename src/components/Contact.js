import React, { useState, useEffect } from 'react';

import CardItem from './CardItem';
import jsonFile from '../jsonfile/recipes_category.json';

const Contact = () => {
  const [allData, setAllData] = useState({});

  const getData = () => {
    fetch('/api/goodfoodcategory', {})
      .then((response) => response.json())
      .then((data) => {
        setAllData(data?.data);
      });
  };

  const readJson = () => {
    setAllData(jsonFile?.data);
    console.log('jsonFile = ', jsonFile);
  };

  useEffect(() => {
    // getData();
    readJson();
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        {allData.length > 0 &&
          allData?.map((item, index) => {
            return (
              <CardItem
                key={'card_' + index}
                card_title={item.card_title}
                card_desc={item.card_desc}
                card_img={item.card_img}
                card_link={item.card_link}
              />
            );
          })}
      </div>
    </>
  );
};

export default Contact;
