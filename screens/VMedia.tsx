import React from "react";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import Votes from "./Votes";

const Movie = styled.View`
    align-items: center;
`;

const Title = styled.Text<{isDark : boolean}>`
    color: ${(props)=> (props.isDark ? "white" : props.theme.textColor)};
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`;

interface VMediaProps {
    posterPath : string;
    originalTitle : string;
    voteAverage: number;
}

const VMedia : React.FC<VMediaProps> = ({
    posterPath,
    originalTitle,
    voteAverage,
}) => {
   return (<Movie>
        <Poster path={posterPath} />
        <Title>
            {originalTitle.slice(0, 13)}
            {originalTitle.length > 13 ? "..." : null}
        </Title>
        <Votes votes={voteAverage}/>
    </Movie>)
};

export default VMedia;