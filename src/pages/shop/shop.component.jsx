import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import { connect } from "react-redux";
import {updateCollections} from "../../redux/shop/shop.actions.js";

import WithSpinner from '../../components/with-spinner/with-spinner.component'

import {
  firestore,
  convertCollectionSnapshotToMap
} from "../../firebase/firebase.utils";


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
  state = {
    loading: true
  }

  unsubscribeFromSnapshop = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({loading: false})
    });
  }

  render() {
    const { match } = this.props;
    const { isLoading } = this.props;

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => 
          <CollectionsOverviewWithSpinner isLoading = {isLoading} {...props} />} />
        <Route
          path={`${match.path}/:collectionId`} render={(props) => 
          <CollectionPageWithSpinner isLoading = {isLoading} {...props} />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
