import React from "react"
import { Image, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";

const Home = ({ navigation }: any): JSX.Element => {
    return (

        <View style={styles.wraper}>
            <ImageBackground source={require('../../assets/home-background.png')} resizeMode="cover" style={styles.backImage}>
                <View style={styles.container}>
                    <Image source={require('../../assets/mainTittle.png')}></Image>
                </View>
                <View style={styles.buttonsContainer}>

                    <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Rovers')} >
                        <Text style={styles.labels}>Start</Text>
                        <Text style={styles.textItens}>Explore</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Favorites')} >
                        <Text style={styles.labels}>My</Text>
                        <Text style={styles.textItens}>Favorites</Text>
                    </TouchableOpacity>

                </View>
                {/* <Image style={styles.logo} source={require('../../assets/companyLogo.png')}></Image> */}

            </ImageBackground >
        </View >
    )
}

const styles = StyleSheet.create({
    wraper: {
        flex: 1,
    },
    backImage: {
        flex: 1
    },
    labels: {
        fontFamily: "ChakraPetch_300Light",
        color: "#DDDDDD",
        fontSize: 20,
    },
    textItens: {
        fontFamily: "ChakraPetch_700Bold",
        color: "#DDDDDD",
        fontSize: 40
    },
    container: {
        marginTop: 170,
        justifyContent: 'center',
        alignItems: "center",
        padding: 44,
    },
    buttonsContainer: {
        height: 100,
        justifyContent: "space-between"

    },
    buttons: {
        color: "#DDDDDD",
        marginLeft: 50,
        marginTop: 50
    },

});

export default Home