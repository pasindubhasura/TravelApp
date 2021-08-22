import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import axios from "axios";
import { resetIdCounter } from "react-tabs";

export default function VehicleList() {
  let [vehicles, setvehicles] = useState([]);
  let [search, setsearch] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5001/travelVehicles");
    if (!response.data.error) setvehicles(response.data.vehicles);
  };
  return (
    <Div>
      {vehicles.map((item, index) => {
        return (
          <Column key={index}>
            <Card>
              <ImageContainer>
                <Image src={item.image} />
              </ImageContainer>

              <LocationList>
                <Title>{item.destination}</Title>

                <Location>
                  <P>{item.city} |</P>
                  <P>{item.district} |</P>
                  <P>{item.province} </P>
                </Location>
                <P style={{ paddingLeft: "10px", paddingTop: "5px" }}>
                  {item.description}
                </P>
              </LocationList>
            </Card>
          </Column>
        );
      })}
    </Div>
  );
}
const Div = Styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Card = Styled.div`
  width: 100%;
  height: 170px;
  border: 1px solid green;
  border-radius: 5px;
  margin: 0px 0px 25px 0px;
  display: flex;
  box-shadow: 5px 6px 10px #888888;
  &:hover {
    cursor: pointer;
    filter: brightness(70%);
  }
`;
const Image = Styled.img`
  width: 90%;
  height: 100%;
  padding: 5px;
  object-fit: cover;
`;
const Column = Styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;
const Title = Styled.h5`
  padding-left: 10px;
  padding-top: 5px;
  font-weight: bold;
`;
const Location = Styled.div`
  padding-left: 10px;
  font-weight: bold;
  display: flex;
`;
const LocationList = Styled.div`
  display: flex;
  flex-direction: column;
`;
const P = Styled.div`
  padding-right: 5px;
`;
const ImageContainer = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 20%;
  min-width: 20%;
  height: 100%;
  border-right: 0.5px solid black;
`;
