import React, { createContext, useEffect, useState } from 'react';
import {   createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword,  signOut } from "firebase/auth";
import app from '../Firebase/firebase.config';



export const AuthenticationContext = createContext(null);

export const auth = getAuth(app);

const AuthenticationProvider = ({children}) => {
    
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
  
    
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, loggedUser => {
          
            setUser(loggedUser);
            
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    const authenticationInfo = {
        user,
        setLoading,
        loading,
        registerUser,
        logIn,
        logOut
     
    }

    return (
        <AuthenticationContext.Provider value={authenticationInfo}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;