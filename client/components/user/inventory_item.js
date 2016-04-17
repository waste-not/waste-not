import React, { Component } from 'react';

const InventoryItem = (props) => {
  return (
    <div key={props.id} className="column is-half">
      <article className="card is-fullwidth inv-item inv-claimed">
        <header className="card-header is-fullwidth">
          <h3 className="card-header-title">
            {props.title}
          </h3>
        </header>
        <div className="card-content">
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          </div>
        </div>
        <footer className="card-footer">
          <a className="card-footer-item">Contact donor</a>
          <a className="card-footer-item">Remove</a>
        </footer>
      </article>
    </div>
  );

}

export default InventoryItem;
