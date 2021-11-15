import React from "react"
import {StyleSheet, Text, View} from "react-native";
import HoverPropsInterface from "../interfaces/hoverPropsInterface";

const Hover = ({name} : HoverPropsInterface) : JSX.Element =>{
    return(
        <View style={styles.container}>
            <Text style={styles.typography}>
                {name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },

    typography:{
        fontSize: 30,
        textDecorationLine: "underline"
    }
});

export default Hover