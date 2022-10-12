import React from "react";
import styled from "styled-components/native";

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

interface RowProps {
    title : string;
}

const Row : React.FC<RowProps> = ({title, children}) => (
    <ListContainer>
        <ListTitle>{title}</ListTitle> 
        {children}
    </ ListContainer>
);

export default Row;