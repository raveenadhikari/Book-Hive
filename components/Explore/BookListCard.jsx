import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function BookListCard({book}) {
    const router = useRouter();
  return (
    <TouchableOpacity
    onPress={()=>router.push("/bookdetail/"+book.id)}
    style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    }}
    >
      <Image source={{uri:book?.imageUrl}}
      style={{
        width: 80,
        height: 120,
        borderRadius: 8,
        marginRight: 10,
    }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: 4,
                }}>
            {book.name}
        </Text>
        <Text style={{
                    fontSize: 16,
                    color: '#666',
                    marginBottom: 4,
                }}>
            {book.auther}
        </Text>
        <Text style={{
                    fontSize: 14,
                    color: '#999',
                }}>Genre: {book.category}</Text>
      </View>
    </TouchableOpacity>
  )
}