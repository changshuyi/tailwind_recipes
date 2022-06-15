import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Modal } from 'flowbite-react';

const MenuItem = (props) => {
  const { collectionItem } = props;
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
                    onClick={() => {}}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
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
    </>
  );
};

export default MenuItem;
