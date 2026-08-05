//@FORM 
/*

@incement

@decrement

@submit

}
*/
import react, { useState } from 'react';
import Gmail from './component/email';
import { StyleSheet, Text, View,TextInput,Button} from 'react-native';
import { CheckBox } from 'react-native-web';


export default function App() {
  const [count,setcount]=useState(0);
  return (
    <View style={styles.container}>    
      <Text style={{color:'#5d6d7e'}}><h1>Hello world!</h1></Text>
    
  
    <TextInput style={styles.firstname} placeholder='Enter First Name'></TextInput>
    <TextInput style={styles.lastname} borderBottomWidth='10'  placeholder='Enter Last Name'></TextInput>
    <Button  style={styles.Button} title='submit' onPress={()=>alert('Welcome To Our App')} ></Button>

    <Text><h1>{count}</h1></Text>
  <Button title='increment' onPress={()=>setcount(count+1)} />
  <Button title='Decrement' onPress={()=>setcount(count-1)}/>
    </View>
     );
}
const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#85c1e9',
    alignItems: 'center',
    //justifyContent: 'center',
    //marginLeft:600,
    //marginLeft:610,

  },
  // container2: {
  //   flexWrap: 1  ,
  //   backgroundColor: '#2980b9',
  //   alignItems: 'center',
  //   //justifyContent: 'center',
  //   //marginLeft:600,
  //   //marginLeft:610,
  // },

  firstname:{
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth:1,
    height:20,
    padding:10
  },
  lastname:{
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin:10,
    borderBottomWidth:1,
    height:20,
    padding:10,  
  },
 
  Button:{
      justifyContent: 'center',
    backgroundColor:'#e74c3c',
    marginLeft:100,
    margin:100,
    marginRight:100
}
});

