import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = (): JSX.Element => {
    const [galleryData, setGalleryData] = useState()
    const [favorites, setFavorites] = useState<Array<string>>([])
    const [openModal, setOpenModal] = useState(false)
    const [modalImage, setModalImage] = useState()
    const [emptyGallery, setEmptyGallery] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [refreshList, setRefreshList] = useState(false)


    useEffect(() => {
        setIsLoading(true)
        AsyncStorage.getAllKeys().then((keys) => {
            if (keys.length) {
                setFavorites(keys)
                AsyncStorage.multiGet(keys).then((photos) => {
                    let newGallery: any[] = []
                    photos.forEach((photo) => {
                        newGallery.push(JSON.parse(photo[1] as string))
                    })
                    setGalleryData(newGallery)
                    setIsLoading(false)
                })
            } else {
                setGalleryData([])
                setIsLoading(false)
                setEmptyGallery(true)
            }

        })
    }, [])

    return (

        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.labels}>My</Text>
                <Text style={styles.title}>Favorites</Text>
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

                {emptyGallery ? <View><Text>Nenhuma foto encontrada!</Text></View> :
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
                                        let newGallery = []
                                        if (favorites.includes(item.id.toString())) {
                                            await AsyncStorage.removeItem(JSON.stringify(item.id))
                                            newArray = newArray.filter(favItem => favItem != item.id)
                                            newGallery = galleryData.filter(data => data.id != item.id)
                                        } else {
                                            await AsyncStorage.setItem(JSON.stringify(item.id), JSON.stringify(item))
                                            newArray.push(item.id.toString())
                                        }
                                        setFavorites(newArray)
                                        if (!newGallery.length) {
                                            setEmptyGallery(true)
                                        }
                                        setGalleryData(newGallery)
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#161616'
    },
    titleContainer: {
        marginTop: 35,
        marginLeft: 35,
        marginBottom: 5
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
        backgroundColor: '#161616',
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

export default Favorites