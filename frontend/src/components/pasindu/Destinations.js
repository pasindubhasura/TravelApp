//import statements 
import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import axios from "axios";
import { colors } from "./data";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Logo from "../../images/Logo.png";

export default function Destinations(props) {
  //states and variables
  let [destinations, setdestinations] = useState([]);
  let [search, setsearch] = useState("");

  //trigger function when page renders
  useEffect(() => {
    fetchData();
  }, []);

  //fetching data from API
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5001/destinations");
    if (!response.data.error) setdestinations(response.data.destinations);
  };

  //redirect to add destination form
  const addDestinationForm = () => {
    window.location = "/destinations/add";
  };

  //delete function
  const deleteItem = async (id) => {

    let response;
    let action = window.confirm("Are you sure?");//confirm alert

    if(action == true){
      response = await axios.post(
        "http://localhost:5001/destinations/delete",
        {
          id,
        }
      );
    }
    else{
      return;
    }

    if (response.data.success) window.location = "/destinations";
    if (response.data.error) alert(response.data.error);
  };

  //redirect edit form
  const editDestinationForm = (id) => {
    props.history.push("destinations/edit", { id });
  };

  //search function
  if (search.length > 0) {
    destinations = destinations.filter((i) => {
      return i.destination.toLowerCase().match(search.toLowerCase());
    });
  }

  //report generation function
  const pdf = () => {

    let bodyData = [];
    let length = destinations.length;
    let x = 1;

    for (let i = 0; i < length; i++) {
      bodyData.push([
        x++,
        destinations[i].destination,
        destinations[i].city,
        destinations[i].district,
        destinations[i].province,
        destinations[i].description,
      ]);
    } //save json data to bodydata in order to print in the pdf table

    const doc = new jsPDF({ orientation: "portrait" });
    var time = new Date().toLocaleString();
    doc.setFontSize(27);
    doc.text(`Destination Details Report`, 105, 35, null, null, "center");
    doc.setFontSize(10);
    doc.text(`(Generated on ${time})`, 105, 39, null, null, "center");
    doc.setFontSize(14);
    // doc.text("Thilina Hardware", 105, 20, null, null, "center");
    // doc.text("No 55, Main Road, Horana", 105, 25, null, null, "center");
    doc.addImage(Logo, "JPEG", 90, 0, 25, 25);
    doc.autoTable({
      theme: "grid",
      styles: { halign: "center" },
      headStyles: { fillColor: colors.darkerGreen },
      startY: 44,
      head: [
        ["No", "Destiation", "City", "District", "Province", "Description"],
      ],
      body: bodyData,
    });
    doc.save("DestinationsReport.pdf");
  }; //report generation function

  return (
    <MainDiv>
      <H2>Destinations</H2>
      <Row>
        <ButtonSection>
          <Button
            color={colors.darkerGreen}
            style={{ margin: "0px 7px 0px 20px" }}
            onClick={addDestinationForm}
          >
            <i className="fas fa-user-plus"></i> Add Destination
          </Button>
          <ButtonSecondary color={colors.darkerGreen} onClick={pdf}>
            <i class="fas fa-save"></i> Download
          </ButtonSecondary>
        </ButtonSection>
        <SearchBar>
          <SearchBarInput
            placeholder={`Search here...`}
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </SearchBar>
      </Row>
      <TableContainer>
        <Table
          bgcolor={colors.darkerGreen}
          className="table table-striped borde"
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Destination</th>
              <th scope="col">City</th>
              <th scope="col">District</th>
              <th scope="col">Province</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{++index}</td>
                  <td>{item.destination}</td>
                  <td>{item.city}</td>
                  <td>{item.district}</td>
                  <td>{item.province}</td>
                  <td>{item.description}</td>
                  <td>
                    <Center>
                      <ButtonSecondary
                        color={"blue"}
                        style={{ margin: "5px 7px 5px 15px" }}
                        onClick={() => {
                          editDestinationForm(item._id);
                        }}
                      >
                        <i className="fas fa-edit"></i>Edit
                      </ButtonSecondary>
                      <ButtonSecondary
                        color={"red"}
                        style={{ margin: "5px 15px 5px 0px" }}
                        type="button"
                        onClick={() => deleteItem(item._id)}
                      >
                        <i className="far fa-trash-alt"></i> Delete
                      </ButtonSecondary>
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

//styles
const MainDiv = Styled.div`
margin:30px auto;
background-color:white;
width:90%;
display:flex;
flex-direction: column;
min-height:100vh;
box-shadow: 5px 6px 10px #888888;
padding: 20px;
`;
const H2 = Styled.h2`
margin:20px 0px 10px 20px;

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
border-radius:12px; 
border:1px solid black;
padding-left:8px;
`;
const TableContainer = Styled.div`
margin:10px 20px;
`;
const Table = Styled.table`
border-radius:;
/* th,td{
  border: 1px solid black;
  padding:5px;
} */

th{
  padding: 12px;
}
tr td:last-child {
    width: 1%;
    white-space: nowrap;
}
thead{
  background-color:${(props) => props.bgcolor};
  color:white;
  max-width:
}
font-weight:bold;
width: 100%;
`;
const Button = Styled.button`
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

const ButtonSecondary = Styled.button`
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

const Center = Styled.div`
display:flex;
justify-content:center;
`;
