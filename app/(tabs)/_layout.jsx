import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='home'
        options={{
            headerShown:false,
            tabBarLabel:'Home',
            tabBarIcon:({color}) => <Ionicons name="home" size={24} color={color} />
        }}
        />
        <Tabs.Screen name='explore'
        options={{
            headerShown:true,
            tabBarLabel:'Explore',
            tabBarIcon:({color}) => <Ionicons name="search" size={24} color={color} />
        }}
        />
        <Tabs.Screen name='profile'
        options={{
            headerShown:true,
            tabBarLabel:'Profile',
            tabBarIcon:({color}) => <Ionicons name="people-circle" size={24} color={color} />
        }}
        />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})