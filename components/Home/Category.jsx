import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, query } from '@firebase/firestore'
import {db} from './../../app/index'
import CategoryItem from './CategoryItem';
import { useRouter } from 'expo-router';

export default function Category({explore=false,onCategorySelect}) {

    const [categoryList,setCategoryList] = useState([]);
    const router = useRouter();

    useEffect(() =>{
        getCategoryList()
    },[])

    const getCategoryList = async() =>{
        setCategoryList([])
        const q=query(collection(db,'Category'));
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc) =>{
            console.log(doc.data());
            setCategoryList(prev=>[...prev,doc.data()])

        })
    }
    {/*router.push('/booklist/'+item.name) */}
    const onCategoryPressHandler=(item)=>{
      if(!explore)
      {
        router.push('/booklist/'+item.name)
      }
      else
      {
        onCategorySelect(item.name)

      }
    }
  return (
    <View>
      {!explore&&
        <View style={{
            
                marginLeft:15,
                marginTop:10,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between'
                

            }}> 
            <Text style={{
                fontSize:18,
                fontWeight:'bold',
                
            }} >Category</Text>
            <Text style={{
                marginRight:15,
                color:'orange'
            }}>View All</Text>
      </View>}

      <FlatList
      style={{
        marginLeft:10
      }}
      data={categoryList}
      horizontal={true}
      renderItem={({item,index})=>(
        <CategoryItem 
        category={item}
         key={index}
         onCategoryPress={(item)=>
          onCategoryPressHandler(item)
         }/>
      )}
      
      />
    </View>
    
  )
}