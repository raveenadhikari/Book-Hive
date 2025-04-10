import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function MenuList() {

    const menuList=[
        {
            id:1,
            name:'Add Books',
            icon :require('./../../assets/images/add.png'),
            path:'/Book/add-book'
        },
        {
            id:2,
            name:'My Books',
            icon :require('./../../assets/images/myBooks.png'),
            path:'/Book/my-book'
        },
        {
            id:3,
            name:'Read',
            icon :require('./../../assets/images/open-book.png'),
            path:''
        },
        {
            id:4,
            name:'TBR',
            icon :require('./../../assets/images/TBR.png'),
            path:''
        }
    ]
    const router =useRouter();
    const onMenuClick=(item)=>{
        router.push(item.path)

    }
  return (
    <View>
      <FlatList
      data={menuList}
      numColumns={2}
      renderItem={({item,index})=>(
        <TouchableOpacity
        onPress={()=>
            onMenuClick(item)
        }
        style={{
            
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10,
            flex:1,
            padding:10
        }}>
            <Image source={item.icon}
            style={{
                width:50,
                height:50
            }} 
            />
            <Text>
                {item.name}
            </Text>


        </TouchableOpacity>
      )}
      />
    </View>
  )
}