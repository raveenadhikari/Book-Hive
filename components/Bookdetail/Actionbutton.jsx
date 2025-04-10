import { View, Text, FlatList, Image, TouchableOpacity, Share, Linking } from 'react-native'
import React from 'react'

export default function Actionbutton({book}) {
    const actionButtonmenu=[
    {
        id:1,
        name:'Read',
        icon :require('./../../assets/images/open-book.png')

    },
    {
        id:2,
        name:'TBR',
        icon :require('./../../assets/images/TBR.png')

    },
    {
        id:3,
        name:'Web',
        icon :require('./../../assets/images/website.png'),
        url:book?.website


    },
    {
        id:4,
        name:'Share',
        icon:require('./../../assets/images/share.png')

    }
    ]

    const OnPressHandle=(item) =>{
        if(item.name =='Share')
        {
            Share.share({
                message:book?.name+"\n"+book?.website
            }
                
            )
            return ;
        }else if(item.name=='Web')
        {
            Linking.openURL(item.url);
        }
    }


  return (
    <View
    style={{ backgroundColor: '#fff', padding: 20, marginVertical: 20, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
        
            <FlatList
            data={actionButtonmenu}
            horizontal={true}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{width:'100%',justifyContent:'space-evenly'}}
            renderItem={({item,index})=>(
                <TouchableOpacity onPress={() => OnPressHandle(item)}>
                    <Image source={item?.icon}
                    style={{
                        width: 50,
                        height: 50,
                        marginBottom: 5,
                      }}
                    />
                    <Text style={{ fontSize: 16, color: '#333' }}>{item?.name}</Text>
                </TouchableOpacity>
            )}
            />
      
    </View>
  )
}