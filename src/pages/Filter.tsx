import React, { useState } from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { DatePicker, Picker, PickerItem } from 'react-native-woodpicker';
import RoverCameraDataInterface from "../interfaces/RoverCameraDataInterface";
import moment from "moment/moment";

const Filter = ({ navigation }: any): JSX.Element => {

    const [pickedData, setPickedData] = useState<PickerItem>()
    const [pickedDate, setPickedDate] = useState<Date | null>(new Date(navigation.getParam('max_date')))

    const pickerItems = (): PickerItem[] => {
        let data: PickerItem[] = []
        navigation.getParam('cameras').forEach((camera: RoverCameraDataInterface) => {
            const item: PickerItem = {
                label: camera.full_name,
                value: camera.name
            }
            data.push(item)
        })
        return data
    }

    return (
        <View style={styles.wrapper}>
            <ImageBackground source={require('../../assets/filter-background.png')} resizeMode="cover" style={styles.backImage}>
                <View style={styles.titleContainer}>
                    <Text style={styles.labels}>Rover</Text>
                    <Text style={styles.title}>{navigation.getParam('name')}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.infoLabels}>Info</Text>
                    <Text style={styles.labels}>Launch Date: {navigation.getParam('launch_date')}</Text>
                    <Text style={styles.labels}>Landing Date: {navigation.getParam('landing_date')}</Text>
                    <Text style={styles.infoLabels}>Cameras</Text>
                    <Picker
                        style={styles.picker}
                        item={pickedData}
                        items={pickerItems()}
                        onItemChange={setPickedData}
                        isNullable={true}
                        placeholder={"All Cameras"}
                        textInputStyle={{ color: "#fff" }}



                    />
                    <Text style={styles.infoLabels}>Date</Text>
                    <DatePicker
                        style={styles.picker}
                        value={pickedDate}
                        onDateChange={setPickedDate}
                        text={pickedDate ? pickedDate.toDateString() : 'Date'}
                        isNullable={false}
                        minimumDate={new Date(navigation.getParam('landing_date'))}
                        maximumDate={new Date(navigation.getParam('max_date'))}
                        iosDisplay="spinner"
                        androidDisplay="calendar"
                        textInputStyle={{ color: "#fff" }}




                    />

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Gallery',
                        {
                            pickedDate: pickedDate ? moment(pickedDate).format('YYYY-MM-DD') : null,
                            pickedData: pickedData ? pickedData : { value: '' },
                            name: navigation.getParam('name')
                        }
                    )} >
                        <Text style={styles.textIten}>View Gallery</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

    },
    textContainer: {
        marginLeft: 35
    },
    backImage: {
        flex: 1
    },
    titleContainer: {
        marginTop: 25,
        marginLeft: 35,
        marginBottom: 10
    },
    title: {
        color: "#fff",
        fontSize: 40
    },
    labels: {
        color: "#fff",
        fontSize: 20,
    },
    infoLabels: {
        color: '#C84921',
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 15,
    },
    picker: {
        height: 40,
        width: 300,
        marginTop: 10,
        padding: 10,
        borderStyle: "solid",
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
    },

    typography: {
        marginBottom: 10,
        fontSize: 30,
        color: '#161616'
    },
    button: {
        backgroundColor: "#C84921",
        width: 200,
        display: "flex",
        alignItems: "center",
        borderRadius: 10,
        padding: 5,
        marginTop: 20
    },
    textIten: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    },
    item: {
        color: "#161616"
    }
});

export default Filter