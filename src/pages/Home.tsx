import React from "react"
import {Button, Image, StyleSheet, Text, View} from "react-native";

const Home = ({ navigation } : any) : JSX.Element =>{
    return(
        <View style={styles.container}>
            <Text style={styles.typography}>Mars Explorer</Text>
            <Image source={require('../../assets/mars-gif.gif')}/>
            <Button title={'Explorar'} onPress={() => navigation.navigate('Hovers')}/>
            <Button title={'Favoritos'} onPress={() => navigation.navigate('Favorites')}/>
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
    typography:{
        fontSize: 30
    }
});

export default Home