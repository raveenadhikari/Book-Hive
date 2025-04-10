import React from 'react'
import { Text, View ,Button, ScrollView} from 'react-native'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import  { useState, useEffect } from 'react';
import { useLocalSearchParams ,useRouter } from 'expo-router';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import PopulerBooks from '../../components/Home/PopulerBooks';
import Header from '../../components/Home/Header';




function home() {
    const { email, username } = useLocalSearchParams();
    const auth = getAuth(); // Initialize auth here
    const router = useRouter()
   
    const handleAuthentication = async () => {
      try {
        await signOut(auth);
        console.log('User logged out successfully!');
        router.replace('/');
        // Handle post-logout actions, e.g., navigate back to login screen
      } catch (error) {
        console.error('Logout error:', error.message);
        
      }
    };
    const navigateToReviews = () => {
      router.push({
          pathname: '../../components/Bookdetail/Reviews.jsx', // Adjust this path according to your folder structure
          params: { email, username }
      });
  }
 
  
  return (
    <ScrollView>

        <Header/>
        <Slider/>

        <Category/>

        <PopulerBooks/>

        



       
        



    </ScrollView>
    
  )
}

export default home