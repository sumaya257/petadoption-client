import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from '../firebase/firebase.config';

export const AuthContext = createContext(null)
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(email,password)
    }
    const logOut = () =>{
        setLoading(loading)
        return signOut(auth)
    }

    useEffect(()=>{
       const unsubscribe =  onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            console.log(currentUser)
            setLoading(false)
        })
        return()=>{
            return unsubscribe()
        }
    },[])

    const authInfo={
            user,
            loading,
            createUser,
            signIn,
            logOut
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                 {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;