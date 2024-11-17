// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"; // Using addDoc to add users
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase App only if it hasn't been initialized yet
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDB = getDatabase(app);

const userRef = collection(db, 'Users');
const itemRef = collection(db, 'Items');

export const fetchItems = async () => {
  const snapshot = await getDocs(itemRef);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

// Add new item to Firestore
export const postItem = async (itemData) => {
  await addDoc(itemRef, { ...itemData, userId: auth.currentUser.uid });
};

// Delete an item by ID
export const deleteItem = async (itemId) => {
  await deleteDoc(doc(db, 'Items', itemId));
};


// Fetching users from Firestore (just for demonstration, this would be in your app logic)
const fetchUsers = async () => {
  try {
    const snapshot = await getDocs(userRef);
    let users = [];
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    console.log(users); // Log users to console (or update state)
  } catch (err) {
    console.log(err.message);
  }
};

// Fetching items from Firestore (just for demonstration, this would be in your app logic)
const consoleFetchItems = async () => {
  try {
    const snapshot = await getDocs(itemRef);
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });
    console.log(items); // Log users to console (or update state)
  } catch (err) {
    console.log(err.message);
  }
};

consoleFetchItems();

// Export for use in other components
export { auth, db, realtimeDB, fetchUsers};