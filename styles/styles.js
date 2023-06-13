import styled from 'styled-components'
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

export const Colors ={
    primary:'#ffffff',
    secondary: '#E5E7',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
};

const {primary, secondary, tertiary, darkLight} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${primary};
`

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items:center;
`;

export const IndexContainer = styled(InnerContainer)`
    padding: 25px;
    justify-content: center;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${tertiary};
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
    height: 40%;
    max-width: 100%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`;


export const PageLogo = styled.Image`
    width: 100%;
    height: 280px;
    margin-top: 62px;
`;

export const PageTitle = styled.Text`
    margin-top: 10px;
    font-size: 15px;
    text-align: center;
    font-weight: bold;
    color: ${tertiary};
    padding: 10px;
  
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight:bold;
    color: ${tertiary};
`;

export const StyledFormArea = styled.View`
  width: 90%;  
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${darkLight};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    border: 0.5px solid black;
    font-size: 16px;
    height: 60px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 35px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 33px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${tertiary};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    height: 60px;
    margin-top: 15px;
`;

export const ButtonText = styled.Text`
    color:${primary};
    font-size: 16px;
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-top:15px;
    margin-bottom:15px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    margin-bottom: 108px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-items: center;
    color: ${tertiary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: #6D28D9;
    font-size: 15px;
`;

