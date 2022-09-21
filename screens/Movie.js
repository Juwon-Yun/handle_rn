import React from "react";
import {Text, TouchableOpacity} from 'react-native'

const Movie = ({navigation : {navigate}}) => <TouchableOpacity
    style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}
    // Tab Nav에서 Stack Nav로 가려고하기 때문에
    // 다른 Nav 끼리는 Nav명을 명시해줘야 한다.
    // onPress={ () => navigate("Three")}
    onPress={ () => navigate("Stack", {screen : "Three"})}
    >
        <Text> Movie </Text>
    </TouchableOpacity>

export default Movie;
