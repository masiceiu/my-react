import React, { Children, createContext, useEffect, useState } from "react";
import { app } from "../Firebase/Firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  //newUserCreate
  const newUser = (email, password, username, useUrl, mobile, Address) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: useUrl,
          phoneNumber: mobile,
        })
          .then(() => {
            const userInformation = {
              //email, password, username, useUrl,mobile,Address
              email: user.email,
              username: user.displayName,
              useUrl: user.photoURL,
              mobile: mobile,
              Address: Address,
            };
            fetch("http://localhost:5000/users", {
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify(userInformation)
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
          })
          .catch((error) => {});
        setUser(user);
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
