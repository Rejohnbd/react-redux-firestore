import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//Reducers
//@todo

//Firebase Config
const firebaseConfig = {

};

//react-redux-firebase Config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true    //Firestore for Profile Instead of Realtime DB
};

//Initialize firebase instance
firebase.initializeApp(firebaseConfig);
//Initialize friestore
// const firestore = firebase.firestore();

//Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),    //firebase instance as first argument
    reduxFirestore(firebase)                    
)(createStore);

//Add firebase to reducer
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

//Create Initial State
const intitialState = {};

//Create Store
const store = createStoreWithFirebase(rootReducer, intitialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;