import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, useColorScheme } from "react-native";
// https://github.com/reactrondev/react-native-web-swiper
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { makeImagePath } from "../common/utils";
import { BlurView } from "expo-blur";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

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
    margin-left : 20px;
`;

const TrendingScroll = styled.ScrollView`
    margin-top : 20px;
`;

const TrendMovie = styled.View`
    margin-right : 20px;
`;

const Title = styled.Text`
    color : white;
    font-weight : 600;
    margin-top : 7px;
    margin-bottom : 5px;
`;
const Vote = styled.Text`
    color : rgba(255,255,255,0.8);
    font-size: 10px;
`;

const ListContainer = styled.View`
    margin-bottom : 40px;
`;

const HMovie = styled.View`
    padding: 0 30px;
    flex-direction: row;
    margin-bottom : 30px;
`;

const HColumn = styled.View`
    margin-left: 15px;
    width: 80%;
`;

const Overview = styled.Text`
    color : white;
    opacity: 0.8;
    width: 80%;
`;

const Release = styled(Overview)`
    width : 100%;
    font-size: 12px;
    margin-vertical: 10px;
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

    return loading ? (
        <Loader>
            <ActivityIndicator size={"small"}/>
        </Loader>
        ) : (
    <CustomScrollView>
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
            <TrendingScroll 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft : 30}}
            >
                {trending.map( movie => 
                <TrendMovie key={movie.id}>
                    <Poster path={movie.poster_path}></Poster>
                    <Title>
                        {movie.original_title.slice(0, 13)}
                        {movie.original_title.length > 13 ? "..." : ""}
                    </Title>
                    {movie.vote_average > 0 ?
                        <Vote>⭐️ {movie.vote_average.toFixed(1)}/10</Vote>
                    : "Comming Soon"}
                    
                </TrendMovie>)}
            </TrendingScroll>
        </ListContainer>
        <CommingSoonTitle>Comming Soon</CommingSoonTitle> 
                {upcomming.map( (movie) => 
                    <HMovie key={movie.id}>
                        <Poster path={movie.poster_path}></Poster>
                        <HColumn>
                            <Title>{movie.original_title}</Title>
                            <Release>{new Date(movie.release_date).toLocaleDateString("ko")}</Release>
                            {/* new Date(movie.release_date).toLocaleDateString("ko", {month: "long", day: "numeric", year: "long"}) */}
                            <Overview>{
                                movie.overview !== "" && movie.overview.length > 120 
                                ? `${movie.overview.slice(0, 120)}...`
                                : movie.overview}
                            </Overview>
                        </HColumn>
                    </HMovie>)
                }
    </CustomScrollView>)};


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
