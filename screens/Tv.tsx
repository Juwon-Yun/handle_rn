import React from "react";
import {RefreshControl, ScrollView} from 'react-native'
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api/api";
import Loader from "../components/Loader";
import Row from "./Row";

const Tv = () => {
    const queryClient = useQueryClient();

    const {isLoading : todayLoading, data : todayData, isRefetching : todayRefetching } = useQuery(["tv", "today"], tvApi.airingToday);
    const {isLoading : topLoading, data : topData, isRefetching : topRefetching } = useQuery(["tv", "top"], tvApi.topRated);
    const {isLoading : trandingLoading, data : trandingData, isRefetching : trandingRefetching } = useQuery(["tv", "tranding"], tvApi.trending);

    const loading = todayLoading || topLoading || trandingLoading;
    const refreshing = todayRefetching || topRefetching || trandingRefetching;

    const onRefresh = () => {
        queryClient.refetchQueries(["tv"]);
    };

    if(loading){
        return (<Loader />)
    }

    return (
        <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
            contentContainerStyle={{paddingVertical : 30}}
        > 
            <Row title="Trending TV" data={trandingData.results} />
            <Row title="Airing Today" data={todayData.results} />
            <Row title="Top Rated TV" data={topData.results} />
        </ScrollView>
    )
}

export default Tv 