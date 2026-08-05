import react, { useState  } from 'react';
import { StyleSheet, Text, View,TextInput,Button,Image,TouchableOpacity} from 'react-native';
const placeimage=require('../../assets/humming-bird-g454d26cfc_1280.png')
export default  function Homescreen({navigation}){
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    return (
                <View style={styles.container}> 
               <View style={styles.image}>
                <Image source={placeimage} style={styles.images} >
        </Image></View>
                
       <View style={styles.appname}>        <Text style={styles.name} ><h3>Welcome To Z+ App..</h3></Text> </View>
            <View style={styles.ibf}>
        <View style={styles.inputbox}><TextInput style={styles.email} placeholder='Email' onChangeText={(email)=>setemail(email)}></TextInput>
        <TextInput style={styles.password} placeholder='Password' secureTextEntry={true} onChangeText={(password)=>setpassword(password)}></TextInput>
        </View>
        <View style={styles.Button}>
        <Button style={styles.Button} onPress={()=>navigation.navigate("Back")} title='Login' color={'#85929e'}></Button></View>
        <View style={styles.forgetpassword}>
        <TouchableOpacity style={styles.passwordforget} onPress={()=>navigation.navigate("Home")}>
       
        <Text >Forget Password ?</Text>
        {/* s */}
        </TouchableOpacity>
        </View>
        </View>
        <View style={styles.rowflex}>
            {/* <Text><h2>HII   </h2></Text> */}
        </View>
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: '#3498db'
            },
    image: {
      width: 220,
      height: 200,
     borderRadius: 18,
      marginTop:10,
      alignItems: 'center',
      justifyContent: 'center',
      margin:30,
       marginRight:40,
      marginLeft:40,
      //backgroundColor:'red',
      alignSelf:'center'
      
    },
      name:{
        textAlign:'left',
        color:'#34495e',
        marginTop:-10,
        alignItems:'left'
        
      },
      email:{
        backgroundColor:'#f0f3f4',
        margin:5,
        width:251,
        borderRadius:5,
        height:30,
        borderRightWidth:2,
        borderLeftWidth: 2,
        borderColor:"#02436d",
       // padding:10     
      },
      password:{
        backgroundColor:'#f0f3f4',
        width:250,
        borderRadius:5,
        height:30,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderColor:"#02436d",
       // alignItems: "stretch", 
        margin:3
      },
      
      passwordforget:{
        margin:10,
           // backgroundColor:'red',
            alignContent:'center',
            alignSelf:'center'
            
      },
      flexactivity:{
        //flex:1/5,
       // flexDirection:'row',
        //backgroundColor:'#1abc9c',
            alignItems:'center',
            margin:30
            
        //margin:10
      },
      t3xt:{
        textAlign:'center',
        flex:1,
        flexDirection:'column-reverse',
        //flexWrap:'wrap',
        backgroundColor:'#f1c40f'

      },
      inputbox:{
       // backgroundColor:'#aed6f1',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        margin:20

            
        
      },
    //   rowflex:{
    //     backgroundColor:'#1abc9c',
    //     flex:1/2,
    //     alignItems:'left',
    //     justifyContent:'left'
        

    //   }
    appname:{
        alignItems: 'center',
        justifyContent: 'center',
        margin:-10
        
    },
    Button:{
        alignItems: 'center',
        justifyContent: 'center',
        margin:1

    },
    images:{
        alignContent:'center',
        width: 220,
        height: 200,
       // borderBottomEndRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
     //   borderBottomStartRadius:10
     borderTopLeftRadius:10,
     borderTopRightRadius:10
        
    },
    ibf:{
        alignContent:'center',
        justifyContent:'center',
        margin:-10  ,
      //  backgroundColor:'green',

    }
 
 });


