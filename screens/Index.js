import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

import {
    InnerContainer,
    PageTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    IndexContainer,
    WelcomeImage,
} from "../styles/styles";

const Index = ({ navigation, route }) => {
    const { username } = route.params;
    const [loggedIn, setLoggedIn] = useState(true);
    const [salons, setSalons] = useState([]);

    useEffect(() => {
        fetch("http://192.168.28.142/MobileWeb/INT/select_salon.php")
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.filter((item) => item.status === 1);
                setSalons(filteredData);
            })
            .catch((error) => console.error(error));
    }, []);


    const handleLogout = () => {
        setLoggedIn(false);
        navigation.navigate("Login");
    };

    return loggedIn ? (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage
                    resizeMode="cover"
                    source={require("./../assets/welcomeimage.jpg")}
                />
                <PageTitle welcome={true}>Welcome {username}!</PageTitle>
                <IndexContainer>
                    <StyledFormArea>
                        <ScrollView style={styles.scrollView}>
                            {salons.map((item, index) => (
                                <View style={styles.salonContainer} key={index}>
                                    <Image
                                        source={{
                                            uri: `http://192.168.28.142/MobileWeb/img/${item.image}`,
                                        }}
                                        style={styles.image}
                                    />
                                    <View style={styles.salonInfo}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.description}>{item.description}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                        <Line />
                        <StyledButton onPress={handleLogout}>
                            <ButtonText>Log Out</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </IndexContainer>
                <View style={styles.logOutContainer}></View>
            </InnerContainer>
        </>
    ) : null;
};

const styles = StyleSheet.create({
    scrollView: {
        marginVertical: 15,
    },
    salonContainer: {
        flexDirection: "row",
        marginVertical: 15,
    },
    image: {
        width: 100,
        height: 150,
        marginRight: 10,
    },
    salonInfo: {
        flex: 1,
        justifyContent: "center",
    },
    name: {
        fontWeight: "bold",
        fontSize: 18,
    },
    description: {
        fontSize: 14,
    },
    logOutContainer: {
        marginTop: 50,
        alignItems: "center",
    },
});

export default Index;
