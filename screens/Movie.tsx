import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
// https://github.com/reactrondev/react-native-web-swiper
import Swiper from "react-native-web-swiper";
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
const BgImg = styled.Image`
    width : 100%;
    height : 100%;
    position : absolute;
`
const Title = styled.Text`

`
// TODO: 
// node.js나 React에서 Typescript로 작업할 때 에러가 발생하면 TypeScript가 
// 코드를 컴파일하기 때문에 에러가 있으면 컴파일 하지 못하지만, 
// rn-ts에서의 typescript는 도와주는 역할이라 에러를 무시해도 앱이 실행된다.

// https://reactnavigation.org/docs/typescript/#type-checking-screens
const Movie : React.FC<NativeStackScreenProps<any, 'Movie'>> = () =>{ 
    const [loading, setLoading] = useState(true);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

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
        <Swiper loop timeout={3.5} controlsEnabled={false} containerStyle={{width : "100%", height : swiperHeight * 0.25}}>
            {nowPlayingMovies.map(movie=>(
                <View key={movie.id} >
                    <BgImg source={{uri : makeImagePath(movie.backdrop_path)}}/>
                    <BlurView>
                        <Title>{movie.original_title}</Title>
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
