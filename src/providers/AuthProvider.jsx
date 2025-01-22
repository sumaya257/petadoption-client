import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null)
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

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
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])
    
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