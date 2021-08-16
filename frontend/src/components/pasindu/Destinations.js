import React, { useState, useEffect } from "react";
import Styled from "styled-components";

export default function Destinations() {
  return (
    <MainDiv>
      <h2>Destination</h2>
      <Row>
        <ButtonSection>
          <Button color={"green"} style={{ marginLeft: "20px" }}>
            Add Destination
          </Button>
          <Button color={"yellow"}>Download</Button>
        </ButtonSection>
        <SearchBar>
          <SearchBarInput></SearchBarInput>
        </SearchBar>
      </Row>
      <TableContainer>
        <Table></Table>
      </TableContainer>
    </MainDiv>
  );
}
const MainDiv = Styled.div`
margin:0px auto;
background-color:grey;
width:100%;
display:flex;
flex-direction: column;
`;
const Row = Styled.div`
background-color:green;
width:100%;
display:grid;
grid-template-columns:auto auto auto auto auto;
`;
const ButtonSection = Styled.div`
  grid-column-start:1;
  grid-column-end:2;
background-color:red;
`;
const SearchBar = Styled.form`
grid-column-start:5;
background-color:red;
margin-right:20px;
`;
const SearchBarInput = Styled.input`
padding:2px;
width: 100%;
`;
const TableContainer = Styled.div`
`;
const Table = Styled.table`
`;
const Button = Styled.button`
background-color: ${(props) => props.color};
margin-right:10px ;
`;
