import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Modal, Card } from 'flowbite-react';

const CardItem = (props) => {
  const [isAdd, setIsAdd] = useState(false);

  return (
    <>
      <div
        className="menu-card"
        key={'card_' + props.index}
        onClick={() => {
          window.open(
            '/menu?collection=' +
              props.card_link +
              '&type=' +
              props.card_title.replaceAll(' ', '_'),
            '_blank'
          );
          // getData();
          // setIsAdd(true);
        }}
      >
        <div className="card-img">
          <img
            src={props.card_img}
            alt=""
            className="h-full rounded-md-20 shadow"
          ></img>
        </div>
        <div className="center-content">
          <h2 className="text-2xl mb-2">{props.card_title}</h2>
          <p className="mb-2">{props.card_desc}</p>
        </div>
        {/* <Button
          color="light"
          pill={true}
          onClick={() => {
            getData();
            setIsAdd(true);
          }}
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </Button> */}
      </div>
      {/* <Modal show={isAdd} onClose={() => setIsAdd(false)}>
        <Modal.Header>{props.card_title}</Modal.Header>
        <Modal.Body>
          <div className="overflow-auto h-80 font-mono">
          
          </div>
        </Modal.Body>
        <Modal.Footer className="font-mono">
          <Button color="light" onClick={() => setIsAdd(false)}>
            OK
          </Button>
          <Button color="gray" onClick={() => setIsAdd(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default CardItem;
