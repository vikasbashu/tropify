import { createContext, useContext, useEffect, useState} from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider
} from "firebase/auth";
import { 
    getDatabase, 
    set, 
    ref,
    child,
    get, 
    onValue
} from "firebase/database";
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc
} from "firebase/firestore";
import {getStorage,
   ref as storageRef,
    uploadBytes,
  getDownloadURL
} from "firebase/storage";
import {getMessaging, getToken} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDDx2FIXbWkTRJLo3B45r5L4KQBVqhdMhY",
  authDomain: "tropify-1c360.firebaseapp.com",
  projectId: "tropify-1c360",
  storageBucket: "tropify-1c360.appspot.com",
  messagingSenderId: "683496918732",
  appId: "1:683496918732:web:8cd3776c53624f7acfbc69",
  databaseURL: "https://tropify-1c360-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const FirebaseContext = createContext(null);
const storage = getStorage(app);
const messaging = getMessaging(app);


export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

  const [user, setUser] = useState(null);
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
       user ? setUser(user) : setUser(null);
  });
  },[]);  

  const signUpUserWithEmailAndPassword = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  const storeDataDB = (key, data) => {
    set(ref(db, key), data);
  };
  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  }
  const signUpWithGithub = () => {
    signInWithPopup(auth, githubProvider).then((resp)=>{
        const credential = GithubAuthProvider.credentialFromResult(resp);
        const token = credential.accessToken;
        const user = resp.user;
        return [credential, token, user, resp];
    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        return [errorCode, errorMessage, email, credential, error];
    });
  }
  const userLoginStatus = () => {
    if(user) return user;
    else return null;
  }
  const writeDataInFireStore = async(key, data) => {
    await addDoc(collection(firestore, key), data);
  }
  const getDocument = async(key, id) => {
    const snap = await getDoc(doc(firestore, key, id));
    return snap.data();
  }
  const getDocumentsByQuery = async(key, condition) => {
    const snap = await getDocs(query(collection(firestore, key), condition));
    return snap;
  }
  const updateDocumentRecord = async(key, docId, data) => {
    return await updateDoc(doc(firestore, key, docId), data);
  }
  const fetchDataFromRDB = async(key) => {
    const sanp = await get(child(ref(db), key));
    return sanp.val();
  }
  const fetchRealTimeData = (key) => {
    let snap = null;
    onValue(ref(db, key), (snapshot) => {
        snap = snapshot.val();
    })
    return snap;
  }
  const addDataInStorage = async (dir_path, data_file) => {
    const uploadResult = await uploadBytes(storageRef(storage, `${dir_path}/${Date.now()}-${data_file}`), data_file);
    return uploadResult;
  }
  const getStorageDataUrl = (path)=> {
    return getDownloadURL(storageRef(storage, path));
  }
  const generateToken = async () => {
    return await getToken(messaging, {vapidKey: "BKu-83W3zJlU7giQrr5kxfPSs7J9pko6CMB7yesAnMbWFA4cH5GcLNzseEmNxwbPCOmOGDzpv0rcn_91VHye7GY"});
  }
  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        storeDataDB,
        loginUser,
        signUpWithGoogle,
        userLoginStatus,
        onAuthStateChanged,
        signOut,
        writeDataInFireStore,
        getDocument,
        getDocumentsByQuery,
        updateDocumentRecord,
        fetchDataFromRDB,
        fetchRealTimeData,
        signUpWithGithub,
        addDataInStorage,
        getStorageDataUrl,
        where
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
