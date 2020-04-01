import React from "react";

import CollectionItem from "../collection-item/collection-item.component";
import { Link } from "react-router-dom";

import "./collection-preview.styles.scss";

const CollectionPreview = ({ match, title, items,routeName }) => (
  <div className="collection-preview">
    <h1 className="title"><Link to={`${match.path}/${routeName}`}>{title.toUpperCase()}</Link></h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item}></CollectionItem>
        ))}
    </div>
  </div>
);

export default CollectionPreview;
