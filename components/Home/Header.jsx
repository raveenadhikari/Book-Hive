import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useLocalSearchParams ,useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform, StatusBar } from 'react-native';

export default function Header() {

    const { email, username } = useLocalSearchParams();
  return (
    <View style={{
        backgroundColor: '#FFA07A', // Light orange background color
        paddingTop: Platform.OS === 'ios' ?  44 : StatusBar.currentHeight + 16, // Add padding for iOS notch
        paddingBottom: 24, // Increase bottom padding for more height
        paddingHorizontal: 16,
      }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <Image source={require('./../../assets/images/profile-user.png')}
        style={{
            width: 40,
            height: 40,
            marginRight: 12,
          }}
        />
        <View style={{ flexDirection: 'column' }}>
            <Text style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
          }}>Welcome !</Text>
            <Text style={{
            color: 'white', // Highlighted email text color (Gold)
            fontSize: 16,
          }}>{email}</Text>
        </View>
        


      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', // White background for the search bar
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
      }}>
      <Ionicons name="search" size={24} color="black" style={{ marginRight: 8 }}/>
      <TextInput 
       placeholder='Search'
       placeholderTextColor="gray"
          style={{
            flex: 1,
            color: 'black', // Black text color in the search input
          }}/>
      </View>
    </View>
  );
}