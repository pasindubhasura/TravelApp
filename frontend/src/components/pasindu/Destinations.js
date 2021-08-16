import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import axios from "axios";
export default function Destinations() {
  const [destinations, setdestinations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5001/destinations");
    if (!response.data.error) setdestinations(response.data.destinations);
  };
  let x = 1;
  return (
    <MainDiv>
      <H2>Destination</H2>
      <Row>
        <ButtonSection>
          <Button color={"green"} style={{ margin: "0px 7px 0px 20px" }}>
            Add Destination
          </Button>
          <ButtonSecondary color={"green"}>Download</ButtonSecondary>
        </ButtonSection>
        <SearchBar>
          <SearchBarInput></SearchBarInput>
        </SearchBar>
      </Row>
      <TableContainer>
        <Table>
          <thead>
            <th>No</th>
            <th>Destination</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Action</th>
          </thead>
          <tbody>
            {destinations.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{x++}</td>
                  <td>{item.destination}</td>
                  <td>{item.city}</td>
                  <td>{item.district}</td>
                  <td>{item.province}</td>
                  <td>
                    <Center>
                      <Button color={"blue"} style={{ marginRight: "7px" }}>
                        Edit
                      </Button>
                      <Button color={"red"}>Delete</Button>
                    </Center>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </MainDiv>
  );
}
const MainDiv = Styled.div`
margin:0px auto;
background-color:white;
width:100%;
display:flex;
flex-direction: column;
min-height:100vh;
`;
const H2 = Styled.h2`
margin:20px;

`;
const Row = Styled.div`
width:100%;
display:grid;
grid-template-columns:5;
`;
const ButtonSection = Styled.div`
  grid-column-start:1;
  grid-column-end:2;
margin: 10px 20px 10px 0px;
`;
const SearchBar = Styled.form`
grid-column-start:5;
grid-column-end:5;
margin: 10px 20px;
`;
const SearchBarInput = Styled.input`
width: 100%;
height:100%;
padding: 0px;
`;
const TableContainer = Styled.div`
margin:10px 20px;
`;
const Table = Styled.table`
th,td{
  border: 1px solid black;
  padding:5px;
}
border: 1px solid black;
border-collapse: collapse;
width: 100%;
`;
const Button = Styled.button`
background-color: ${(props) => props.color};
color: ${(props) => props.fontColor || "white"};
border: 2px solid ${(props) => props.color};
border-radius:8px ;
padding: 7px 12px;
&:hover{
  filter: brightness(85%);
  cursor:pointer;
}`;

const ButtonSecondary = Styled.button`
background-color: white;
color: ${(props) => props.fontColor || "black"};
border: 2px solid ${(props) => props.color};
border-radius:8px ;
padding: 7px 12px;
&:hover{
  background-color:${(props) => props.color};
  color: white;
  cursor:pointer;
}`;

const Center = Styled.div`
display:flex;
justify-content:center;
`;
