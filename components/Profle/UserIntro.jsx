import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth } from '@firebase/auth';

export default function UserIntro() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email);
        }
    }, []);
  return (
    <View>
      <Image source={require('./../../assets/images/profile-user.png')} 
      style={{
        width:150,
        height:150,
        alignSelf:'center'
      }}
      />
      <Text
      style={{
        fontSize:20,
        textAlign:'center',
        marginBottom:100
      }}>{email}</Text>
    </View>
  )
}