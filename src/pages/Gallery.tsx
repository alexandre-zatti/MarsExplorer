import React, {useEffect, useState} from "react";
import {Image, StyleSheet, View} from "react-native";

const Gallery = ({ navigation }) : JSX.Element => {
    const [fetchUrl, setFetchUrl] = useState<string>(`https://api.nasa.gov/mars-photos/api/v1/rovers/${navigation.getParam('name')}/photos?api_key=gWTCE5U2htOMEOdnKYFAFQKaYHCMLaBw73dkVFWJ&earth_date=${navigation.getParam('pickedDate')}${navigation.getParam('pickedData').value !== "" ? '&camera='+navigation.getParam('pickedData').value : ''}`)
    const [galleryData, setGalleryData] = useState()

    useEffect(() => {
        fetch(fetchUrl).then((response) => {
            response.json().then((json) => {
                setGalleryData(json)
            })
        })
    },[])

    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/03293/opgs/edr/rcam/RRB_689825431EDR_F0912132RHAZ00341M_.JPG'}}/>
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
    image: {
        width: 200,
        height: 200
    }
});

export default Gallery