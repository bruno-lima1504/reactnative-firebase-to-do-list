import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

import Feather from "react-native-vector-icons/Feather"

export default function TaskList({ data, deleteItem, editItem }){
    return(
        <View style={styles.container}>
            <TouchableOpacity
                style={{marginRight: 15}}
            >
                <Feather 
                    name="trash" 
                    color='#FFF' 
                    size={20}
                    onPress={ () => deleteItem(data.key) }                 
                />
            </TouchableOpacity>
            <View style={{ paddingRight: 10 }}>
                <TouchableWithoutFeedback 
                    onPress={ () => editItem(data) }
                >
                    <Text style={styles.taskText}>{data.name}</Text>
                </TouchableWithoutFeedback>
            </View>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 45,
        marginBottom: 13,
        flexDirection: 'row',
        backgroundColor: '#121212',
        alignItems: 'center',        
        padding: 10,
        borderRadius: 4,

    },
    taskText:{
        color: '#FFF',
        paddingRight: 10,
    }
})