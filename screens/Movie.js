import React from "react";
// import {Text, TouchableOpacity} from 'react-native'
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
    flex : 1;
    justify-content : center;
    align-items : center; 
    background-color: ${props => props.theme.mainBgColor}
`;

const Title = styled.Text`
    color : ${(props) => props.theme.textColor};
`;
    // color : ${(props) => props.selected ? "blue" : "red"};

const Movie = ({navigation : {navigate}}) => <Btn
    // style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}
    // Tab Nav에서 Stack Nav로 가려고하기 때문에
    // 다른 Nav 끼리는 Nav명을 명시해줘야 한다.
    // onPress={ () => navigate("Three")}
    onPress={ () => navigate("Stack", {screen : "Three"})}
    >   
        <Title selected={true}> Movie </Title>
    </Btn>

export default Movie;
