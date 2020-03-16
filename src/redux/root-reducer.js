import {combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';

//imports localStorage. SessionStorage is in another package
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'

const persistConfig = {
    key: 'root',
    //this means that it'll be using localStorage to save data
    storage,
    //this is the list of reducers you want saved in your storage
    whiteList: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer);