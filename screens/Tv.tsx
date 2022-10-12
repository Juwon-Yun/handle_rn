import React from "react";
import {View, Text, ScrollView, FlatList} from 'react-native'
import { useQuery } from "react-query";
import { tvApi } from "../api/api";
import Loader from "../components/Loader";
import Row, { VSpacer } from "./Row";
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
        <ScrollView contentContainerStyle={{paddingVertical : 30}}> 
            <Row title="Trending TV" data={trandingData.results} />
            <Row title="Airing Today" data={todayData.results} />
            <Row title="Top Rated TV" data={topData.results} />
        </ScrollView>
    )
}

export default Tv