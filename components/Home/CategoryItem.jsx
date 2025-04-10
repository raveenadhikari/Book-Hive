import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CategoryItem({category,onCategoryPress}) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
        <View style={{
            padding:15,
            
            
        }}>
            <Image
            source={{uri:category.icon}}
            style={{
                width:50,
                height:44,
                borderRadius:10
            }}
            />
            <Text
            style={{
                alignItems:'center',
                paddingLeft:2,
                fontSize:13,
                paddingTop:3
            }}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  )
}