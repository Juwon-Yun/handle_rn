import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions } from "react-native";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";

const {height : swiperHeight} = Dimensions.get("window");

const CustomScrollView = styled.ScrollView`
    background-color: ${props => props.theme.mainBgColor}
`;

const View = styled.View`
    flex : 1;
`

// TODO: 
// node.js나 React에서 Typescript로 작업할 때 에러가 발생하면 TypeScript가 
// 코드를 컴파일하기 때문에 에러가 있으면 컴파일 하지 못하지만, 
// rn-ts에서의 typescript는 도와주는 역할이라 에러를 무시해도 앱이 실행된다.

// https://reactnavigation.org/docs/typescript/#type-checking-screens
const Movie : React.FC<NativeStackScreenProps<any, 'Movie'>> = () => (
    <CustomScrollView>
        <Swiper loop timeout={3.5} controlsEnabled={false} containerStyle={{width : "100%", height : swiperHeight * 0.25}}>
            <View style={{backgroundColor : "red"}}></View>
            <View style={{backgroundColor : "blue"}}></View>
            <View style={{backgroundColor : "white"}}></View>
        </Swiper>
    </CustomScrollView>
);


// https://reactnavigation.org/docs/typescript/#type-checking-screens
// const Movie : React.FC<NativeStackScreenProps<any, 'Movie'>> = ({navigation : {navigate}}) => <Btn
    // style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}
    // Tab Nav에서 Stack Nav로 가려고하기 때문에
    // 다른 Nav 끼리는 Nav명을 명시해줘야 한다.
    // onPress={ () => navigate("Three")}
    // 
    // onPress={ () =>  navigate("Stack", {screen : "Three"})}
    // >   
    
        {/* <Title selected={true}> Movie !!</Title> */}
    {/* </Btn> */}

export default Movie;
