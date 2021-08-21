import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import DestinationList from "./DestinationList";
import { colors } from "./data";
export default function Services() {
  const [selectedTab, setselectedTab] = useState(0);

  return (
    <Div>
      {selectedTab === 0 ? (
        <H3 style={{ fontWeight: "bold" }}>Destinations</H3>
      ) : null}
      {selectedTab === 1 ? (
        <H3 style={{ fontWeight: "bold" }}>Guides</H3>
      ) : null}
      {selectedTab === 2 ? (
        <H3 style={{ fontWeight: "bold" }}>Vehicles</H3>
      ) : null}
      {selectedTab === 3 ? (
        <H3 style={{ fontWeight: "bold" }}>Accomodations</H3>
      ) : null}
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
          <DestinationList />
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 4</h2>
        </TabPanel>
      </Tabs>
    </Div>
  );
}

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
const H3 = styled.h3`
  color: ${colors.darkerGreen};
  font-weight: "bold";
  display: "flex";
  justify-content: "flex-start";
  margin: 40px 0px;
`;
