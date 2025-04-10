import { View, Text, TextInput, TouchableOpacity, ToastAndroid, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-native-ratings'
import { arrayUnion, doc, updateDoc } from '@firebase/firestore';
import { db } from '../../app/index';
import { getAuth } from '@firebase/auth'


export default function Reviews({book}) {
    
    const [email, setEmail] = useState('');

    
    
    const [rating,setRating] =useState(4);
    const [userInput,setUserInput] =useState();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email);
        }
    }, []);


    const onSubmit=async()=>{
        const docRef = doc(db,'BookList',book?.id)
        await updateDoc(docRef,{
            reviews:arrayUnion({
                rating:rating,
                Comment:userInput,
                userEmail:email
            })

        })
        ToastAndroid.show('Review added sucess',ToastAndroid.BOTTOM)


    }
  return (
    <View style={{ backgroundColor: '#fff', padding: 20, marginVertical: 20, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
        
        
      <View style={{ marginBottom: 20 }}>
        <Rating

            ratingCount={10}
            
            imageSize={20}
            showRating={true}
            onFinishRating={(rating)=>setRating(rating)}
            style={{ paddingVertical: 10 }}
            />
            <TextInput 
                placeholder='Write a Review ...'
                placeholderTextColor={'grey'}
                multiline={true}
                numberOfLines={4}
                onChangeText={(value)=>setUserInput(value)}
                style={{
                    borderWidth: 1,
                    borderColor: 'lightgray',
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 10,
                    backgroundColor: '#f9f9f9',
                    textAlignVertical: 'top',
                  }}
            />
            <TouchableOpacity
            disabled={!userInput}
            onPress={()=>onSubmit()}
            style={{
                padding: 15,
                borderRadius: 10,
                backgroundColor: 'orange',
                marginTop: 15,
                alignItems: 'center',
              }}>
                <Text 
                style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                    Submit
                </Text>

            </TouchableOpacity>
            
        </View>

        <View style={{ marginTop: 20 }}>
                {book?.reviews?.map((item, index) => (
                    <View key={index} style={{
                        marginBottom: 15,
                        padding: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                        backgroundColor: '#f7f7f7',
                        borderRadius: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                      }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{item.userEmail}</Text>
                        
                        <Rating style={{
                            alignSelf:'flex-start'
                        }}
                        imageSize={15}
                        ratingCount={item.rating}
                        
                        />
                        <Text style={{ color: '#555' }}>rating :{item.rating}</Text>
                        <Text style={{ color: '#555' }}>{item.Comment}</Text>
                    </View>
                ))}
            </View>
    </View>
  )
}