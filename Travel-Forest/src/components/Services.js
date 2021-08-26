import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import DestinationList from "./DestinationList";
import GuideList from "./GuidesList";
import AccommodationList from "./AccommodationList";
import VehicleList from "./VehicleList";
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
        <H3 style={{ fontWeight: "bold" }}>Accommodations</H3>
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
          <Tab>Accommodations</Tab>
        </TabList>

        <TabPanel>
          <DestinationList />
        </TabPanel>
        <TabPanel>
          <GuideList />
        </TabPanel>
        <TabPanel>
          <VehicleList />
        </TabPanel>
        <TabPanel>
          <AccommodationList />
        </TabPanel>
      </Tabs>
    </Div>
  );
}
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
