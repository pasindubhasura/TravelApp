import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import axios from "axios";


export default function AccommodationList() {

  let [accommodations, setAccommodations] = useState([]);
  let [searchInput, setsearchInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5001/accommodation");
    if (response.data.success) {
      setAccommodations(response.data.existingAccommodations);
    }
  };

  if (searchInput.length > 0) {
    accommodations = accommodations.filter((i) => {
      return i.accommodationType.toLowerCase().match(searchInput.toLowerCase());
    });
  }
  return (
    <Div className="container">
      <Coulmn>
        <Row
          style={{
            justifyContent: "flex-start",
            marginLeft: "9%",
          }}
        >
          <h5 style={{ fontWeight: "bold" }}>Accommodations :</h5>
        </Row>
        <Row>
          <SearchField
            onChange={(e) => setsearchInput(e.target.value)}
            placeholder="Search an accommodation here..."
          />
        </Row>
      </Coulmn>
      {accommodations.map((accommodation, index) => {
        return (          
          <Column key={index}>
            <Card>
              <ImageContainer>
                <Image src={accommodation.accImage} />
              </ImageContainer>

              <LocationList style={{marginLeft:'20px'}}>
                <Title>{accommodation.accommodationType} - {accommodation.name}</Title>

                <Location>
                  <P>No of Rooms : {accommodation.noOfRomm} </P>
                </Location>


                <P style={{ paddingLeft: "10px", paddingTop: "5px" }}>
                  Location : {accommodation.location} 
                </P>

                <P style={{ paddingLeft: "10px", paddingTop: "5px" }}>
                  Contact :{accommodation.mobile}
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
  border: 0.05px solid green;
  border-radius: 20px;
  margin: 0px 0px 40px 0px;
  display: flex;
  box-shadow: 0 6px 20px rgba(56, 125, 255, 0.17);
  -webkit-filter: drop-shadow(0 6px 20px rgba(56, 125, 255, 0.017));
  filter: drop-shadow(0 6px 20px rgba(56, 125, 255, 0.017));
  &:hover {
    cursor: pointer;
    background-color: rgb(235, 235, 235);
  }
`;
const Image = Styled.img`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 100%;
  height: 100%;
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
  margin-top: 20px;
  padding-left: 10px;
  font-weight: bold;
  display: flex;
`;
const LocationList = Styled.div`
  margin-Top:10px;
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
const Coulmn = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  border: 1px solid green;
  border-radius: 5px;
  height: 300px;
  margin: 40px 0px;
  box-shadow: 0 6px 20px rgba(56, 125, 255, 0.17);
  -webkit-filter: drop-shadow(0 6px 20px rgba(56, 125, 255, 0.017));
  filter: drop-shadow(0 6px 20px rgba(56, 125, 255, 0.017));
`;
const Row = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
`;
const SearchField = Styled.input`
  width: 90%;
  height: 40px;
  padding-left: 5px;
  border-radius: 5px;
`;
const Button = Styled.button`
  width: 8%;
  margin-left: 2%;
  height: 100%;
  background-color: ${(props) => props.color};
  color: ${(props) => props.fontColor || "white"};
  border: 2px solid ${(props) => props.color};
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    filter: brightness(85%);
    cursor: pointer;
  }
`;
