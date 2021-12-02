import React, {useEffect, useState} from "react";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome} from '@expo/vector-icons';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Gallery = ({ navigation } : any) : JSX.Element => {
    const [fetchUrl] = useState(`https://api.nasa.gov/mars-photos/api/v1/rovers/${navigation.getParam('name')}/photos?api_key=gWTCE5U2htOMEOdnKYFAFQKaYHCMLaBw73dkVFWJ&earth_date=${navigation.getParam('pickedDate')}${navigation.getParam('pickedData').value !== "" ? '&camera='+navigation.getParam('pickedData').value : ''}`)
    const [galleryData, setGalleryData] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [modalImage, setModalImage] = useState()
    const [emptyGallery, setEmptyGallery] = useState(true)

    useEffect(() => {
        fetch(fetchUrl).then((response) => {
            response.json().then((json) => {
                if(json['photos'].length){
                    setEmptyGallery(false)
                    setGalleryData(json['photos'])
                }
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
            {emptyGallery ? <View><Text>Nenhuma foto encontrada!</Text></View> :
                <FlatList
                    contentContainerStyle={styles.list}
                    numColumns={2}
                    data={galleryData}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {setOpenModal(true); setModalImage(item.img_src)}}>
                            <Image style={styles.image} source={{uri: item.img_src}}/>
                            <FontAwesome style={styles.favorite} name={'star'} size={36} onPress={ async () => {
                                await AsyncStorage.setItem("test", item)
                                let value = await AsyncStorage.getItem("test")
                                console.log(value)
                            }}/>
                        </TouchableOpacity>
                    )}/>
            }
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
    favorite: {
        position: "absolute",
        right:10,
        bottom: 10,
        color: '#fff',
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
        width: 375,
        backgroundColor: '#fff',
        borderRadius:20,
        alignItems: "center",
        justifyContent: "center"
    },
    modalImage: {
        width: 375,
        height: 500,
        borderRadius:20,
    }
});

export default Gallery