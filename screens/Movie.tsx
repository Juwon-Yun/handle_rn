import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
// https://github.com/reactrondev/react-native-web-swiper
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slide from "../components/Slide";
import VMedia from "./VMedia";
import HMedia from "./HMedia";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api/api";

const {height : swiperHeight} = Dimensions.get("window");

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

const VSpacer = styled.View`
    width : 20px;
`;

const HSpacer = styled.View`
    height : 20px;
`;

// TODO: 
// node.js나 React에서 Typescript로 작업할 때 에러가 발생하면 TypeScript가 
// 코드를 컴파일하기 때문에 에러가 있으면 컴파일 하지 못하지만, 
// rn-ts에서의 typescript는 도와주는 역할이라 에러를 무시해도 앱이 실행된다.

// https://reactnavigation.org/docs/typescript/#type-checking-screens
const Movie : React.FC<NativeStackScreenProps<any, 'Movie'>> = () =>{ 
    // const [refreshing, setRefreshing] = useState(false);
    // 모든 쿼리, 캐시를 관리한다.
    const queryClient = useQueryClient();

    const {
        isLoading : nowPlayingIsLoading,
        isError : nowPlayingIsError,
        data : nowPlayingData,
        isRefetching : isRefetchingNowPlaying,
        refetch : refetchNowPlaying,
        // fetcher의 카테고리로 범주화한다.
        // query key가 생략되어 사용된다. 
    } = useQuery(["movies","nowPlaying"], moviesApi.nowPlaying); // 다른 컴포넌트에서 nowPlaying 쿼리로 fetcher 했을 때, 다른게 없다면 cache에서 꺼내온다. 
    const {
        isLoading : upcommingIsLoading,
        isError : upcommingIsError,
        data : upcommingData,
        isRefetching : isRefetchingUpcomming,
        refetch : refetchUpcomming,
    } = useQuery(["movies","upcomming"], moviesApi.upcomming);
    const {
        isLoading : trendingIsLoading,
        isError : trendingIsError,
        data : trendingData,
        refetch : refetchTrending,
        isRefetching : isRefetchingTrending,
    } = useQuery(["movies","trending"], moviesApi.trending);

    const onRefresh =  async () => {
        // refetchNowPlaying()
        // refetchUpcomming()
        // refetchTrending()
        queryClient.refetchQueries(["movies"]);
    };

    const movieKeyExtractor = (item) => item.id + ""

    const renderVMedia = ({item, index, separators}) => (
        <VMedia 
            key={item.id}
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
        />
    );

    const renderHMedia = ({item, index, separators}) => (
        <HMedia
            key={item.id}
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
            overview={item.overview}
        />
    );

    const loading = nowPlayingIsLoading || upcommingIsLoading || trendingIsLoading;
    const refreshing = isRefetchingNowPlaying || isRefetchingUpcomming || isRefetchingTrending;
    
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
            {nowPlayingData.results.map(movie=>(
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
                horizontal
                data={trendingData.results}
                contentContainerStyle={{paddingLeft : 30}}
                showsHorizontalScrollIndicator={false}
                // ItemSeparatorComponent={() => <View><Text>between movie component</Text></View>}
                ItemSeparatorComponent={VSpacer}
                // key 랑 같음
                keyExtractor={movieKeyExtractor}
                renderItem={renderVMedia}
            >
            </TrendingScroll>
        </ListContainer>
        <CommingSoonTitle>Comming Soon</CommingSoonTitle> 
        </>)}
        // refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        // }

        data={upcommingData.results}
        ItemSeparatorComponent={HSpacer}
        keyExtractor={movieKeyExtractor}
        renderItem={renderHMedia}

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
