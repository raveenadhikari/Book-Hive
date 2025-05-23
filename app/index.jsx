
import { Text, View ,StyleSheet,TextInput,Button,ScrollView} from "react-native";
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,setPersistence, browserLocalPersistence  } from '@firebase/auth';
import React, { useState, useEffect } from 'react';
import { Redirect } from "expo-router";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from '@firebase/storage';

const firebaseConfig = {

  apiKey: "AIzaSyDDnCEOuIqwIsmXn0baOuAJCb0gG7f6iBs",

  authDomain: "react-10297.firebaseapp.com",

  projectId: "react-10297",

  storageBucket: "react-10297.appspot.com",

  messagingSenderId: "649290080513",

  appId: "1:649290080513:web:0fe5e58283957a2acd3b00",

  measurementId: "G-W71D2XZ71F"

};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const db =getFirestore(app);
export const storage =getStorage(app);




const AuthScreen= ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View options ={{headerShown :false}}

      style={styles.authContainer}
    >
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={'grey'} 
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={'grey'} 
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>



    </View>
  );
}

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <Redirect href={{ pathname: '/home', params: { email: user.email,username: user.displayName } }} />
    //<Redirect href={'/home'} />
    //<Redirect href={{ pathname: '/home', query: { email: user.email } }} />

    
    //<View style={styles.authContainer}>
      //<Text style={styles.title}>Welcome</Text>
      //<Text style={styles.emailText}>{user.email}</Text>
     // <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
    //</View>
  );
};

export default index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  //const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  
  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});