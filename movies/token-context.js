import React from 'react';

// Creating the context object and passing the default values.
const AuthContext = React.createContext({Token:null,setToken:()=>{localStorage.getItem()}});


export default AuthContext;