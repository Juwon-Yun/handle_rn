import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListContainer = styled.View`
    margin-bottom : 40px;
`;

const ListTitle = styled.Text<{isDark : boolean}>`
    color: ${(props)=> (props.isDark ? "white" : props.theme.textColor)};
    font-size : 16px;
    font-weight : 600;
    margin-left : 30px;
    margin-bottom: 20px;
`;

export const VSpacer = styled.View`
    width : 20px;
`;

interface RowProps {
    title : string;
    data : any[]
}

const Row : React.FC<RowProps> = ({title, data}) => (
    <ListContainer>
        <ListTitle>{title}</ListTitle> 
        <FlatList 
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={VSpacer}
            contentContainerStyle={{paddingHorizontal : 30}}
            keyExtractor={(item) => item.id + ""}
            renderItem={({item}) => (
                <VMedia
                    posterPath={item.poster_path}
                    originalTitle={item.original_title ?? item.original_name}
                    voteAverage={item.vote_average}
                />
            )}
        />
    </ ListContainer>
);

export default Row;