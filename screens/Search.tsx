import React, { useState } from "react";
import {View, Text} from 'react-native'
import styled from "styled-components/native";

const Container = styled.ScrollView`

`;

const SearchBar = styled.TextInput<{isDark : boolean}>`
    background-color: ${(props)=> (props.isDark ? "white" : props.theme.textColor)};;
    padding: 10px 15px;
    border-radius: 15px;
    width : 90%;
    margin: 10px auto;
`;

const Search = () => {
    const [query, setQuery] = useState("")
    const onChangeText = (test:string) => setQuery(test)

    return (<Container>
        <SearchBar 
            placeholder={"Search for Tv Show"} 
            placeholderTextColor={"grey"}
            // returnKeyLable="search for Movie" 안드로이드인 경우 
            returnKeyType="search" // iOS인 경우의 
            autocapitalize={false}  // 글자의 기본값이 대문자가 되도록 하는 설정 
            autocorrect={false} // 자동 수정? 자동 완성 
            onChangeText={onChangeText}
        />
    </Container>
)}

export default Search;