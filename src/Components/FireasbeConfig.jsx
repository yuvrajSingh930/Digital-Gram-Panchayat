import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-s-HUoWp5oK3-ozKKZ-ZamzkPFk2s61c",
  authDomain: "projectone-34f66.firebaseapp.com",
  projectId: "projectone-34f66",
  storageBucket: "projectone-34f66.appspot.com",
  messagingSenderId: "595054027159",
  appId: "1:595054027159:web:c5efbb406a0ceede21a4d2",
  measurementId: "G-9RVZKWDYJ3",
  databaseURL: "https://projectone-34f66-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
