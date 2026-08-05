import axios from 'axios';
import react,{useState} from 'react';
import { Button } from 'react-native';
import { Text, View ,StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-web';
import { useNavigate,Link } from 'react-router-dom';

export default function Register({navigation}) {
    const [user,setuser]=useState('');
    const [password,setpassword]=useState('');
    const [phno,setphno]=useState('');
  //  const [rating,setrating]=useState('');


    const formDatasave=async()=>{
      try{
        const{data}=await axios.post(`http://localhost:3000/api/user/create`,{phno:phno,user:user,password:password})
        console.log(data);
        navigation.navigate('Homescreen')
      }catch(err){
        console.log(err);
      }
    }
  return (
    <View style={Styles.input}>
      <Text color='red'><h1>Please Register ur Name</h1></Text>
      {/* <form> */}
      <TextInput style={Styles.phno}placeholder='Enter PhNo' onChangeText={(phno)=>setphno(phno)}></TextInput>
     <TextInput style={Styles.name }placeholder='Enter Name'onChangeText={(user)=>setuser(user)}></TextInput>
      <TextInput style={Styles.password} placeholder='Enter Password' onChangeText={(password)=>setpassword(password)}></TextInput>
      {/* <TextInput style={Styles.phno} placeholder='rating' onChangeText={(rating)=>setrating(rating)}></TextInput> */}
      <Button title='Enter' color='#2ecc71' onPress={formDatasave} ></Button>
      {/* </form> */}

      {/* <TouchableOpacity onPress={()=>navigation.navigate("OtherWay  ")}><Text><h4>Try Another Way!</h4></Text></TouchableOpacity> */}
   {/* <Link to="/">Login Page</Link> */}
    </View>
    
      
  );
}   
const Styles=StyleSheet.create({
input:{
    flex: 1,
            backgroundColor: '#5dade2',
            alignItems: 'center',
            justifyContent: 'center',
    
},
password:{
    backgroundColor:'#f0f3f4',
    margin:5,
    width:250,
    borderRadius:5,
    height:30,
    borderRightWidth:2,
    borderLeftWidth: 2,
    borderColor:"#02436d",
},
name:{
    backgroundColor:'#f0f3f4',
    margin:5,
    width:250,
    borderRadius:5,
    height:30,
    borderRightWidth:2,
    borderLeftWidth: 2,
    borderColor:"#02436d",
},
phno:{
    backgroundColor:'#f0f3f4',
    margin:5,
    width:250,
    borderRadius:5,
    height:30,
    borderRightWidth:2,
    borderLeftWidth: 2,
    borderColor:"#02436d",
}
}); 