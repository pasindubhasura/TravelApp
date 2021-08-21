import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import axios from "axios";
export default function GuideList() {
  let [guides, setguides] = useState([]);
  let [searchInput, setsearchInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5001/guides");
    if (response.data.success) {
      setguides(response.data.existingGuide);
    }
  };

  if (searchInput.length > 0) {
    guides = guides.filter((i) => {
      return i.name.toLowerCase().match(searchInput.toLowerCase());
    });
  }
  return (
    <Div>
      <Coulmn>
        <Row
          style={{
            justifyContent: "flex-start",
            marginLeft: "9%",
          }}
        >
          <h5 style={{ fontWeight: "bold" }}>Guides:</h5>
        </Row>
        <Row>
          <SearchField
            onChange={(e) => setsearchInput(e.target.value)}
            placeholder="Search Guides here..."
          />
        </Row>
      </Coulmn>
      {guides.map((item, index) => {
        return (
          <Column key={index}>
            <Card>
              <ImageContainer>
                <Image src={item.imgLink} />
              </ImageContainer>

              <LocationList>
                <Title>{item.name}</Title>

                <Location>
                  <P>{item.address} |</P>
                  <P>{item.email} |</P>
                  <P>{item.phoneNo} </P>
                </Location>
                <P style={{ paddingLeft: "10px", paddingTop: "5px" }}>
                  {item.language}
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
  width: 100%;
  height: 100%;
  padding: 8px;
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
  box-shadow: 5px 6px 10px #888888;
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
