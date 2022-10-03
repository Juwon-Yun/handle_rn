import React from "react";
import styled from "styled-components/native";
import { makeImagePath } from "../common/utils";

const Image = styled.Image`
    width : 100px;
    height : 160px;
    border-radius: 5px;
`;

interface PosterProps {
    path : string
}

const Poster : React.FC<PosterProps> = ({path}) => {
    return (<Image source={{uri : makeImagePath(path)}}/>)
};

export default Poster;