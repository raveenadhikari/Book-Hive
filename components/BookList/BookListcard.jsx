import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function BookListcard({book}) {

  const router =useRouter();

  return (
    <TouchableOpacity style={{
      padding: 10,
      margin: 10,
      borderRadius: 15,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start', // Align items to the top
      overflow: 'hidden',
    }}
    onPress={()=>router.push("/bookdetail/"+book.id)}
    >
      <Image source={{uri:book.imageUrl}}
      style={{
        width: 120,
        height: 180,
        borderRadius: 10,
        marginRight: 15, // Space between image and text
      }} />
      <View>
      <View style={{ flex: 1 }}>
        <Text style={{
            fontSize: 18, // Increased font size for book name
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 6,
            flexShrink: 1, // Prevent text overflow
            width:230,

          }} numberOfLines={2} >{book.name}</Text>
        <Text style={{
          fontSize: 14,
          color: '#666',
          marginBottom: 4,
        }}>{book.auther}</Text>
        <Text style={{
          fontSize: 14,
          color: '#666',
          marginBottom: 4,
        }}>
          {book.category}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <Image source={require('./../../assets/images/star.png')} 
        style={{
          width: 15,
          height: 15,
          marginRight: 4,
        }}
        />
        <Text style={{
            fontSize: 14,
            color: '#666'
          }}>4.5(14)</Text>
      </View>

      </View>
      
      
    </TouchableOpacity>
  )
}