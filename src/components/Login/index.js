import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity } from 'react-native';

import firebase from '../../services/firebaseConnection'

export default function Login({ changeStatus }){
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [type, setType] = useState('login');

    function handleLogin(){
        if(type === 'login'){
            
            const user = firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user)=>{
                changeStatus(user.user.uid);
            })
            .catch((err)=>{
                console.log(err);
                alert('algo não saiu como esperado');
            })
        }else{
            const user = firebase.auth().createUserWithEmailAndPassword( email, password)
            .then((user)=> {
                changeStatus(user.user.uid);
            })
            .catch((err)=>{
                console.log(err);
                alert('algo não saiu como esperado');
            })
        };
    };

    return(
       <SafeAreaView style={styles.container}>
         <StatusBar />
           <TextInput 
                placeholder='Seu email'
                style={styles.input}
                value={email}
                onChangeText={ (text) => setEmail(text)}
           />

            <TextInput 
                placeholder='Sua senha'
                style={styles.input}
                value={password}
                secureTextEntry={true}
                onChangeText={ (text) => setPassword(text)}
           />

           <TouchableOpacity 
                style={[styles.handleLogin, { backgroundColor: type === 'login' ? '#3ea6f2' : '#141414' }]} 
                onPress={ handleLogin } 
            >
                <Text style={styles.loginText}>
                    { type === 'login' ? 'Acessar' : 'Cadastrar' }
                </Text>

           </TouchableOpacity>

           <TouchableOpacity onPress={ () => setType(type === 'login' ? 'cadastrar' : 'login')}>
                <Text style={{textAlign: 'center' }}>
                    { type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
                </Text>
           </TouchableOpacity>
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#F2f6fc',
        paddingHorizontal: 10,
    },
    input:{
        marginBottom: 15,
        backgroundColor: '#fff',
        padding: 10,
        height: 45,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#141414'
    },
    handleLogin:{
        alignItems: 'center',
        justifyContent:'center',
        height: 45,        
        marginBottom: 10,
    },
    loginText:{
        fontSize: 17,
        color:'#FFF'
    }
  });