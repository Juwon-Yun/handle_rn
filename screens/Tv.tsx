import React from "react";
import {View, Text, ScrollView, FlatList} from 'react-native'
import { useQuery } from "react-query";
import { tvApi } from "../api/api";
import Loader from "../components/Loader";
import Row from "./Row";
import VMedia from "./VMedia";

const Tv = () => {
    const {isLoading : todayLoading, data : todayData } = useQuery(["tv", "today"], tvApi.airingToday);
    const {isLoading : topLoading, data : topData } = useQuery(["tv", "top"], tvApi.topRated);
    const {isLoading : trandingLoading, data : trandingData } = useQuery(["tv", "tranding"], tvApi.trending);

    const loading = todayLoading || topLoading || trandingLoading;

    if(loading){
        return (<Loader />)
    }

    return (
        <ScrollView>
            <Row title="Trending TV">
             <FlatList 
                data={trandingData.results}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <VMedia 
                        posterPath={item.poster_path}
                        originalTitle={item.original_name}
                        voteAverage={item.vote_average}
                    />
                )}
            />
            </Row>
            <FlatList 
                data={todayData.results}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <VMedia 
                        posterPath={item.poster_path}
                        originalTitle={item.original_name}
                        voteAverage={item.vote_average}
                    />
                )}
            />
             <FlatList 
                data={topData.results}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <VMedia 
                        posterPath={item.poster_path}
                        originalTitle={item.original_name}
                        voteAverage={item.vote_average}
                    />
                )}
            />
        </ScrollView>
        // <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
        //     <Text> TV </Text>
        // </View>
    )
}

export default Tv