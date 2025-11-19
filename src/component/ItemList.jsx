import React from "react";

export default function ItemList({ items }) {
  if (!items.length) {
    return <p className="empty"> No Items found</p>;
  }
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.id} className="list-item">
          {item.title}
          <span className="cat">{item.catagory}</span>
        </li>
      ))}
    </ul>
  );
}
