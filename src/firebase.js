import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "shop-aa77a.firebaseapp.com",
  projectId: "shop-aa77a",
  storageBucket: "shop-aa77a.appspot.com",
  messagingSenderId: "669524439125",
  appId: "1:669524439125:web:1250476715e23793e7e4dc"
};

const app = initializeApp(firebaseConfig);

export default app