import React from "react";

const ListGroup = props => {
  const {
    valueProperty,
    textProperty,
    items,
    selectedItem,
    onItemSelect
  } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={
            item[textProperty] === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(item[textProperty])}
        >
          {item[valueProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
