import { StyleSheet, View, Text, Pressable } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useEffect, useState } from "react";
import {db,doc,updateDoc,deleteDoc} from '../services/firebaseConfig'

export default function ItemLoja(props) {
    const [isChecked, setIsChecked] = useState(props.isChecked)

    const deletarItem = async() =>{
        await deleteDoc(doc(db,'items',props.id))
        props.buscarItems()
    }

    const updateIsChecked = async() =>{
        const itemRef = doc(db,'items',props.id)

        await updateDoc(itemRef,{
            isChecked:isChecked
        })
    }

    useEffect(()=>{
        updateIsChecked()
    },[isChecked])

    return (
        <View style={styles.container}>
            <Pressable onPress={()=>setIsChecked(!isChecked)}>
                {isChecked ? (
                    <AntDesign name='checkcircle' size={24} color='black' />
                ) : (
                    <AntDesign name='checkcircleo' size={24} color='black' />
                )}

            </Pressable>
            <Text style={styles.title}>{props.title}</Text>
            <Pressable onPress={deletarItem}>
                <MaterialIcons name='delete' size={24} color='black' />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: 'lightgrey',
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        width: '90%',
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 10
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 500
    }
})