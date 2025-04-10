import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React ,{ useEffect,useState} from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import About from './About';
import Ionicons from '@expo/vector-icons/Ionicons';
import { deleteDoc,doc } from '@firebase/firestore';
import { db } from '../../app/index';
import { getAuth } from '@firebase/auth';

export default function Intro({book}) {
    const navigation = useNavigation();
    const {name} = useLocalSearchParams();
    const [email, setEmail] = useState('');
    useEffect(()=>{


        navigation.setOptions({
            headerShown:true,
            
            
            
        })
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email);
        }
        
    },[])

    const OnDelete=()=>{
      Alert.alert('Do you want to delete?','Are you sure you want to delete this book?',[
        {
          text:'Cancel',
          style:'cancel'
        },
        {
          text:'Delete',
          style:'destructive',
          onPress:()=>deleteBook()

  

        }
      ])

    }
    const deleteBook=async()=>{
      console.log('Book deleted');
      await deleteDoc(doc(db,'BookList',book?.id))
      router.back();
      ToastAndroid.show('Book deleted',ToastAndroid.LONG)
      
    }
  return (
    <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#f8f8f8' }}>
      
      <Image source={{uri:book?.imageUrl}} 
      style={{
        width: '65%',
        height: 370,
        resizeMode: 'cover',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        marginBottom: 20,
      }} />
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>{book?.name}</Text>
        <Text style={{ fontSize: 18, color: 'gray' }}>{book?.auther}</Text>
        {email==book?.userEmail &&<TouchableOpacity
        onPress={()=>OnDelete()}
        >
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>}
      </View>
    </View>
  )
}