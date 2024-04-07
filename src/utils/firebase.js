// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk2DagXpC6joknLv20FddyknKq-eAbaDw",
  authDomain: "portfolio-4c77a.firebaseapp.com",
  projectId: "portfolio-4c77a",
  storageBucket: "portfolio-4c77a.appspot.com",
  messagingSenderId: "723074063272",
  appId: "1:723074063272:web:e6cea97540356175845b9d",
  measurementId: "G-GGZ72Z4XX6"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const storage = getStorage();

const firebase = {

  upload(references){
    
    //referenciando midia
    const reference = []
    let i = 0;
    references.forEach(element => {
      
      reference[i] = ref(storage, element);

      i++;
    });

    reference.forEach(element => {
      
      uploadBytes(element, )

    });

  }

}

export {firebase};