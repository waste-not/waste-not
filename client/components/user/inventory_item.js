import React, { Component } from 'react';

const InventoryItem = (props) => {
  return (
    <li key={props.id}>
      <strong>{props.title}</strong>
    </li>
  );

}

export default InventoryItem;
