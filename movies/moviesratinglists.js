import React, { useState } from "react";
import { View,Text ,StyleSheet, TextInput,Button} from "react-native-web";
import axios from "axios";
export default function List(){
// const [movie,setmovie]=useState('');

// const fun2=async()=>{
//     try{
//       const{data}=await axios.get("http://localhost:3000/api/rating/get",{movie})
//       console.log(data);
//      // navigation.navigate('ratings')
//     }catch(err){
//       console.log(err);
//     }
    return (
        <View style={styles.container}>
            <Text><h2>moviesRatingList</h2></Text>
            {/* <TextInput style={styles.input}placeholder="MovieName" onChangeText={(movie)=>setmovie(movie)} value={movie}></TextInput> */}
            <Button title="click me" onPress={fun2}></Button>
        </View>
    );

}
const styles=StyleSheet.create({
container:{
    textAlign:'center',
    alignContent:'center',
     justifyContent:'center',
     alignItems:'center',
     margin:10
    
},
input:{
    backgroundColor:'#5d6d7e',
    margin:5,
    width:150,
    borderRadius:5,
    height:35,
}
});
