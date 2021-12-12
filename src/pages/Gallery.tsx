import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackNavigation from "../components/BackNavigation";

const Gallery = ({ navigation }: any): JSX.Element => {
    const [fetchUrl] = useState(`https://api.nasa.gov/mars-photos/api/v1/rovers/${navigation.getParam('name')}/photos?api_key=gWTCE5U2htOMEOdnKYFAFQKaYHCMLaBw73dkVFWJ&earth_date=${navigation.getParam('pickedDate')}${navigation.getParam('pickedData').value !== "" ? '&camera=' + navigation.getParam('pickedData').value : ''}`)
    const [galleryData, setGalleryData] = useState()
    const [favorites, setFavorites] = useState<Array<string>>([])
    const [openModal, setOpenModal] = useState(false)
    const [modalImage, setModalImage] = useState()
    const [emptyGallery, setEmptyGallery] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [refreshList, setRefreshList] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(fetchUrl).then((response) => {
            response.json().then((json) => {
                if (json['photos'].length) {
                    AsyncStorage.getAllKeys().then((keys) => {
                        setFavorites(keys)
                    })
                    setGalleryData(json['photos'])
                } else {
                    setEmptyGallery(true)
                }
                setIsLoading(false)
            })
        })
    }, [])

    return (
        <View style={styles.container}>
            <BackNavigation navigation={navigation}/>
            <View style={styles.titleContainer}>
                <Text style={styles.labels}>Gallery</Text>
                <Text style={styles.title}>{navigation.getParam('name')}</Text>
            </View>
            <View style={styles.wrapper}>
                <Modal
                    style={styles.modal}
                    isVisible={openModal}
                    onBackdropPress={() => { setOpenModal(false); setModalImage(undefined) }}
                >
                    <View style={styles.modalView}>
                        <Image style={styles.modalImage} source={{ uri: modalImage }} />
                    </View>
                </Modal>
                {isLoading ? <ActivityIndicator size="large" style={styles.loader} /> : null}

                {emptyGallery ? <View><Text style={styles.labels}>Nenhuma foto encontrada!</Text></View> :
                    <FlatList
                        contentContainerStyle={styles.list}
                        numColumns={2}
                        data={galleryData}
                        extraData={refreshList}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => { setOpenModal(true); setModalImage(item.img_src) }}>
                                <Image style={styles.image} source={{ uri: item.img_src }} />
                                <FontAwesome
                                    style={favorites.includes(item.id.toString()) ? styles.favoriteUp : styles.favoriteDown}
                                    name={'star'}
                                    size={28}
                                    onPress={async () => {
                                        let newArray = favorites
                                        if (favorites.includes(item.id.toString())) {
                                            await AsyncStorage.removeItem(JSON.stringify(item.id))
                                            newArray = newArray.filter(favItem => favItem != item.id)
                                        } else {
                                            await AsyncStorage.setItem(JSON.stringify(item.id), JSON.stringify(item))
                                            newArray.push(item.id.toString())
                                        }
                                        setFavorites(newArray)
                                        setRefreshList(!refreshList)
                                    }} />
                            </TouchableOpacity>
                        )
                        } />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#161616',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#161616'
    },
    titleContainer: {
        marginTop: 25,
        marginLeft: 35,
        marginBottom: 10
    },
    title: {
        color: "#DDDDDD",
        fontSize: 40
    },
    labels: {
        color: "#DDDDDD",
        fontSize: 20,
    },
    backImage: {
        flex: 1
    },
    image: {
        width: 170,
        height: 200,
        margin: 5,
        borderRadius: 10
    },
    favoriteUp: {
        position: "absolute",
        right: 10,
        bottom: 10,
        color: 'yellow',
    },
    favoriteDown: {
        position: "absolute",
        right: 10,
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
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    modalImage: {
        width: 375,
        height: 500,
        borderRadius: 20,
    },
    loader: {
        marginTop: 300
    }
});

export default Gallery