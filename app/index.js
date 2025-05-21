import React from 'react'
import {Text,View,TextInput,StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import ItemLoja from '../components/ItemLoja'
import { useState,useEffect } from 'react'
import { db,collection,addDoc,getDocs} from '../services/firebaseConfig'

export default function TelaHome(){
    const[title,setTitle]=useState('')
    const[listItems,setListItems]=useState([])

    const buscarItems = async()=>{
        try{
            const querySnapshot = await getDocs(collection(db,'items'))
            const items = []
            querySnapshot.forEach((doc)=>{
                items.push({
                    ...doc.data(),
                    id:doc.id
                })
            })
            console.log('Itens carregados: ',items)
            setListItems(items)
        }catch(e){
            console.log("Error, ",e)
        }
    }

    useEffect(()=>{
        buscarItems()
    },[])



    const salvarItem = async() =>{
        try{
            const docRef = await addDoc(collection(db,'items'),{
                title:title,
                isChecked:false
            })
            console.log("Documento salvo", docRef.id)
            setTitle('')
        }catch(e){
            console.log('Erro ao salvar item',e)
        }
        buscarItems()
    }
    return(
        <View style={styles.container}>
            {listItems.length>0?(
                <FlatList 
                    data={listItems}
                    renderItem={({item})=><ItemLoja 
                        title={item.title}
                        isChecked={item.isChecked}
                        id={item.id}
                        buscarItems={buscarItems}
                    />}
                />
            ):(
                <ActivityIndicator />
            )}



            <TextInput 
            style={styles.input}
            placeholder='Digite o nome do produto'
            value={title}
            onChangeText={(value)=>setTitle(value)}
            onSubmitEditing={salvarItem}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    input:{ 
        backgroundColor:"lightgrey",
        padding:10,
        fontSize:15,
        width:'90%',
        alignSelf:"center",
        borderRadius:10,
        margin:'auto'
    }
})