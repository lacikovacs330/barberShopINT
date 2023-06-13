import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';

import {Formik} from "formik";

import {Octicons, Ionicons} from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    Colors,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from "./../styles/styles";

import { View } from 'react-native';

const {brand, darkLight,tertiary, primary} = Colors;

import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";

const SignUp = ({navigation}) =>{
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePassword2, setHidePassword2] = useState(true);
    const [username, setUsername] = useState('');
    const [lname, setLName] = useState('');
    const [fname, setFName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const signup = async () => {
        if (username.trim().length != 0 && password.trim().length != 0 && password2.trim().length !=0 && lname.trim().length !=0 && fname.trim().length !=0 && email.trim().length !=0) {
        try {
            const response = await fetch('http://192.168.28.142/MobileWeb/INT/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    password2,
                    lname,
                    fname,
                    email,
                }),
            });
            const data = await response.json();
            setMessage(data.message);
            if (data.message === "Successful registration!")
            {
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error(error);
        }
    }
    else
        {
            setMessage("Fill in all fields!")
        }
    };

    return(
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Barber Shop</PageTitle>
                <SubTitle>Sign Up</SubTitle>
                <StyledFormArea>

                    <MyTextInput
                        label="Username"
                        icon="person"
                        placeholder="Username"
                        placeholderTextColor={tertiary}
                        onChangeText={(username) => setUsername(username)}
                    />

                    <MyTextInput
                        label="Name"
                        icon="person"
                        placeholder="Last name"
                        onChangeText={(lname) => setLName(lname)}
                        placeholderTextColor={tertiary}
                    />

                    <MyTextInput
                        icon="person"
                        placeholder="First name"
                        onChangeText={(fname) => setFName(fname)}
                        placeholderTextColor={tertiary}
                    />

                    <MyTextInput
                        label="Password"
                        icon="lock"
                        placeholder="* * * * * * * *"
                        onChangeText={(password) => setPassword(password)}
                        placeholderTextColor={tertiary}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                    />

                    <MyTextInput
                        label="Confirm Password"
                        icon="lock"
                        placeholder="* * * * * * * *"
                        onChangeText={(password2) => setPassword2(password2)}
                        placeholderTextColor={tertiary}
                        secureTextEntry={hidePassword2}
                        isPassword={true}
                        hidePassword={hidePassword2}
                        setHidePassword={setHidePassword2}
                    />

                    <MyTextInput
                        icon="person"
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                        placeholderTextColor={tertiary}
                        keyboardType="email-address"
                    />

                    <MsgBox>{message}</MsgBox>
                    <StyledButton onPress={() => signup()} title="SignUp">
                        <ButtonText>Sign Up</ButtonText>
                    </StyledButton>
                    <Line/>

                    <ExtraView>
                        <ExtraText>Already have an account? </ExtraText>
                        <TextLink onPress={() => navigation.navigate('Login')}>
                            <TextLinkContent>Log In</TextLinkContent>
                        </TextLink>
                    </ExtraView>

                </StyledFormArea>

            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={tertiary}/>
                </RightIcon>
            )}

            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={tertiary}/>
                </RightIcon>
                )}
        </View>
    )
}

export default SignUp;