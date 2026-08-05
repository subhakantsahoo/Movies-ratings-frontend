import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  TextInput,
} from "react-native-web";
import { Image } from "react-native-web";
import { useState } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from '@expo/vector-icons'; 

import AuthContext from "./token-context";
import { useContext } from "react";
import { json } from "react-router-dom";
import { Feather } from "react-native-feather";

export default function SearchMovie({ navigation }) {
  //const [movie,setmovie]=useState('');
  const [myData, setmyData] = useState([]);
  //const [user,setuser]=useState([]);

  const [input, setinput] = useState("");
  const [opacity, setOpacity] = useState(1);

  //const im='https://upload.wikimedia.org/https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/RRR_Poster.jpg/220px-RRR_Poster.jpg/en/thumb/d/d7/RRR_Poster.jpg/220px-RRR_Poster.jpg';

  // const token = response.data.token;

  // tokentext.setToken(token)
  // axios.defaults.headers.common['Authorization*******'] = `${token}`;

  

  const fun1 = (_id) => {
    try {
      const { data } = axios
        .delete(`http://localhost:3000/api/movie/${_id}`)
        // console.log("Deletation sucessful...@");
        // .then((response =>{

        // } console.log(response))
        // .catch(error => console.log(error))
        .then((response) => {
          console.log(`Rating with ID ${_id} deleted successfully`);
          // Remove the deleted rating from the state
          setmyData((prevData) => prevData.filter((data) => data._id !== _id));
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
  };
  const fun2 = (id) => {
    navigation.navigate("moviesdetail", { movie: id });
  };
  // sls
  // const tokentext=localStorage.getItem('User Name') ;
  // const token={Authorization:`**** ${JSON.parse(tokentext).token}`}

  const token = JSON.parse(localStorage.getItem("User Name")).token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  // Make the HTTP request with the headers
  // axios.get('/api/data', { headers });

  useEffect(() => {
    // axios.get("http://localhost:3000/api/movie/get",{headers:{Authorization:`${tokentext.Token}`}})
    axios
      .get("http://localhost:3000/api/movie/get", { headers: headers })
      .then((res) => {
        setmyData(res.data);
        // const token = response.data.token;

        // tokentext.setToken(user)
        // axios.defaults.headers.common['Authorization*******'] = `${tokentext}`;
      });
  },[]);
  // console.log(input);

  const search = () => {
    axios
      .get(`http://localhost:3000/api/movie/search/${input}`)
      .then((res) => {
        setmyData(res.data);
      })
      .catch((error) => console.log(error));
  };


  const filteredData = myData.filter(item => {
    const moviex = item.movie.toLowerCase();
    const  inputy= input.toLowerCase(); 
    // console.log(inputy);
    return moviex.startsWith(inputy);
  });
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.List}>Movies List</Text>
      </View>
        
      <View style={styles.container2}>
        <Button
          title="AddNewMovie"
          onPress={() => navigation.navigate("newmovieslist")}
        ></Button>
      </View>
      <View style={styles.searchitemcontainer}>

      <View style={styles.searchabar}>
        {/* <Feather name="heart" size={20} color="black" style={{marginLeft:1}}></Feather> */}
        <TextInput
          style={styles.searchbox}
          placeholder="Search Movie..."
          // onChangeText={(input)=>{setinput(input);
          // touchdata(input,opacity);}}
          onChangeText={(input)=>setinput(input)}
          value={input} 
        ></TextInput>
        {/* {input} */}
        {/* {input} */}
        {/* <TouchableOpacity style={styles.searchButton} onPress={search}> */}
          <View style={styles.FontAwesome}>
          <EvilIcons name="search" size={24} color="black" />
          {/* <FontAwesome name="search" size={24} color="black" /> */}
          </View>

        {/* </TouchableOpacity> */}
       
      </View>
      <View style={styles.searchButton}>
          <Button title='Search' onPress={search}></Button>
        </View>


      
      

      <View style={styles.searchmoviename}>
        {/* <Text>movie name</Text> */}
        {filteredData.map((post) => {
        const { _id, movie, image } = post;
         if(input!==""){
        return (
          
          <View style={{marginVertical:10}}>
            <Text style={{fontSize:14,fontWeight:"bold",alignSelf:'flex-start'}}><TouchableOpacity onPress={search} ><Text>{movie}</Text></TouchableOpacity></Text>
            <Text style={{borderColor:"gray",borderWidth:1,height:1,marginTop:5}}></Text>
            </View>
        );
      }
        })}
      </View>
      </View>
      
     
      

      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignContent: "center",
    // justifyContent:'center',
    alignItems: "center",
    //  margin:-100,
    //  backgroundColor: '#aed6f1',
    //  flex:1
  },
  text: {
    alignContent: "center",
    textAlign: "center",
    margin: 10,
  },
  searchitemcontainer:{
    // backgroundColor:'red '
    alignContent:'center',
    justifyContent:'center'
  },
  searchabar: {
    marginRight: 300,
    margin: 10,
  },
  searchbox: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    alignContent: "center",
    fontSize: 15,
  },
  FontAwesome: {
    marginLeft: 130,
    margin: -30,
  },

  searchButton:{
    // justifyContent: "center",
    //  alignContent:'right',
    // width:'30',
    // backgroundColor:'gray',
     alignItems:'flex-start',
     

    marginLeft:230 ,

    margin: -10,
  },
  searchmoviename:{
      marginRight:310,
      margin:20,
      // alignSelf:'flex-start' 

  },
 
  container2: {
    justifyContent: "center",
    marginLeft: 290,
    margin: -20,
  },
  container1: {
    //justifyContent:'center',
    textAlign: "center",
    marginRight: 400,
    alignContent: "space-between",
    margin: 70,
  },
  container3: {
    justifyContent: "center",
    marginLeft: 400,
    marginTop: -58,
  },
  // box:{
  //     justifyContent:'center',
  //     alignContent:'center',
  //     alignSelf:'center',
  //     margin:0,
  //     //backgroundColor:'#f0f3f4',
  //     marginLeft:480,
  //    // backgroundColor:'blue'
  // },
  icons: {
    justifyContent: "center",
    //  backgroundColor:'white',
    width: 100,
    marginLeft: 400,
    margin: -60,
  },

  containerx: {
    alignItems: "center",
    // alignContent:'space-between',
    margin: -18,
    marginRight: 50,
  },
  containery: {
    //alignContent:'space-between',
    alignItems: "center",
    margin: -6,
    marginLeft: 50,
  },
  image: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "red",
    marginTop: 0,
    width: 140,
    height: 180,
    marginLeft: 155,
  },
  moviename: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "bold",
  },
  List: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
});
