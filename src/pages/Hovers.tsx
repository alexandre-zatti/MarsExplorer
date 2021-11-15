import React, {useState} from "react"
import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import {hoverData} from "../data/hoverData";
import HoverDataInterface from "../interfaces/hoverDataInterface";
import Hover from "../components/Hover";

const Hovers = ({ navigation } : any) : JSX.Element =>{
    
    const [hovers] = useState<HoverDataInterface[]>(hoverData)

    return(
        <View style={styles.container}>
            <FlatList contentContainerStyle={styles.list} data={hovers} renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('Filter', item)}>
                    <Hover name={item.name}/>
                </TouchableOpacity>
            )}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    list: {
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Hovers