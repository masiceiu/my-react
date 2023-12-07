import React, { Children, createContext, useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";

import { app, db } from "../Firebase/Firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
const config = {
  apiUrl: import.meta.env.VITE_API_URL
}
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  //newUserCreate
  const newUser1 = () => {
    let url = `${config.apiUrl}users`;
    console.log(url);
  }
  const newUser = (email, password, username, useUrl, mobile, address) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: useUrl,
          phoneNumber: mobile,
        })
          .then(() => {
            const req = {
              auth:{ is_authourize: true },
              data:{
              //email, password, username, useUrl,mobile,address
              email: user.email,
              username: user.displayName,
              useUrl: user.photoURL,
              mobile: mobile,
              address: address,
     
            }};
            //console.log(req)
            /*
            const req = {
              //email, password, username, useUrl,mobile,address
              email: user.email,
              username: user.displayName,
              useUrl: user.photoURL,
              mobile: mobile,
              address: address,
            };*/
            fetch(`${config.apiUrl}users`, {
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify(req)
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
          })
          .catch((error) => {});
          //setUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  //login
  const login = (email, password) => {
    //setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //onAuth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);



  const logout = ()=>{
    signOut(auth).then(() => {
      }).catch((error) => {
      });
}
/**********************************************************/
  // Get a list of  from your database
  // Get a list of cities from your database
  /*async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
  }*/
  const getUsers = (db) => {
    let id = 0;
    if(!id){
      id = setTimeout(()=>
      {  
          console.log(id);
          console.log(db);
      },100)
    }
    /*const reqUsers = collection(db, 'users');
    const data = reqUsers.then((res)=>res.json())
    console.log(data);
    return data;*/
  }
  //getUsers(db);
  const addToDb = async(model) =>{
    try{
      const docRef = await addDoc(collection(db,'users'), model);
      //alert("wellcome new user create successfully")
      console.log("Document written with ID: ", docRef.id);
    }catch(error){
      console.error("Error adding document:", error);
    }
  }

 async function getAllUsers() {
    const usersCollection = collection(db, "users"); // Assuming "users" is the collection name
    const querySnapshot = await getDocs(usersCollection);

    const users = [];
     querySnapshot.forEach((doc) => {
       // Get data from each user document
       let userData = doc.data();
       users.push(userData);
     });
     return users;
   }
/********************************************************************/
  const information = {
    user,
    loading,
    newUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={information}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
