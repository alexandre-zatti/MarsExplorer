import {useNavigation} from '@react-navigation/native'
import React from 'react';
import {TouchableHighlight, View, StyleSheet} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

const BackNavigation = ({ navigation }: any) => {

    return(
        <View style={styles.container}>
            <TouchableHighlight onPress={()=> navigation.goBack()} style={styles.backButton} underlayColor="#fffff">
                <FontAwesome
                    color="white"
                    name={'angle-left'}
                    size={42}
                   />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
    },
    backButton: {
        marginTop: 50,
        borderRadius: 8,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default BackNavigation