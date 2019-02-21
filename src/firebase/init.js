import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "",
  authDomain: "tx-smoothies.firebaseapp.com",
  databaseURL: "https://tx-smoothies.firebaseio.com",
  projectId: "tx-smoothies",
  storageBucket: "tx-smoothies.appspot.com",
  messagingSenderId: "461167611336"
};
const firebaseApp=firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots:true})

//export firestore
export default firebaseApp.firestore();
