import React, {useState} from "react";
import {Button, Image, StyleSheet, Text, View} from "react-native";
import {DatePicker, Picker, PickerItem} from 'react-native-woodpicker';
import HoverCameraDataInterface from "../interfaces/hoverCameraDataInterface";
import moment from "moment/moment";


const Filter = ({ navigation }) : JSX.Element => {

    const [pickedData, setPickedData] = useState<PickerItem>()
    const [pickedDate, setPickedDate] = useState<Date | null>(new Date(navigation.getParam('max_date')))

    const pickerItems = () : PickerItem[] => {
        let data: PickerItem[] = []
        navigation.getParam('cameras').forEach((camera : HoverCameraDataInterface) => {
            const item :PickerItem = {
                label: camera.full_name,
                value: camera.name
            }
            data.push(item)
        })
        return data
    }

    return(
        <View style={styles.container}>
            <Text style={styles.typography}>{navigation.getParam('name')}</Text>
            <Text >Launch Date: {navigation.getParam('launch_date')}</Text>
            <Text >Landing Date: {navigation.getParam('landing_date')}</Text>
            <Picker
                style={styles.picker}
                item={pickedData}
                items={pickerItems()}
                onItemChange={setPickedData}
                isNullable={true}
                placeholder={"All Cameras"}
            />
            <DatePicker
                style={styles.picker}
                value={pickedDate}
                onDateChange={setPickedDate}
                text={pickedDate? pickedDate.toDateString() : 'Date'}
                isNullable={false}
                minimumDate={new Date(navigation.getParam('landing_date'))}
                maximumDate={new Date(navigation.getParam('max_date'))}
                iosDisplay="spinner"
            />
            <Button title={"View Gallery"} onPress={() => navigation.navigate('Gallery',
                    {
                        pickedDate: pickedDate ? moment(pickedDate).format('YYYY-MM-DD') : null,
                        pickedData: pickedData ? pickedData : null,
                        name: navigation.getParam('name')
                    }
                )}
            />
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
    picker: {
        height: 40,
        width: 300,
        marginTop: 10,
        padding: 10,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10
    },
    typography: {
        marginBottom: 10,
        fontSize: 30
    },
    image: {
        height: 200,
        width: 200,
        marginBottom: 10
    }
});

export default Filter