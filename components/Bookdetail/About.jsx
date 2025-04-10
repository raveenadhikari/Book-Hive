import { View, Text, ScrollView } from 'react-native'
import React from 'react'

export default function About({book}) {
  return (
    <ScrollView 
    style={{
      backgroundColor: '#fff',
      padding: 20,
      marginVertical: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>About</Text>
      <Text style={{ fontSize: 16, lineHeight: 24, color: '#555' }}>{book?.about}</Text>
    </ScrollView>
  )
}