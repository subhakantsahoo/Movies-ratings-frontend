import React from "react";
import axios from "axios";

import { StyleSheet, Button, Text,View } from "react-native-web";
export default  function Test(){
  // const [mydata,setmydata]=useState([]);
//   const fun1=async()=>{
//   // useEffect(()=>{
//     setTimeout(() => {
//         console.log("setTimeout is starting");
//     }, 3000);
//     console.log("Fun1 is starting");
//    let resp=await axios.get('https://www.swapi.tech/api/starships/3')
//     .then((response)=>{
//         setTimeout(() => {
//             console.log(response.data.result.properties.name);
//         }, 3000);
        
//         //setmydata(response.data.result.properties)
//     })
//     .catch((error)=>{
//     console.error('PAGE 404 is Not Found')})}
//     setTimeout(() => {
//         console.log("Promise is ending");
//     }, 3000);
//const baseurl='http://localhost:3000/api/'
const fun2=()=>{
  //const requests=[
{
    axios.get('http://localhost:3000/api/role/get/0')
    .then((resp)=>{
        console.warn(resp.name);
        
    })
    .catch((err)=>{
        console.error('404');
    })
}
// {
//      axios.get(`${baseurl}/starships/5`)    

       
//      .then((resp)=>{
//         console.warn(resp.data.result.properties.name);
        
//     })
//     .catch((err)=>{
//         console.error('404 is not Found');
//     })

// }
// {
// axios.get(`${baseurl}/starships/9`)  
// .then((resp)=>{
//     console.warn(resp.data.result.properties.name);

// })
// .catch((err)=>{
//     console.error('404 is not Found');
// })
// }
// {
// axios.get(`${baseurl}/starships/10`)
// .then((resp)=>{
//     console.warn(resp.data.result.properties.name)

// })
// .catch((err)=>{
//     console.error('404 is not Found');
// })


// }
        // axios.get(`${baseurl}/starships/10`),
        
//];
   // Promise.all(requests)   
   
}
  
    return (
        
                <View style={Styles.container}>
                    <Text><h2>HII this a Axiios Test...!!</h2></Text>
                     <Button title='Press Me' onPress={fun2}/>
             
               </View>
    );
}

const Styles=StyleSheet.create({
    container:{
        alignItems: 'center',
            justifyContent: 'center',
            //alignSelf:'center'
            margin:50
        },
   
      
    
}) 
