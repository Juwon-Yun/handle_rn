import React from "react";
import {View, Text} from 'react-native'
import { useQuery } from "react-query";
import { tvApi } from "../api/api";

const Tv = () => {
    const {isLoading : todayLoading, data : todayData } = useQuery(["tv", "today"], tvApi.airingToday);
    const {isLoading : topLoading, data : topData } = useQuery(["tv", "top"], tvApi.topRated);
    const {isLoading : trandingLoading, data : trandingData } = useQuery(["tv", "tranding"], tvApi.trending);

    const loading = todayLoading || topLoading || trandingLoading;

    return <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}><Text> TV </Text></View>
}

export default Tv