import firebase from "firebase/app";
import "firebase/storage";
try {
  firebase.initializeApp({
    apiKey: "AIzaSyAaxgPQIhxzY0df_51sT_NLZiIuYZ_aKeI",
    authDomain: "social-media-website-13b03.firebaseapp.com",
    databaseURL: "https://social-media-website-13b03.firebaseio.com/",
    storageBucket: "gs://social-media-website-13b03.appspot.com",
  });
} catch (error) {
  console.error(error.message);
}

const storage = firebase.storage();
export { storage, firebase as default };
