import React from 'react';
import axios from 'axios';

export default function fun1(){
const baseUrl = 'https://www.swapi.tech';

// Passing configuration object to axios
axios({
  method: 'get',
  url: `${baseUrl}/api/users/1`,
}).then((response) => {
  console.log(response.data);
});


// Invoking get method to perform a GET request
axios.get(`${baseUrl}/api/users/1`).then((response) => {
  console.log(response.data);
});

}