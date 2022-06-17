import React, { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem';

const Menu = () => {
  const [collectionItem, setCollectionItem] = useState({});

  const queryParams = new URLSearchParams(window.location.search);
  const collection = queryParams.get('collection');
  const type = queryParams.get('type');

  const getData = () => {
    fetch('/api/goodfoodcollection', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: collection,
        type: type,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data?.data = ', data?.data);
        setCollectionItem(data?.data);
      });
  };

  const readJson = () => {
    const jsonData = require('../jsonfile/recipes_collection' +
      type.replace(':', '') +
      '.json');
    setCollectionItem(jsonData?.data);
  };

  useEffect(() => {
    // getData();
    readJson();
  }, []);

  return (
    <>
      {/* <div className="h-screen flex justify-center items-center bg-green-100"> */}
      <MenuItem collectionItem={collectionItem} key={type} />
      {/* <Card> */}

      {/* </Card> */}
      {/* </div> */}
    </>
  );
};

export default Menu;
