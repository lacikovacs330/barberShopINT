import React, {useEffect, useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";

const Create = () => {
    const [ownername, setOwnername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [salon, setSalon] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

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

    const handleCreate = () => {
        const formData = new FormData();
        if (ownername.trim().length === 0  || firstname.trim().length === 0  || lastname.trim().length === 0  || password.trim().length === 0  || email.trim().length === 0  || !salon.trim().length === 0  || description.trim().length === 0 )
        {
            Alert.alert('Invalid input', 'Please fill all fields.');
            return;
        }
        formData.append("ownername", ownername);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("salon", salon);
        formData.append("description", description);
        if (image && image.uri && typeof image.uri === "string") {
            formData.append("image", {
                uri: image.uri,
                type: "image/image",
                name: image.uri.substring(image.uri.lastIndexOf("/") + 1),
            });
        }

        fetch("http://192.168.28.142/MobileWeb/INT/create_salon.php", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.message === "Ok") {
                    Alert.alert("Update successful", "The salon has been created.");
                } else {
                    Alert.alert("Update failed", "The salon could not be created.");
                }
            })
            .catch((error) => console.error(error));
    };







    return (
        <KeyboardAvoidingWrapper>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 80 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20, alignSelf: "center" }}>
                Create
            </Text>

            <TextInput
                placeholder="Ownername"
                value={ownername}
                onChangeText={setOwnername}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginBottom: 30,
                    borderRadius: 10,
                }}
            />
            <TextInput
                placeholder="Firstname"
                value={firstname}
                onChangeText={setFirstname}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginBottom: 30,
                    borderRadius: 10,
                }}
            />
            <TextInput
                placeholder="Lastname"
                value={lastname}
                onChangeText={setLastname}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginBottom: 30,
                    borderRadius: 10,
                }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginBottom: 30,
                    borderRadius: 10,
                }}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginBottom: 30,
                    borderRadius: 10,
                }}
            />
            <TextInput
                placeholder="Salon"
                value={salon}
                onChangeText={setSalon}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginBottom: 30,
                    borderRadius: 10,
                }}
            />
            <TouchableOpacity style={styles.input} onPress={PickImage}>
                {<Text style={styles.text}>{image && image.uri && image.uri.substring(image.uri.lastIndexOf('/') + 1, image.uri.length) || "Choose image" }</Text>}
            </TouchableOpacity>
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginBottom: 30,
                    height: 100,
                    borderRadius: 10,
                }}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: "#333",
                    padding: 10,
                    borderRadius: 5,
                    alignItems: "center",
                }}
            onPress={handleCreate}>
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                    Create
                </Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingWrapper>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
    },
});

export default Create;