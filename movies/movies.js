
import React,{useEffect, useState} from 'react';
import { Text, View ,StyleSheet} from 'react-native';
import { Button, TextInput } from 'react-native-web';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import axios from 'axios';
import { Rating } from 'react-native-ratings';
import Auth from './auth';
import authContext from './user-contex';


export default function AnotherWay({navigation, }){
 
  const [movie,setmovie]=useState('');
  const [error, setError] = useState('');
  const [year,setyear]=useState('');
  const [url,seturl]=useState('');


//   const [authstatus, setauthstatus] = useState(false);
//   const login = () => {
//     setauthstatus(true);
//   };


  const fun1=async()=>{
    try{
        const {data}=await axios.delete("http://localhost:3000/api/rating/",{moviename:movie})
            console.log("Deletation sucessful...@");

    }catch(err){
        console.log(err);
    }
        }

  
    const fun2=async()=>{
        try{
        //   const{data}=await axios.post("http://localhost:3000/api/movie/create",{name:movie,year:year,url:url})
        //   console.log(data);
          navigation.navigate('ratings')
        }catch(err){
          console.log(err);
        }
      }
    

   
    return (

    //     <React.Fragment>
    //   <authContext.Provider value={{ status: authstatus, login: login }}>
    //     <Auth />
            <View style={Styles.container}>  

             
           <Text><h2><b>Rate The Movie Again Or Delete It...!</b></h2></Text>
            {/* <TextInput style={Styles.movie} placeholder='Moviename' onChangeText={(movie)=>setmovie(movie)} value={movie}></TextInput> */}
            {/* <TextInput style={Styles.year}placeholder='Year' onChangeText={(year)=>setyear(year)} value={year}></TextInput>
            <TextInput style={Styles.url}placeholder='Url Link' onChangeText={(url)=>seturl(url)} value={url}></TextInput> */}
            <View style={Styles.box}>
            <View style={Styles.container2}><Octicons name="star-fill" size={24} color="black" onPress={fun2}/>
            </View>
            <View style={Styles.container3  }>
            <AntDesign name="delete" size={24} color="black" onPress={fun1}/>  
            </View> 
            </View>
              </View>

      
    );
}
    // return <View style={Styles.container}>
    //     <Text><h3>Type U r Email or Phone Number</h3></Text>
    //     <view style={Styles.flexactivity}>
    //         <Text><h2>This Is A Flex Start</h2></Text>
    //     </view>
    //     {/* <Test></Test> */}
       

    // </View>
 
const Styles=StyleSheet.create  ({
  container:{
    flex:1,
   // flexDirection:'row',
     //flexWrap:'wrap',
   // alignItems:'stretch',    
    backgroundColor: '#5dade2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:-400
},
box:{
    justifyContent:'center',
    alignContent:'center',
    alignSelf:'center',
    margin:50,
    backgroundColor:'#f0f3f4',
    marginLeft:-100
},
// movie:{
//     backgroundColor:'#f0f3f4',
//         margin:5,
//         width:150,
//         borderRadius:5,
//         height:35,
// },
// year:{

//     backgroundColor:'#f0f3f4',
//     margin:5,
//     width:150,
//     borderRadius:5,
//     height:35,
// },
// url:{

//     backgroundColor:'#f0f3f4',
//     margin:5,
//     width:150,
//     borderRadius:5,
//     height:35,
// },
container1:{
    backgroundColor:'#aed6f1',
    width:250,
    height:133,
    flexShrink:50,
    alignContent:'center'
},
container3:{
    alignContent:'space-between',
    alignItems:'center',
    margin:3,
    marginLeft:190

},
container2:{
    alignItems:'center',
    alignContent:'space-between',
    margin:-30,
    marginRight:-150
}


}); 

