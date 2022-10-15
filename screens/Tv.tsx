import React, { useState } from "react";
import {RefreshControl, ScrollView} from 'react-native'
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api/api";
import Loader from "../components/Loader";
import Row from "./Row";

const Tv = () => {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);

    const {isLoading : todayLoading, data : todayData } = useQuery(["tv", "today"], tvApi.airingToday);
    const {isLoading : topLoading, data : topData } = useQuery(["tv", "top"], tvApi.topRated);
    const {isLoading : trandingLoading, data : trandingData } = useQuery(["tv", "tranding"], tvApi.trending);

    const loading = todayLoading || topLoading || trandingLoading;

    const onRefresh = async () => {
        setRefreshing(true)
        await queryClient.refetchQueries(["tv"]);
        setRefreshing(false)
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