import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
// https://github.com/reactrondev/react-native-web-swiper
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { makeImagePath } from "../common/utils";
import { BlurView } from "expo-blur";
import Slide from "../components/Slide";
import VMedia from "./VMedia";
import HMedia from "./HMedia";

const {height : swiperHeight} = Dimensions.get("window");

const API_KEY = '34dbe792c998f87663d41737eb203cb2';

const CustomScrollView = styled.ScrollView`
`;

const Loader = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`

const ListTitle = styled.Text`
    color : white;
    font-size : 16px;
    font-weight : 600;
    margin-left : 30px;
`;

const TrendingScroll = styled.FlatList`
    margin-top : 20px;
`;


const ListContainer = styled.View`
    margin-bottom : 40px;
`;

const CommingSoonTitle = styled(ListTitle)`
    margin-bottom: 30px;
`;

// TODO: 
// node.js나 React에서 Typescript로 작업할 때 에러가 발생하면 TypeScript가 
// 코드를 컴파일하기 때문에 에러가 있으면 컴파일 하지 못하지만, 
// rn-ts에서의 typescript는 도와주는 역할이라 에러를 무시해도 앱이 실행된다.

// https://reactnavigation.org/docs/typescript/#type-checking-screens
const Movie : React.FC<NativeStackScreenProps<any, 'Movie'>> = () =>{ 
    const [loading, setLoading] = useState(true);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomming, setUpcomming] = useState([]);
    const [trending, setTrending] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getTrending = async () => {
        const {results} = await(
            await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
        ).json();
        setTrending(results);
    }

    const getUpcomming = async () => {
        const {results} = await(
            await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
        ).json();
        setUpcomming(results);
    };
    const getNowPlaying = async () => {
        const {results} = await(
            await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
        ).json();
        setNowPlayingMovies(results);
    };

    const getDate = async () => {
        await Promise.all([
            getNowPlaying(),
            getUpcomming(),
            getTrending(),
        ]);
        setLoading(false);
    }
    
    useEffect(()=>{
        getDate();
    },[])

    const onRefresh =  async () => {
        setRefreshing(true);
        await getDate();
        setRefreshing(false);
    };

    return loading ? (
        <Loader>
            <ActivityIndicator size={"small"}/>
        </Loader>
        ) : (
    <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        // List Header Component 를 사용해서 마찬가지로 FlatList로 감싼다.
        ListHeaderComponent={(
        <>
        <Swiper 
            horizontal
            loop 
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            // controlsEnabled={false}
            containerStyle={{width : "100%", height : swiperHeight * 0.25, marginBottom : 30}}
        >
            {nowPlayingMovies.map(movie=>(
                <Slide key={movie.id}
                    backdropPath = {movie.backdrop_path}
                    posterPath = {movie.poster_path}
                    originalTitle = {movie.original_title}
                    voteAverage = {movie.vote_average}
                    overview = {movie.overview}
                />
            ))}
        </Swiper>
        <ListContainer>
            <ListTitle>Trending Movies</ListTitle> 
            {/* FlatList doc https://reactnative.dev/docs/flatlist#required-renderitem */}
            <TrendingScroll 
                data={trending}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft : 30}}

                // ItemSeparatorComponent={() => <View><Text>between movie component</Text></View>}
                ItemSeparatorComponent={() => <View style={{width : 30}}></View>}
                // key 랑 같음
                keyExtractor={item => item.id+""}
                renderItem={ ({item, index, separators}) => (
                    <VMedia 
                    key={item.id}
                    posterPath={item.poster_path}
                    originalTitle={item.original_title}
                    voteAverage={item.vote_average}
                />
                )}
            >
            </TrendingScroll>
        </ListContainer>
        <CommingSoonTitle>Comming Soon</CommingSoonTitle> 
        </>)}
        // refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        // }

        data={upcomming}
        ItemSeparatorComponent={() => <View style={{height : 30}}></View>}
        keyExtractor={item => item.id+""}
        renderItem={ ({item, index, separators}) => (
            <HMedia
            key={item.id}
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
            overview={item.overview}
       />
        )}

    >
    </FlatList>
    )};


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
