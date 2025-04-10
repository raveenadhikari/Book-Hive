import { View, Text, FlatList } from 'react-native'
import React,{ useEffect, useState }  from 'react'
import { getAuth } from '@firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db, storage } from '../index';
import BookListCard from '../../components/Explore/BookListCard';


export default function MyBook() {
    const [email, setEmail] = useState('');
    const [bookList,setBookList] =useState([]);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email);
        }
        email&&getUserBook()


    },[email])

    const getUserBook=async()=>{
        setBookList([]);
        const q=query(collection(db,'BookList'),where('userEmail','==',email));
        const querrySnapshot=await getDocs(q);
        querrySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setBookList(prev=>[...prev,{id:doc.id,...doc.data()}])
        })

    }

   
  return (
    <View>
      
      <FlatList
      data={bookList}
      onRefresh={getUserBook}
      refreshing={loading}
      renderItem={({item,index})=>(
        <BookListCard book={item}
        key={index}
        />
      )}
      />
    </View>
  )
}