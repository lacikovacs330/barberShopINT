import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";

const Admin = ({ route, navigation }) => {
    const { username } = route.params;
    const [salons, setSalons] = useState([]);

    useEffect(() => {
        fetch("http://192.168.28.142/MobileWeb/INT/select_salon.php")
            .then((response) => response.json())
            .then((data) => {
                setSalons(data);
            })
            .catch((error) => console.error(error));
    }, [salons]);

    const handleDelete = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this salon?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        fetch(`http://192.168.28.142/MobileWeb/INT/delete_salon.php`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ id_salon: id }),
                        })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error("Network response was not ok");
                                }
                                return response.json();
                            })
                            .then((data) => {
                                setSalons((prevSalons) =>
                                    prevSalons.filter((salon) => salon.id_salon !== id)
                                );
                            })
                            .catch((error) => {
                                console.error(error);
                        });
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Admin Page</Text>
                <Text style={styles.subtitle}>Welcome {username}!</Text>
            </View>
            <ScrollView style={styles.salons}>
                {salons.map((salon) => (
                    <TouchableOpacity style={styles.salon} key={salon.id_salon}>
                        <Text style={styles.salonText}>{salon.name}</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Update", {
                                id_salon: salon.id_salon,
                                name: salon.name,
                                image: salon.image,
                                description: salon.description,
                                status: salon.status
                            })}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleDelete(salon.id_salon)}
                            >
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.createButton } onPress={() => navigation.navigate("Create")}>
                <Text style={styles.createButtonText}>CREATE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 20,
    },
    header: {
        paddingVertical: 40,
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#1c1c1c",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: "#757575",
    },
    salons: {
        marginTop: 10,
        marginBottom: 130,
    },
    salon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    salonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1c1c1c",
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
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
        backgroundColor: "#1c1c1c",
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
    },
    createButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Admin;