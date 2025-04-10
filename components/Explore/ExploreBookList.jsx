import { View, Text, FlatList } from 'react-native'
import React from 'react'
import BookListCard from './BookListCard'

export default function ExploreBookList({bookList}) {
    const numColumns = 3;
    const groupedBooks = [];
  for (let i = 0; i < bookList.length; i += numColumns) {
    groupedBooks.push(bookList.slice(i, i + numColumns));
  }
  return (
    
    <View  >
      <FlatList 
      data={bookList}
      renderItem={({item,index})=>(
        <View >
            
            <BookListCard 
            key={index}
            book={item}/>


        </View>
      )}
      />
    </View> 
    
  )
}