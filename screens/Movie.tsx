import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme } from "react-native";
// https://github.com/reactrondev/react-native-web-swiper
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { makeImagePath } from "../common/utils";
import { BlurView } from "expo-blur";

const {height : swiperHeight} = Dimensions.get("window");

const API_KEY = '34dbe792c998f87663d41737eb203cb2';

const CustomScrollView = styled.ScrollView`
`;

const View = styled.View`
    flex : 1;
`
const Loader = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`
const BgImg = styled.Image``
const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: white;
`
const Poster = styled.Image`
    width : 100px;
    height : 160px;
    border-radius: 5px;
`;
const Wrapper = styled.View`
    flex-direction: row;
    height : 100%;
    justify-content: center;
    align-items: center;
`;
const Column = styled.View`
    width: 40%;
    margin-left: 15px;
`;

const Overview = styled.Text`
    margin-top : 10px;
    color: rgba(255,255,255,0.8);
`;

// extend style => flutter의 copyWith()와 같다.
const Votes = styled(Overview)`
    margin-top : 5px;
    font-size: 12px;
`;

// TODO: 
// node.js나 React에서 Typescript로 작업할 때 에러가 발생하면 TypeScript가 
// 코드를 컴파일하기 때문에 에러가 있으면 컴파일 하지 못하지만, 
// rn-ts에서의 typescript는 도와주는 역할이라 에러를 무시해도 앱이 실행된다.

// https://reactnavigation.org/docs/typescript/#type-checking-screens
const Movie : React.FC<NativeStackScreenProps<any, 'Movie'>> = () =>{ 
    const [loading, setLoading] = useState(true);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const isDark = useColorScheme() === 'dark';
    const getNowPlaying = async () => {
        const {results} = await(
            await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
        ).json();
        
        // console.log(results);
        setNowPlayingMovies(results);
        setLoading(false);
    };

    useEffect(()=>{
        getNowPlaying();
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
            containerStyle={{width : "100%", height : swiperHeight * 0.25}}
        >
            {nowPlayingMovies.map(movie=>(
                <View key={movie.id} >
                    <BgImg 
                        source={{uri : makeImagePath(movie.backdrop_path)}}
                        style={StyleSheet.absoluteFill}
                    />
                    <BlurView
                        tint={isDark ? "dark" : "light"}
                        intensity={80}
                        style={StyleSheet.absoluteFill}
                    >
                        <Wrapper>
                            <Poster source={{uri : makeImagePath(movie.poster_path)}}></Poster>
                            <Column>
                                <Title>{movie.original_title}</Title>
                                <Overview>{movie.overview.slice(0, 90)}...</Overview>
                                <Votes>⭐️{movie.vote_average}/10</Votes>
                            </Column>
                        </Wrapper>
                    </BlurView>
                </View>
            ))}
            
        </Swiper>
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
