import React, { useState } from "react";
import {View, Text} from 'react-native'
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api/api";
import { useQuery, useQueryClient } from "react-query";

const Container = styled.ScrollView`

`;

const SearchBar = styled.TextInput<{isDark : boolean}>`
    background-color: ${(props)=> (props.isDark ? "white" : props.theme.textColor)};
    padding: 10px 15px;
    border-radius: 15px;
    width : 90%;
    margin: 10px auto;
`;

const Search = () => {
    const [query, setQuery] = useState("")
    const {isLoading : moviesLoading, data : moviesData, refetch : searchMovies} = useQuery(
        ["searchMovies", query],
        moviesApi.search,
        {
            enabled : false, // component 가 첫 mount하는 시점에 fetch를 막는다.
        },
     );

     const {isLoading : tvLoading, data : tvData, refetch : searchTv} = useQuery(
        ["searchTv", query], 
        tvApi.search,
        {
            enabled : false,
        },
    );
    
    const onChangeText = (text:string) => setQuery(text)

    const onSubmit = () => {
        if(query === ""){
            return;
        }
        searchMovies();
    }

    console.log('movies ', moviesLoading ,moviesData);
    
    console.log('tv ', tvLoading ,tvData);

    return (<Container>
        <SearchBar 
            placeholder={"Search for Tv Show"} 
            placeholderTextColor={"grey"}
            // returnKeyLable="search for Movie" 안드로이드인 경우 
            returnKeyType="search" // iOS인 경우의 
            autocapitalize={false}  // 글자의 기본값이 대문자가 되도록 하는 설정 
            autocorrect={false} // 자동 수정? 자동 완성 
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
        />
    </Container>
)}

export default Search;