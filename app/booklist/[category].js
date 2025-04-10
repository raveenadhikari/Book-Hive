import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, doc, getDocs, query, where } from '@firebase/firestore';
import { db } from '../index';
import BookListcard from '../../components/BookList/BookListcard';

export default function BookListByCategory() {

    const navigation = useNavigation();
    const {category} = useLocalSearchParams();

    const [bookList,setBookList]=useState([]);
    const [loading,setLoading] = useState(false);


    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:category
        })
        getBookList()
    },[])

    const getBookList=async()=>{
        setLoading(true)
        const q=query(collection(db,'BookList'),where("category","==",category));
        const querySnapshot =await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data())
            setBookList(prev=>[...prev,{id:doc?.id, ... doc.data()}])
            
        })
        setLoading(false);
    }



  return (
    <View>

      {bookList?.length>0 && loading == false?
      <FlatList
      data={bookList}
      onRefresh={getBookList}
      refreshing={loading}
      renderItem={({item,index})=>(
        <BookListcard
        book={item}
        />

      )}
      
      />:
      loading?<ActivityIndicator
      size={'large'}
      color={'orange'}
      style={{
        marginTop:'50%'
      }}
      
      />:
      <Text
      style={{
        fontSize:20,
        fontWeight:'bold',
        color:'grey',
        textAlign:'center',
        marginTop:30
      }}>No Books Found !</Text>}
    </View>
  )
}