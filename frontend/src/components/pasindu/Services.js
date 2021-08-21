import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DestinationList from "./DestinationList";
export default function Services() {
  const [selectedTab, setselectedTab] = useState(0);
  console.log(selectedTab);
  return (
    <div>
      {selectedTab === 0 ? <h1>Destinations</h1> : null}
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
    </div>
  );
}
