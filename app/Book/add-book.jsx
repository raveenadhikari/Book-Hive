import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, doc, getDocs, query, setDoc } from '@firebase/firestore';
import { db, storage } from '../index';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getAuth } from '@firebase/auth';

export default function AddBook() {

    const [image,setImage] =useState(null);
    const [email, setEmail] = useState('');
    const [categoryList,setCategoryList] =useState([]);
    const [name,setName] =useState();
    const [autherName,setAutherName] =useState();
    const [isbn,setIsbn] =useState();
    const [website,setWebsite] =useState();
    const [about,setAbout] =useState();
    const [category,setCategory] =useState();
    const [loading,setLoading]=useState(false);


    useEffect(()=>{
        GetCategoryList();
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email);
        }


    },[])

    const onImagePick=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            
            
            quality: 1,
            
          });
          console.log(result);
          setImage(result?.assets[0].uri);
    }
    const GetCategoryList=async()=>{
        setCategoryList([])
        const q=query(collection(db,'Category'));
        const snapShot =await getDocs(q);

        const categories = [];
        snapShot.forEach((doc) => {
            console.log(doc.data());
            categories.push({
                label: doc.data().name,
             value: doc.data().name,
            });
        });

        setCategoryList(categories);

    }
    const onaddNewBook=async()=>{
        setLoading(true);
        const fileName=Date.now().toString()+".jpg";
        const resp =await fetch(image);
        const blob=await resp.blob();

        const imageRef =ref(storage,'Bookhive/'+fileName);

        uploadBytes(imageRef,blob).then((snapshot)=>{
            console.log("File Uploaded")
        }).then(resp=>{
            getDownloadURL(imageRef).then(async(downloadUrl)=>{
                console.log(downloadUrl);
                saveBookDetail(downloadUrl)
            })
            
        })
        setLoading(false);

    }
    const saveBookDetail=async(imageUrl)=>{
        await setDoc(doc(db,'BookList',Date.now().toString()),{
            name:name,
            auther:autherName,
            isbn:isbn,
            category:category,
            about:about,
            website:website,
            userEmail:email,
            imageUrl:imageUrl
            
        })
        setLoading(false);
        ToastAndroid.show("New Book Added",ToastAndroid.LONG)

    }



  return (
    <ScrollView style={{ padding: 20 ,height:2000}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Fill all the detals in order to add a new book</Text>

      <TouchableOpacity
      onPress={()=>onImagePick()}
      style={{ alignSelf: 'center', marginBottom: 20 }}
      
      >
            {!image?<Image source={require('./../../assets/images/image.png')} 
            style={{
                width: 150,
                height: 200,
                borderRadius: 8,
                backgroundColor: 'grey',
            }}
            />:
            <Image source={{uri:image}}
            style={{
                width: 150,
                height: 200,
                borderRadius: 8,
                backgroundColor: 'grey',
            }}
            />}
      </TouchableOpacity>

      <View style={{
        height:1000
      }}>
        <TextInput placeholder='Book-Name'
        placeholderTextColor={'grey'} 
        onChangeText={(v)=>setName(v)}
        style={{
            borderWidth: 1,
            padding: 10,
            margin: 5,
            borderRadius: 10,
            borderColor: '#ccc'
        }}
        />
        <TextInput placeholder='Auther'
        placeholderTextColor={'grey'}  
        onChangeText={(v)=>setAutherName(v)}
        style={{
            borderWidth: 1,
            padding: 10,
            margin: 5,
            borderRadius: 10,
            borderColor: '#ccc'
        }}
        />
        <TextInput placeholder='ISBN' 
        placeholderTextColor={'grey'} 
        onChangeText={(v)=>setIsbn(v)}
        style={{
            borderWidth: 1,
            padding: 10,
            margin: 5,
            borderRadius: 10,
            borderColor: '#ccc'
        }}
        />
        
        <TextInput placeholder='WebSite' 
        placeholderTextColor={'grey'} 
        onChangeText={(v)=>setWebsite(v)}
        style={{
            borderWidth: 1,
            padding: 10,
            margin: 5,
            borderRadius: 10,
            borderColor: '#ccc'
        }}
        />
        <TextInput placeholder='About' 
        placeholderTextColor={'grey'} 
        onChangeText={(v)=>setAbout(v)}
        multiline
        numberOfLines={5}
        style={{
            borderWidth: 1,
            padding: 10,
            margin: 5,
            height: 100,
            borderRadius: 10,
            borderColor: '#ccc'
        }}
        />
        <View style={{ margin: 5 }}>
            <RNPickerSelect
                onValueChange={(value) => setCategory(value)}
                items={categoryList}
                
            />

            <TouchableOpacity 
            disabled={loading}
            onPress={()=>onaddNewBook()}
            style={{
                padding: 15,
                backgroundColor: 'orange',
                margin: 10,
                borderRadius: 20,
                alignItems: 'center'
            }}
            >
                {loading?
                <ActivityIndicator size={'large'} color={'orange'}/>:
                
                <Text
                style={{
                    color:'white',
                    textAlign:'center'
                }}>Add New Book</Text>}


            </TouchableOpacity>

        

        </View>
      </View>
      
      
      
      

      
    </ScrollView>
  )
}