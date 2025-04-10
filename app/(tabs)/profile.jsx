import { StyleSheet, Text, View,Button, Image  } from 'react-native'
import React , { useEffect, useState } from 'react'
import { getAuth, signOut } from '@firebase/auth';
import { useRouter } from 'expo-router';
import UserIntro from '../../components/Profle/UserIntro';
import MenuList from '../../components/Profle/MenuList';


function Profile() {
  const auth = getAuth(); // Initialize auth here
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully!');
      router.replace('/'); // Redirect to login page or another screen
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        setEmail(user.email);
    }
}, []);

  return (
    <View style={{ padding: 20 }}>
      <UserIntro/>
      <MenuList/>
      
      
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
}

export default Profile;