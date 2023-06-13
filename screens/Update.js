import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';


import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    Platform,
} from "react-native";


const Update = ({ route }) => {
    const { id_salon } = route.params;
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(id_salon ? undefined : 1);

    useEffect(() => {
        if (id_salon) {
            fetch('http://192.168.28.142/MobileWeb/INT/select_salon2.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id_salon})
            })
                .then(response => response.json())
                .then(json => {
                    setName(json.name);
                    setImage(json.image);
                    setDescription(json.description);
                    setStatus(parseInt(json.status));
                })
                .catch(error => console.error(error));
        }
    }, [id_salon]);

    useEffect(() => {
        requestMediaLibraryPermissions();
    },[]);

    async function requestMediaLibraryPermissions() {
        if (Platform.OS !== 'web'){
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted'){
                alert('Hiba nincs engedély')
            }
        }
    }

    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: .5,
        })
        if (result.canceled) {
            return;
        }
        setImage(result.assets[0]);
    };

    const handleUpdate = () => {
        if (
            (!image || !image.uri || typeof image.uri !== 'string' || image.uri.trim().length === 0) &&
            name.trim().length === 0 &&
            description.trim().length === 0 &&
            (!status || (status !== 0 && status !== 1))
        ) {
            Alert.alert('Update failed', 'Please fill in at least one field or make a valid change.');
            return;
        }

        const formData = new FormData();
        formData.append('id_salon', id_salon);
        if (name.trim().length > 0) {
            formData.append('name', name);
        }
        if (description.trim().length > 0) {
            formData.append('description', description);
        }
        if (status !== undefined && (status === 0 || status === 1)) {
            formData.append('status', status);
        }
        if (image && image.uri && typeof image.uri === 'string') {
            formData.append('image', {
                uri: image.uri,
                type: 'image/image',
                name: image.uri.substring(image.uri.lastIndexOf('/') + 1),
            });
        }

        fetch('http://192.168.28.142/MobileWeb/INT/update_salon.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.message === 'Ok') {
                    Alert.alert('Update successful', 'The salon has been updated.');
                } else {
                    Alert.alert('Update failed', 'The salon could not be updated.');
                }
            })
            .catch((error) => console.error(error));
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Page</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder={`${name}`}
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <Text style={styles.label}>Image</Text>
            <TouchableOpacity style={styles.input} onPress={PickImage}>
                    {<Text style={styles.text}>{image && image.uri && image.uri.substring(image.uri.lastIndexOf('/') + 1, image.uri.length) || image }</Text>}
            </TouchableOpacity>

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder={`${description}`}
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <Text style={styles.label}>Status</Text>
            <TextInput
                style={styles.input}
                placeholder="Status"
                keyboardType="numeric"
                value={status === undefined ? '' : status.toString()}
                onChangeText={(text) => {
                    if (text === '' || (text === '0' || text === '1')) {
                        setStatus(text);
                    } else {
                        Alert.alert('Invalid input', 'Status must be either 0 or 1.');
                    }
                }}
            />
            <TouchableOpacity style={styles.createButton} onPress={handleUpdate}>
                <Text style={[styles.createButtonText]}>UPDATE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        backgroundColor: "#F5F5F5",
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#1c1c1c",
        borderRadius: 50,
        width: 30,
        height: 30,
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    createButton: {
        padding: 15,
        backgroundColor: "#1F2937",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        height: 60,
        marginTop: 15,
    },
    createButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#1c1c1c",
        marginBottom: 10,
        textAlign:"center",
    },
});

export default Update;
