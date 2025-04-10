import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function PopularBookCard({book}) {
  const router =useRouter();
  return (
    <TouchableOpacity
    onPress={()=>router.push("/bookdetail/"+book?.id)}
    style={{
        marginLeft: 15,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: 160
    }}>
      <Image source={{uri:book?.imageUrl}}
      style={{
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10
      }}
      />
      <View style={{ marginBottom: 8 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 4
          }}>{book.name}</Text>
        <Text style={{
            fontSize: 14,
            color: '#666'
          }}>{book.auther}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 8 }}>
        <Image source={require('./../../assets/images/star.png')} 
        style={{
            width: 15,
            height: 15,
            marginRight: 5
          }}
        />
        <Text style={{
            fontSize: 14,
            color: '#666'
          }}>4.5(14)</Text>
      </View>
      <View>
        <Text style={{
            fontSize: 12,
            color: '#999'
          }}>{book.category}</Text>
      </View>
    </TouchableOpacity>
  )
}