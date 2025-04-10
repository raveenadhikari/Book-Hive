import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, limit, query } from '@firebase/firestore'
import {db} from './../../app/index'
import PopularBookCard from './PopularBookCard';
export default function PopulerBooks() {

    const [bookList,setBookList] =useState([]);

    useEffect(()=>{
        GetBookList();
    },[])

    const GetBookList =async()=>{

        setBookList([]);
        

        const q=query(collection(db,'BookList'),limit(10));
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setBookList(prev=>[...prev,{id:doc.id, ... doc.data()}])

        })

    }
  return (
    <View>
        <View style={{
            
            marginLeft:15,
            marginTop:10,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
            

        }}> 
        <Text style={{
            fontSize:18,
            fontWeight:'bold',
            
        }} >Newly Added ..</Text>
        
        </View>

        <FlatList
        data={bookList}
        horizontal={true}
        renderItem={({item,index})=>(
            <PopularBookCard
            key ={index}
            book ={item}
            />
        )}

        />
      
    </View>
  )
}