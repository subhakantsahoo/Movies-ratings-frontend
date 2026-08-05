/* 
    @ image showing
    @under image - any name show
    @gmai'
    @password
    @login
    @clicking login a new page form
    @axios

*/
import react from "react";
import { View, Text } from "react-native";
//  import Test from './component/axiocomponet/testaxio';
//import fun1 from './component/axiocomponet/webpro';
// //import axios from 'axios';
// import Homescreen from './component/imagebased/Homescreen';

import Register from "./movies/registrationfile";
// import Welcome from './movies/movies';
import Ratings from "./movies/updatedratings";
import Password from "./component/imagebased/forgetpassword";
import Newpassword from "./component/imagebased/newpassword";
import Newpasswordcreated from "./component/imagebased/newpasswordcreated";
import AnotherWay from "./component/imagebased/TryAnotherway";
//import List from './movies/moviesratinglists';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from "./movies/loginfile";
import Movielist from "./movies/lists";
import Moviesdetail from "./movies/moviesdetail";
import Newmovieratings from "./movies/newmovierating";
import SearchMovie from "./movies/searchedmovie";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    // <Homescreen></Homescreen>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homescreen">
        <Stack.Screen name="Homescreen" component={Homescreen}></Stack.Screen>
        {/* <Stack.Screen name='Back' component={Welcome}></Stack.Screen> */}
        <Stack.Screen name="Home" component={Password}></Stack.Screen>
        <Stack.Screen name="NewPassword" component={Newpassword}></Stack.Screen>
        <Stack.Screen
          name="Result"
          component={Newpasswordcreated}
        ></Stack.Screen>
        <Stack.Screen name="OtherWay" component={AnotherWay}></Stack.Screen>
        {/* <Stack.Screen name='Fair'component={Test}></Stack.Screen>  */}
        <Stack.Screen
          name="registrationfile"
          component={Register}
        ></Stack.Screen>
        <Stack.Screen name="ratings" component={Ratings}></Stack.Screen>
        {/* <Stack.Screen name='lists'component={List}></Stack.Screen> */}
        <Stack.Screen name="movielist" component={Movielist}></Stack.Screen>
        <Stack.Screen
          name="newmovieslist"
          component={Newmovieratings}
        ></Stack.Screen>
        <Stack.Screen
          name="moviesdetail"
          component={Moviesdetail}
        ></Stack.Screen>
        <Stack.Screen name="searchmovie" component={SearchMovie}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
  //  <View>
  // <Test>
  //   </Test>
  // </View>
  // <fun1></fun1>
}
