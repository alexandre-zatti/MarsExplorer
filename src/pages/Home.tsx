import React from "react"
import {Button, Image, StyleSheet, View} from "react-native";

const Home = ({ navigation }) : JSX.Element =>{
    return(
        <View style={styles.container}>
            <Image source={require('../../assets/mars-gif.gif')}/>
            <Button title={'Explorar'} onPress={() => navigation.navigate('Hovers')}/>
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
});

export default Home