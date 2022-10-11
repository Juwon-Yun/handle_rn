import React from "react";
import styled from "styled-components/native";

interface VotesProps{
    votes : number;
}

const Text = styled.Text<{isDark : boolean}>`
    color: rgba(255,255,255,0.8);
    font-size: 10px;
    color: ${(props)=> (props.isDark ? "white" : props.theme.textColor)};
`;

const Votes : React.FC<VotesProps> = ({votes}) => (
    <Text>{votes > 0 ? `⭐️ ${votes}/10` : `Comming Soon`}</Text>
)

export default Votes;
