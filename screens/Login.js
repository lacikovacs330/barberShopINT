import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import Admin from './Admin';
import {Octicons, Ionicons} from '@expo/vector-icons';
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
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
const {brand,tertiary} = Colors;

import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";

const Login = ({navigation}) =>{
    const [hidePassword, setHidePassword] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    
    const login = async () => {
        try {
            const response = await fetch('http://192.168.28.142/MobileWeb/INT/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            const data = await response.json();
            setMessage(data.message);
            if (data.message === "Successful login!")
            {
                if (data.role && data.role === "admin") {
                    navigation.navigate('Admin', { username });
                } else {
                    navigation.navigate('Index', { username });
                }
            }
            else
            {
                data.message;
            }

        } catch (error) {
            console.error(error);
        }
    };
   

    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('./../assets/logo.png')} />
                    <SubTitle>Log In</SubTitle>
                    <StyledFormArea>
                        <MyTextInput
                            label="Username"
                            icon="person"
                            placeholder="Username"
                            placeholderTextColor={tertiary}
                            onChangeText={(username) => setUsername(username)}
                        />
                        <MyTextInput
                            label="Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={tertiary}
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MsgBox>{message}</MsgBox>
                        <StyledButton onPress={login} title="Login">
                            <ButtonText>Login</ButtonText>
                        </StyledButton>
                        <Line/>
                        <ExtraView>
                            <ExtraText>Don't have an account already? </ExtraText>
                            <TextLink onPress={() => {navigation.navigate('SignUp');}}>
                                <TextLinkContent>Sign Up</TextLinkContent>
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
        </View>
    )
}

export default Login;