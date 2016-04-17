import React, { Component } from 'react';

const InventoryDonorItem = (props) => {
  return (
    <div key={props.id} className="column is-half">
      <article className="card is-fullwidth inv-item inv-active">
        <header className="card-header is-fullwidth">
          <h3 className="card-header-title">
            {props.title}
          </h3>
        </header>
        <div className="card-content">
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
            <br />
            <small>2 hours remaining</small>
          </div>
        </div>
        <footer className="card-footer">
          <a className="card-footer-item">Contact donor</a>
          <a className="card-footer-item">Claim</a>
        </footer>
      </article>
    </div>
  );
}

export default InventoryDonorItem;
