import { createSelector } from "reselect";

const selectShopItems = state => state.shop;

export const selectCollections = createSelector(
  [selectShopItems],
  shopItemsList => shopItemsList.collections
);

export const selectCollection = collectionUrlParam => 
  createSelector([selectCollections], collections =>
    collections[collectionUrlParam]
  );
