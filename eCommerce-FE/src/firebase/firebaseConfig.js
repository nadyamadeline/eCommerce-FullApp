import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBBJ8TQQqh26RYkKSACsxluYoHyJpTiKQA",
  authDomain: "canopynco.firebaseapp.com",
  projectId: "canopynco",
  storageBucket: "canopynco.appspot.com",
  messagingSenderId: "782354900904",
  appId: "1:782354900904:web:c21cce17f6829853c0df9d",
};
// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();

// export { storage, firebase as default };
