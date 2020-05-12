import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

firebase.initializeApp({
    apiKey: "AIzaSyBE1duE9mbrhN63jtMXhL4aEB3uiTjKEp4",
    authDomain: "seat-reservation-2600f.firebaseapp.com",
    databaseURL: "https://seat-reservation-2600f.firebaseio.com",
    projectId: "seat-reservation-2600f",
    storageBucket: "seat-reservation-2600f.appspot.com",
    messagingSenderId: "388339566174",
    appId: "1:388339566174:web:e78985f80112b5b94dd6cf",
    measurementId: "G-SQ70TTDCYC"
});
export const fireauth = firebase.auth()
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const firebaseApp = firebase;

export default firebase;