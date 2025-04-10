import { View, Text,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from '@firebase/firestore'
import {db} from './../../app/index'
import { FlatList } from 'react-native';

export default function Slider() {

    const [sliderList,setsliderList] =useState([]);

    useEffect(() =>{
        GetSliderList();

    },[]);

    const GetSliderList=async() =>{
        setsliderList([]);
        const q=query(collection(db,'Slider'));
        const querySnapshot =await getDocs(q)

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setsliderList(prev => [...prev,doc.data()]);
        })

    }
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{
          fontWeight: 'bold',
          fontSize: 18, // Increased font size for emphasis
          paddingLeft: 15,
          marginBottom: 10, // Added space below the title
          color: '#333', // Darker text color for better readability
          paddingTop:10
        }}>#Whats Happening this Week ...</Text>
      <FlatList
          data ={sliderList}
          horizontal={true}
          style ={{
            paddingLeft:15
          }}
          renderItem={({item,index})=>(

            <View
            style={{
              shadowColor: '#000', // Black shadow for depth
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5, // For Android shadow
              borderRadius: 15,
              marginRight: 15,
            }}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                height: 180, // Slightly taller images
                width: 280, // Slightly wider images
                borderRadius: 15,
              }}
            />
          </View>
          )}
        />
    </View>
  )
}