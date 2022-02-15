import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAM2xca6IGFzBQn5g4mP8pEsjoorVsQmP0",
  authDomain: "shop-aa77a.firebaseapp.com",
  projectId: "shop-aa77a",
  storageBucket: "shop-aa77a.appspot.com",
  messagingSenderId: "669524439125",
  appId: "1:669524439125:web:1250476715e23793e7e4dc"
};

const app = initializeApp(firebaseConfig);

export default app