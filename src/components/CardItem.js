import React from 'react';

const CardItem = (props) => {
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
      </div>
    </>
  );
};

export default CardItem;
