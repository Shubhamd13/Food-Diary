import React from 'react';
import { createContext, useState, useEffect, useContext } from "react";
import { signInWithPopup,
	signOut, 
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	onAuthStateChanged  } from "firebase/auth";
import { auth,app } from "../firebase";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

        const [loading, setLoading] = useState(true)
        const [user, setUser] = useState(null)

        useEffect(() => {
			checkUserStatus()
         }, [])

         const loginUser = async (userInfo) => {
			try{
				const userCredential = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
				setUser(userCredential.user);
				console.log(user);
			}catch(error){
				console.error("Error signing up with email:", error);
			}
			
		 }

         const logoutUser = async () => {
			try{
				const result = await signOut(auth);
				setUser(null);
			}catch(error){
				console.error("Error signing out :", error);
			}

		 }

         const registerUser = async (userInfo) => {}

         const checkUserStatus = async () => {
			onAuthStateChanged(auth,(currentUser)=>{
				if(currentUser){
					setUser(currentUser);
					console.log("Already logged in "+currentUser.uid);
				}else{

				}
	
			});
            setLoading(false)

		 }
         const googleLogin = async () => {
			try {
				const provider = new GoogleAuthProvider();
				const result = await  signInWithPopup(auth,provider);
				setUser(result.user);
				console.log(user.displayName);
				console.log("Successfully signed up with Google!");
			  } catch (error) {
				console.error("Error signing up with Google:", error);
			  }
		 }
		 

        const contextData = {
            user,
            loginUser,
            logoutUser,
            registerUser,
			googleLogin
        }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

//Custom Hook
export const useAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;