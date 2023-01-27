import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';

import Login from './src/components/Login';
import TaskList from './src/components/TaskList';

import firebase from './src/services/firebaseConnection'

import Feather from "react-native-vector-icons/Feather"

export default function App() {
  const[user, setUser] = useState(null);

  const inputRef = useRef(null);
  const[taskList, setTaskList] = useState([]);

  const [newTask, setNewTask] = useState('');
  const[key, setKey] = useState('');

  useEffect(()=>{

    function getUSer(){
      if(!user){
        return;
      }

      firebase.database().ref('tasks').child(user).once('value', (snapshot) => {
        setTaskList([]);

        snapshot?.forEach( (childItem) => {
          let data = {
            key: childItem.key,
            name:childItem.val().name
          }
          setTaskList(oldTasks => [...oldTasks, data]); 
        })
      })
    }
    getUSer();

  },[user])

  function handleAdd(){
    if(newTask === ''){
      alert('digite uma tarefa!')
      return
    }

    if(key !== ''){
      firebase.database().ref('tasks').child(user).child(key).update({
        name: newTask
      })
      .then(() => {
        const taskIndex = taskList.findIndex( (item) => item.key === key);       
        const taskListClone = taskList;        
        taskListClone[taskIndex].name = newTask 
        setTaskList([...taskListClone])
      })
      Keyboard.dismiss();
      setNewTask('');
      setKey('');
      return
    }

    let tasks = firebase.database().ref('tasks').child(user);
    let keytask = tasks.push().key;

    tasks.child(keytask).set({
      name: newTask
    })
    .then(() => { 
      const data = {
        key: keytask,
        name: newTask
      };
      setTaskList(oldTasks => [...oldTasks, data]);      
    })
    setNewTask('');
    Keyboard.dismiss();
  }

  function handleDelete(key){
      let taskToDelete = firebase.database().ref('tasks').child(user).child(key);
      taskToDelete.remove()
    .then(()=>{
      const findTasks = taskList.filter( item => item.key !== key)
      setTaskList(findTasks);
    })
  };

  function handleEdit(data){
    setKey(data.key);
    setNewTask(data.name);
    inputRef.current.focus();    
  };

  function cancelEdit(){
    setKey(''),
    setNewTask('');
    Keyboard.dismiss();
  }


  if(!user){
    return <Login changeStatus={ (user) => setUser(user) }/>
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />  

        {key. length > 0 && (        
          <View style={styles.editContainer} >
            <TouchableOpacity onPress={cancelEdit}>
              <Feather 
                name="x-circle"
                size={30}
                color="#FF0000"
              />
              </TouchableOpacity>
              <Text style={styles.editText}>Você está editando uma tarefa!</Text>            
          </View>)}

        <View style={styles.containerTask}>
          <TextInput
            style={styles.input}
            placeholder="O que vai fazer hoje?"
            value={newTask}
            onChangeText={ (text) => setNewTask(text) }
            ref={ inputRef }          
          />
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={ handleAdd }
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList 
          data={taskList}
          keyExtractor={ item => item.key}
          renderItem={ ({item}) => (
            <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>
          )}
        />       

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,    
    paddingHorizontal: 10,
    backgroundColor: '#f2f6fc',
  },
  containerTask:{
    flexDirection: 'row',
  },
  input:{
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    padding: 10,
    height: 45
  },
  buttonAdd:{
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 20,
    borderRadius: 4
  },
  buttonText:{
    color: '#FFF',
    fontSize: 22
  },
  editContainer:{
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  editText:{ 
    marginLeft: 5,
     color: '#FF0000'
    }
});
