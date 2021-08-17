import React, { useState } from "react";
import Styled from "styled-components";
import axios from "axios";
import styled from "styled-components";
import defaultImage from "../../images/defaultImage.jpg";
import { districts, provinces } from "./data";

export default function AddDestinationForm() {
  const [img, setImg] = useState(defaultImage);
  const [district, setdistrict] = useState("");
  const [province, setprovince] = useState("");
  console.log(district);
  console.log(province);
  return (
    <MainDiv>
      <H2>Add Destination Details</H2>
      <FormGrid>
        <Column>
          <TextInput placeholder="Destination" type="text" />
          <TextInput placeholder="City" type="text" />
          <Dropdown onChange={(e) => setdistrict(e.target.value)}>
            {districts.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </Dropdown>
          <Dropdown onChange={(e) => setprovince(e.target.value)}>
            {provinces.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </Dropdown>
          <TextInputBox placeholder="Description" rows={8} />
          <Button color="green" style={{ marginRight: "2%" }}>
            Clear
          </Button>
          <ButtonSecondary color="green">Add Destination</ButtonSecondary>
        </Column>
        <Column>
          <Center>
            <Image src={img} />
            <UploadButton class="custom-file-upload">
              <FileInput type="file" />
              Upload Image
            </UploadButton>
          </Center>
        </Column>
      </FormGrid>
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
margin:20px 0px 0px 20px;
`;

const Button = Styled.button`
width:49%;
background-color: ${(props) => props.color};
color: ${(props) => props.fontColor || "white"};
border: 2px solid ${(props) => props.color};
border-radius:5px; 
font-weight:bold;
padding: 8px 14px;
&:hover{
  filter: brightness(85%);
  cursor:pointer;
}`;
const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 50% 50%;
  margin: 20px;
`;
const Column = styled.div`
  background-color: red;
  width: 100%;
  padding-right: 20px;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 20px;
  border-radius: 5px;
  border-style: solid;
`;
const TextInputBox = styled.textarea`
  width: 100%;
  padding: 5px;
  resize: none;
  margin-bottom: 20px;
  border-radius: 5px;
`;
const Image = styled.img`
  width: 90%;
`;
const Center = Styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;

const FileInput = styled.input`
  display: none;
`;
const UploadButton = styled.button`
  border: 1px solid green;
  display: inline-block;
  border-radius: 5px;
  font-weight: bold;
  padding: 8px 14px;
  background-color: green;
  margin: 10px 0px;
  color: white;
  &:hover {
    filter: brightness(85%);
    cursor: pointer;
  }
`;
const ButtonSecondary = Styled.button`
width: 49%;
background-color: white;
color: ${(props) => props.color || "black"};
border: 2px solid ${(props) => props.color};
border-radius:5px ;
font-weight:bold;
padding: 8px 14px;
&:hover{
  background-color:${(props) => props.color};
  color: white;
  cursor:pointer;
}`;
const Dropdown = styled.select`
  width: 100%;
  padding: 5px;
  margin-bottom: 20px;
  border-radius: 5px;
  border-style: solid;
`;
