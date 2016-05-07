import React, { PropTypes } from 'react';

const InventoryItem = props => {

  const {
    item: { title, description, claimedBy },
    claimInventory,
    unclaimInventory
  } = props;

  return (
    <div className="column is-half">
      <article className="card is-fullwidth inv-item inv-claimed">
        <header className="card-header is-fullwidth">
          <h3 className="card-header-title">
            {title}
          </h3>
        </header>
        <div className="card-content">
          <div className="content">
            {description}
          </div>
        </div>
        <footer className="card-footer">
          <a className="card-footer-item">Contact donor</a>
          {claimedBy ?
            <a
              className="card-footer-item"
              onClick={unclaimInventory.bind(null, props.item)}>Remove</a> :
            <a
              className="card-footer-item"
              onClick={claimInventory.bind(null, props.item)}>Claim</a>
          }
        </footer>
      </article>
    </div>
  );
};

InventoryItem.propTypes = {
  item: PropTypes.object,
  claimInventory: PropTypes.func,
  unclaimInventory: PropTypes.func
};

export default InventoryItem;
