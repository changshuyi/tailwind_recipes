import React, { useState, useEffect } from 'react';
// import SandwitchOne from '../images/sandwitch_1.jpg';

import { Button, Modal, Pagination } from 'flowbite-react';
import CardItem from './CardItem';

const Contact = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState({});

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const getData = () => {
    fetch('/api/goodfoodcategory', {
      // method: 'POST',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((data) => {
        setAllData(data?.data);
      });
  };

  useEffect(() => {
    getData();
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
        {/* <Pagination
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
          showIcons={true}
        /> */}
      </div>
    </>
  );
};

export default Contact;
