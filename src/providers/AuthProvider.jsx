import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';

export const AuthContext = createContext(null)
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()

    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const updateUserProfile = async (name, image) => {
        try {
            // Ensure the user is authenticated
            if (auth.currentUser) {
                // Update the user's profile with the new name and photo
                await updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: image,
                });
    
                // Update the local user state with the updated information
                setUser({ ...auth.currentUser, displayName: name, photoURL: image });
            }
        } catch (error) {
            console.error('Failed to update user profile:', error.message);
        }
    };
    

    const logOut = () =>{
        setLoading(loading)
        return signOut(auth).finally(() => {
            setLoading(false); // Set loading to false after logout completes
        });
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
            logOut,
            updateUserProfile,
            googleSignIn
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