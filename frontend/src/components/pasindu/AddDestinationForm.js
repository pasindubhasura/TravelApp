import React, { useState } from "react";
import Styled from "styled-components";
import axios from "axios";
import styled from "styled-components";
import defaultImage from "../../images/defaultImage.jpg";
import { districts, provinces, colors } from "./data";

export default function AddDestinationForm() {
  const [img, setImg] = useState(defaultImage);
  const [district, setdistrict] = useState("none");
  const [province, setprovince] = useState("none");
  const [destination, setdestination] = useState("");
  const [city, setcity] = useState("");
  const [description, setdescription] = useState("");

  const clear = () => {
    setcity("");
    setdistrict("none");
    setprovince("none");
    setdestination("");
    setdescription("");
  };
  return (
    <MainDiv>
      <H2>Add Destination Details</H2>
      <FormGrid>
        <Column>
          <TextInput
            placeholder="Destination"
            type="text"
            value={destination}
            onChange={(e) => setdestination(e.target.value)}
          />
          <TextInput
            placeholder="City"
            type="text"
            onChange={(e) => setcity(e.target.value)}
            value={city}
          />
          <Dropdown
            onChange={(e) => setdistrict(e.target.value)}
            value={district}
          >
            <option value="none" disabled hidden>
              District
            </option>
            {districts.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </Dropdown>
          <Dropdown
            onChange={(e) => setprovince(e.target.value)}
            value={province}
          >
            <option value="none" disabled hidden>
              Province
            </option>
            {provinces.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </Dropdown>
          <TextInputBox
            placeholder="Description"
            rows={8}
            onChange={(e) => setdescription(e.target.value)}
            value={description}
          />
          <Button
            color={colors.darkerGreen}
            style={{ marginRight: "2%" }}
            onClick={clear}
            type="button"
          >
            Clear
          </Button>
          <ButtonSecondary color={colors.darkerGreen}>
            Add Destination
          </ButtonSecondary>
        </Column>
        <Column>
          <Center>
            <Image src={img} />
            <UploadButton color={colors.darkerGreen}>
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
  //background-color: red;
  width: 100%;
  padding-right: 20px;
`;

const TextInput = styled.input`
  width: 100%;
  padding-left: 5px;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid;
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
  border: 1px solid ${(props) => props.color};
  display: inline-block;
  border-radius: 5px;
  font-weight: bold;
  padding: 8px 14px;
  background-color: ${(props) => props.color};
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
  padding-left: 5px;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 5px;
  border-style: solid;
`;
