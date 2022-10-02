import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import { makeImagePath } from '../common/utils';

const View = styled.View`
    flex : 1;
`
const Loader = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`
const BgImg = styled.Image``
const Title = styled.Text<{isDark : boolean}>`
    font-size: 16px;
    font-weight: 600;
    color: ${(props)=> (props.isDark ? "white" : props.theme.textColor)};
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

const Overview = styled.Text<{isDark : boolean}>`
    margin-top : 10px;
    color: ${(props)=> props.isDark ? "rgba(255,255,255,0.8)" : "rgba(0, 0, 0,0.8)"};
`;

// extend style => flutter의 copyWith()와 같다.
const Votes = styled(Overview)`
    margin-top : 5px;
    font-size: 12px;
`;

interface SlideProps {
    backdropPath : string
    posterPath : string
    originalTitle : string
    voteAverage : number
    overview : string
}

const Slide: React.FC<SlideProps> = ({
    backdropPath,
    posterPath,
    originalTitle,
    voteAverage, overview}) => {
    const isDark = useColorScheme() === 'dark';

    return (
        <View  >
        <BgImg 
            source={{uri : makeImagePath(backdropPath)}}
            style={StyleSheet.absoluteFill}
        />
        <BlurView
            tint={isDark ? "dark" : "light"}
            intensity={80}
            style={StyleSheet.absoluteFill}
        >
            <Wrapper>
                <Poster source={{uri : makeImagePath(posterPath)}}></Poster>
                <Column>
                    <Title isDark={isDark}>{originalTitle}</Title>
                    { voteAverage > 0 ? <Votes isDark={isDark}>⭐️{voteAverage}/10</Votes> : null}
                    <Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
                </Column>
            </Wrapper>
        </BlurView>
    </View>
    )
};



export default Slide;

