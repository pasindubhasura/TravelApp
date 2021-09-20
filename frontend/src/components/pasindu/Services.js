//import statements 
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import DestinationList from "./DestinationList";
import VehicleList from "../vehicle-lakshika/VehicleList";
import { colors } from "./data";

export default function Services() {

  //states and variables
  const [selectedTab, setselectedTab] = useState(0);
  
  return (
    <Div>
      {selectedTab === 0 ? (
        <h1 style={{ color: colors.darkerGreen }}>Destinations</h1>
      ) : null}
      {selectedTab === 1 ? <h1>Guides</h1> : null}
      {selectedTab === 2 ? <h1>Vehicles</h1> : null}
      {selectedTab === 3 ? <h1>Accomodations</h1> : null}
      <Tabs
        onSelect={(index) => {
          setselectedTab(index);
        }}
      >
        <TabList>
          <Tab>Destinations</Tab>
          <Tab>Guides</Tab>
          <Tab>Vehicles</Tab>
          <Tab>Accomodations</Tab>
        </TabList>

        <TabPanel>
          <Search />
          <DestinationList />
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <VehicleList />
        </TabPanel>
        <TabPanel>
          <h2>Any content 4</h2>
        </TabPanel>
      </Tabs>
    </Div>
  );
}

//search function
function Search() {
  const [searchInput, setsearchInput] = useState("");
  const searchHandler = () => {
    console.log(searchInput);
  };

  return (
    <Coulmn>
      <Row>
        <h5 style={{ fontWeight: "bold" }}>Destination:</h5>
      </Row>
      <Row>
        <SearchField
          onChange={(e) => setsearchInput(e.target.value)}
          placeholder="Search destinations here..."
        />
        <Button
          color={colors.darkerGreen}
          type="button"
          onClick={searchHandler}
        >
          Search
        </Button>
      </Row>
    </Coulmn>
  );
}

//styles
const Coulmn = styled.div`
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
const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
`;
const SearchField = styled.input`
  width: 90%;
  height: 40px;
  padding-left: 5px;
  border-radius: 5px;
`;
const Button = styled.button`
  width: 8%;
  margin-left: 2%;
  height: 100%;
  background-color: ${(props) => props.color};
  color: ${(props) => props.fontColor || "white"};
  border: 2px solid ${(props) => props.color};
  border-radius: 5px;
  font-weight: bold;
  //padding: 8px 14px;
  &:hover {
    filter: brightness(85%);
    cursor: pointer;
  }
`;
const Div = styled.div`
  width: 90%;
  margin: 0 auto;
`;
