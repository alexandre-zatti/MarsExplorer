import React from "react"
import { StyleSheet, Text, View, Image } from "react-native";
import RoverPropsInterface from "../interfaces/RoverPropsInterface";

const Rover = ({ name, image }: RoverPropsInterface): JSX.Element => {
    return (
        <View style={styles.container}>
            <Image source={image} />
            <Text style={styles.typography}>
                {name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        height: 170,
        width: 170,
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: 20,
        padding: 5
    },

    typography: {
        fontSize: 25,
        fontWeight: "bold",
        color: '#DDDDDD'
    }
});

export default Rover