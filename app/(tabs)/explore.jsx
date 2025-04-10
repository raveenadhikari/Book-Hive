import { StyleSheet, Text, View , TextInput} from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Category from '../../components/Home/Category';
import { collection, doc, getDocs, query, where } from '@firebase/firestore';
import { db } from '../index';
import ExploreBookList from '../../components/Explore/ExploreBookList';

const explore = () => {
  const [bookList,setBookList] =useState([]);
  const getBookByCategory=async(category)=>{
    setBookList([]);
    const q=query(collection(db,'BookList'),where('category','==',category))
    const querrySnapshot = await getDocs(q);
    querrySnapshot.forEach((doc)=>{
      console.log(doc.data())
      setBookList(prev=>[...prev,{id:doc.id,...doc.data()}])
    })
  }


  return (
    <View>
      {/* Seach Bar */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', // White background for the search bar
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth:1,
        borderColor:'grey',
        margin:15
      }}>
      <Ionicons name="search" size={24} color="black" style={{ marginRight: 8 }}/>
      <TextInput 
       placeholder='Search ...'
       placeholderTextColor="gray"
          style={{
            flex: 1,
            color: 'black', // Black text color in the search input
          }}/>
      </View>

      {/* Category*/}
      <Category
      explore={true}
      onCategorySelect={(category)=>
        getBookByCategory(category)
      }
      />
      

      {/* Business List */}
      <ExploreBookList bookList={bookList}/>

    </View>
  )
}

export default explore

const styles = StyleSheet.create({})