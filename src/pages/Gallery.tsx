import React, {useEffect, useState} from "react";
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modal";

const Gallery = ({ navigation } : any) : JSX.Element => {
    const [fetchUrl] = useState(`https://api.nasa.gov/mars-photos/api/v1/rovers/${navigation.getParam('name')}/photos?api_key=gWTCE5U2htOMEOdnKYFAFQKaYHCMLaBw73dkVFWJ&earth_date=${navigation.getParam('pickedDate')}${navigation.getParam('pickedData').value !== "" ? '&camera='+navigation.getParam('pickedData').value : ''}`)
    const [galleryData, setGalleryData] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [modalImage, setModalImage] = useState()

    useEffect(() => {
        fetch(fetchUrl).then((response) => {
            response.json().then((json) => {
                setGalleryData(json['photos'])
            })
        })
    },[])

    return(
        <View style={styles.container}>
            <Modal
                style={styles.modal}
                isVisible={openModal}
                onBackdropPress={() => {setOpenModal(false); setModalImage(undefined)}}
            >
                <View style={styles.modalView}>
                    <Image style={styles.modalImage} source={{uri: modalImage}}/>
                </View>
            </Modal>
            <FlatList
                contentContainerStyle={styles.list}
                numColumns={2}
                data={galleryData}
                renderItem={({item}) => (
                <TouchableOpacity onPress={() => {setOpenModal(true); setModalImage(item.img_src)}}>
                    <Image style={styles.image} source={{uri: item.img_src}}/>
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
    image: {
        width: 170,
        height: 200,
        margin: 5,
        borderRadius: 10
    },
    list: {
        alignItems: "center",
        justifyContent: "flex-start",
        width: 390,
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        height: 500,
        width: 350,
        backgroundColor: '#fff',
        borderRadius:20,
        alignItems: "center",
        justifyContent: "center"
    },
    modalImage: {
        width: 350,
        height: 500,
        borderRadius:20,
    }
});

export default Gallery