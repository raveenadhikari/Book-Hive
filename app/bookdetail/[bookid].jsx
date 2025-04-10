import { View, Text, ActivityIndicator, ScrollView ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation  } from 'expo-router'
import { collection, doc, getDoc, query } from '@firebase/firestore';
import { db } from '../index';
import Intro from '../../components/Bookdetail/Intro';
import Actionbutton from '../../components/Bookdetail/Actionbutton';
import About from '../../components/Bookdetail/About';
import Reviews from '../../components/Bookdetail/Reviews';

export default function BookDetail() {

    const {bookid,name} =useLocalSearchParams();
    const [book,setBook]=useState();
    const [loading,setloading]=useState(false);
    const navigation = useNavigation();

    useEffect(()=>{
        GetBookDetailById();

    },[])

    const GetBookDetailById =async() =>{
        setloading(true);

        

        const docRef = doc(db,"BookList",bookid)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            
            const bookData = { id: docSnap.id, ...docSnap.data() };
            setBook(bookData);
            navigation.setOptions({ title: bookData.name });
            
            setloading(false);
        }else{
            console.log("No such a document !");
            setloading(false);
        }

    }
    const renderItem = ({ item }) => {
        if (item === 'Intro') return <Intro book={book} />;
        if (item === 'Actionbutton') return <Actionbutton book={book} />;
        if (item === 'About') return <About book={book} />;
        if (item === 'Reviews') return <Reviews book={book} />;
        return null;
      };

  return (
    
    <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: '#f2f2f2' }}>
        {loading?
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            
            <ActivityIndicator
            size={'large'}
            color={'orange'}
            style={{
                marginTop:'50%'
            }}
            />
        </View>:
        <View>
            <Intro book={book}/>
            <Actionbutton book={book}/>
            <About book={book}/>
            <Reviews book={book} />
        </View>

    }

      
    </ScrollView>
    
   /*
    <>
    {loading ? (
      <ActivityIndicator
        size="large"
        color="orange"
        style={{
          marginTop: '50%',
        }}
      />
    ) : (
      <FlatList
        data={['Intro', 'Actionbutton', 'About','Reviews']} // Render components as items in FlatList
        renderItem={renderItem}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingBottom: 20 }} // Add padding to avoid clipping
      />
    )}
  </>
    */
   
  )
}