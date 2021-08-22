import React, { useState } from "react";
import Styled from "styled-components";
import axios from "axios";
import styled from "styled-components";
import defaultImage from "../../images/defaultImage.jpg";
import { vehicleLocation, vehicleType, colors } from "./vehicle-data";
import spinner from "../../images/spinner.gif";

export default function AddVehicle() {
  const [img, setImg] = useState(defaultImage);
  const [imgError, setimgError] = useState("");

  const [isLoading, setisLoading] = useState(false);

  const [vehicleType, setvehicleType] = useState("none");
  const [vehicleTypeError, setvehicleTypeError] = useState("");

  const [vehicleLocation, setvehicleLocation] = useState("none");
  const [vehicleLocationError, setvehicleLocationError] = useState("");

  const [vehiclePricePerkm, setvehiclePricePerkm] = useState("");
  const [vehiclePricePerkmError, setvehiclePricePerkmError] = useState("");

  const [vehiclePhone, setvehiclePhone] = useState("");
  const [vehiclePhoneError, setvehiclePhoneError] = useState("");

  const [vehicleAvailability, setvehicleAvailability] = useState("");
  const [vehicleAvailabilityError, setvehicleAvailabilityError] = useState("");

  const [errors, seterrors] = useState([]);

  const clear = () => {
    setvehiclePhone("");
    setvehicleType("none");
    setvehicleLocation("none");
    setvehiclePricePerkm("");
    setvehicleAvailability("");
    setImg(defaultImage);
  };
  const formHandler = async (e) => {
    seterrors([]);
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5001/travelVehicle/add",
      {
        vehicleType,
        vehicleLocation,
        vehiclePricePerkm,
        vehiclePhone,
        vehicleAvailability,
        image: img,
      }
    );
    if (vehicleType === "none")
      seterrors((oldArr) => [
        ...oldArr,
        { msg: "Vehicle Type should be selected" },
      ]);

    if (vehicleLocation === "none")
      seterrors((oldArr) => [
        ...oldArr,
        { msg: "vehicleLocation should be selected" },
      ]);
    if (response.data.success) window.location = "/travelVehicle";
    if (response.data.error) {
      response.data.error.map((item) => {
        seterrors((oldArr) => [...oldArr, { msg: item.msg }]);
      });
    }
  };

  // const validation = () => {
  //   setvehiclePricePerkmError("");
  //   setvehiclePhoneError("");
  //   setvehicleTypeError("");
  //   setvehicleLocationError("");
  //   setvehicleAvailabilityError("");
  //   setimgError("");

  //   if (vehiclePricePerkm === "") {
  //     setvehiclePricePerkmError("vehiclePricePerkm can't be empty!");
  //   }
  //   if (vehiclePhone === "") {
  //     setvehiclePhoneError("vehiclePhone can't be empty!");
  //   }
  //   if (vehicleType === "none") {
  //     setvehicleTypeError("vehicleType has to be selected!");
  //   }
  //   if (vehicleLocation === "none") {
  //     setvehicleLocationError("vehicleLocation has to be selected!");
  //   }
  //   if (vehicleAvailability === "") {
  //     setvehicleAvailabilityError("vehicleAvailability can't be empty!");
  //   }
  //   if (img === defaultImage) {
  //     setimgError("Add an Image");
  //   } else if (
  //     vehiclePricePerkmError === "" &&
  //     vehiclePhoneError === "" &&
  //     vehicleTypeError === "" &&
  //     vehicleLocationError === "" &&
  //     vehicleAvailabilityError === "" &&
  //     imgError === ""
  //   ) {
  //     return true;
  //   }
  // };
  const imageHandler = (evt) => {
    setisLoading(true);
    var f = evt.target.files[0]; // FileList object
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return async function (e) {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
        //showing file converted to base64
        const res = await axios.post(
          "http://localhost:5001/travelVehicle/upload",
          {
            path: base64String,
          }
        );
        setisLoading(false);
        setImg(res.data.imgUrl);
      };
    })(f);
    // // Read in the image file as a data URL.
    reader.readAsBinaryString(f);
  };

  const uploadButtonClickHandler = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <MainDiv>
      <H2>Add Vehicle Details</H2>
      {errors.length > 0
        ? errors.map((i, index) => {
            return <Span key={index}>{errors[index].msg}</Span>;
          })
        : null}
      <FormGrid onSubmit={formHandler}>
        <Column>
          {vehiclePricePerkmError.length > 0 ? (
            <Span>{vehiclePricePerkmError}</Span>
          ) : (
            <Span style={{ visibility: "hidden" }}></Span>
          )}
          <TextInput
            placeholder="Price Per km"
            type="text"
            value={vehiclePricePerkm}
            onChange={(e) => setvehiclePricePerkm(e.target.value)}
          />

          {vehiclePhoneError.length > 0 ? (
            <Span>{vehiclePhoneError}</Span>
          ) : (
            <Span style={{ visibility: "hidden" }}></Span>
          )}
          <TextInput
            placeholder="Phone"
            type="text"
            onChange={(e) => setvehiclePhone(e.target.value)}
            value={vehiclePhone}
          />

          {vehicleTypeError.length > 0 ? (
            <Span>{vehicleTypeError}</Span>
          ) : (
            <Span style={{ visibility: "hidden" }}></Span>
          )}
          <Dropdown
            onChange={(e) => setvehicleType(e.target.value)}
            value={vehicleType}
          >
            <option value="none" disabled hidden>
              Vehicle Type
            </option>
            {vehicleType.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </Dropdown>

          {vehicleLocationError.length > 0 ? (
            <Span>{vehicleLocationError}</Span>
          ) : (
            <Span style={{ visibility: "hidden" }}></Span>
          )}
          <Dropdown
            onChange={(e) => setvehicleLocation(e.target.value)}
            value={vehicleLocation}
          >
            <option value="none" disabled hidden>
              Location
            </option>
            {vehicleLocation.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </Dropdown>

          {vehicleAvailabilityError.length > 0 ? (
            <Span>{vehicleAvailabilityError}</Span>
          ) : (
            <Span style={{ visibility: "hidden" }}></Span>
          )}
          <TextInput
            placeholder="Availability"
            onChange={(e) => setvehicleAvailability(e.target.value)}
            value={vehicleAvailability}
          />

          <Button
            color={colors.darkerGreen}
            style={{ marginRight: "2%" }}
            onClick={clear}
            type="button"
          >
            Clear
          </Button>
          <ButtonSecondary color={colors.darkerGreen} type="submit">
            Add Vehicle
          </ButtonSecondary>
        </Column>

        <Column>
          <Center>
            <ImageContainner>
              {isLoading ? <Spinner src={spinner} /> : <Image src={img} />}
            </ImageContainner>
            {imgError.length > 0 ? (
              <Span style={{ marginLeft: "15px", width: "90%" }}>
                {imgError}
              </Span>
            ) : (
              <Span style={{ visibility: "hidden" }}></Span>
            )}
            <FileInput type="file" onChange={imageHandler} id="fileInput" />
            <UploadButton
              color={colors.darkerGreen}
              type="button"
              onClick={uploadButtonClickHandler}
            >
              <I className="fas fa-images"></I>Upload Image
            </UploadButton>
          </Center>
        </Column>
      </FormGrid>
    </MainDiv>
  );
}

const MainDiv = Styled.div`
margin:40px auto;
background-color:white;
width:80%;
display:flex;
flex-direction: column;
min-height:auto;
box-shadow: 5px 6px 10px #888888;
padding: 20px;
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
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid;
`;

const Span = styled.p`
  width: 100%;
  margin: 15px 0px 0px 20px;
  color: red;
  font-weight: bold;
  font-size: 14px;
`;

const TextInputBox = styled.textarea`
  width: 100%;
  padding: 5px;
  resize: none;
  margin-bottom: 20px;
  border-radius: 5px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Spinner = styled.img`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
`;
const ImageContainner = styled.div`
  width: 90%;
  height: 300px;
  margin-top: 15px;
  margin-bottom: 0px;
  //border: 1px solid ${colors.darkerGreen};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 6px 10px #888888;
`;
const Center = Styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;

const FileInput = styled.input`
  opacity: 0;
  margin: 0px;
  padding: 0px;
`;
const UploadButton = styled.button`
  border: 1px solid ${(props) => props.color};
  display: inline-block;
  border-radius: 5px;
  font-weight: bold;
  padding: 8px 14px;
  width: 90%;
  background-color: ${(props) => props.color};
  margin: 0px;
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
const I = styled.i`
  margin: 0px 7px;
`;
