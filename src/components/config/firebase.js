

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "weather-dashboard-c4b05.firebaseapp.com",
    projectId: "weather-dashboard-c4b05",
    storageBucket: "weather-dashboard-c4b05.firebasestorage.app",
    messagingSenderId: "617558209904",
    appId: "1:617558209904:web:c03cca9ec30d9c789dcbb5",
    measurementId: "G-EV8ZPQM36X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//auth and db initialization
export const auth = getAuth(app);
export const db = getFirestore(app);