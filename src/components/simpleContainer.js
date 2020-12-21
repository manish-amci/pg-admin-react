import { React, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ButtonAppBar from "./AppBar";
import QRCode from "qrcode.react";
import moment from "moment";

const axios = require("axios");
const Joi = require("joi");
const Schema = Joi.object({
  userName:Joi.string()
  .pattern(/^[A-Za-z]+$/)
  .required(),
  firstName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .required(),
  middleName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .allow(null),
  lastName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .allow(null),
  birthday: Joi.date().allow(null),
  gender: Joi.string().allow(null),
  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  primaryEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  country: Joi.string().allow(null),
  stateProvince: Joi.string().allow(null),
  city: Joi.string().allow(null),
  postalCode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .allow(""),
});
var postURL =
  "https://bgtnp5wnta.execute-api.ap-south-1.amazonaws.com/dev/qrCode";
// var afterPost = false;
var userName,
firstName,
  middleName,
  lastName,
  birthday,
  gender,
  mobile,
  check = true,
  primaryEmail,
  country,
  stateProvince,
  city,
  postalCode;
export default function SimpleContainer() {
  var [data, setData] = useState({});
  var [afterPost, setAfterPost] = useState(false);
  console.log("afterpost is", afterPost);
  const [qrValue, setQrValue] = useState("Manish Madhavan");
  const Qrcode = () => (
    <Grid style={{ paddingTop: "5%" }}>
      <QRCode
        id="qr-gen"
        value={qrValue}
        size={200}
        level={"L"}
        includeMargin={true}
      />
    </Grid>
  );
  function handleDataChange(event) {
    console.log("event.target value is ", event.target.id, event.target.value);
    const { error, value } = Schema.validate({
      ...data,
      [event.target.id]: event.target.value,
    });
    console.log("value is", value);
    if (error) {
      console.log("error is", error);
      check = true;
    } else {
      console.log("value is", value);
      console.log("type ofvalue is", typeof value);
      check = false;
      // setQrValue(myJSON);
    }
    setData(value);
    console.log("data state is", data);
    if (event.target.value == null) {
      console.log("yes");
    }
  }

  function getRandomName(){
    let name=''
    let chars=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
    for(let i=0;i<8;i++){
      name+=chars[Math.floor(Math.random()*52)]
    }
    return name;
  }

  function getRandomMobile(){
    let mobile='';
    for(let i=0;i<10;i++){
      mobile+=Math.floor(Math.random()*10);
    }
    return  mobile;
  }
  function getRandomZip(){
    let zip='';
    for(let i=0;i<6;i++){
      zip+=Math.floor(Math.random()*10);
    }
    return  zip;
  }

  function onAutoFill() {
    userName=getRandomName();
    firstName=getRandomName();
    middleName=getRandomName();
    lastName=getRandomName();
    birthday='1/1/2020';
    gender=Math.random()>.5?'male':'female';
    mobile=getRandomMobile();
    primaryEmail=userName+'@gmail.com';
    country='India';
    stateProvince='Karnataka';
    city='Bengaluru';
    postalCode=getRandomZip();
    check=false;
    setData({...data,userName,firstName,middleName,lastName,birthday,gender,mobile,primaryEmail,country,stateProvince,city,postalCode});
  }

  async function onSubmitClick() {
    console.log("from the on submit function", afterPost);
    var payload = await {
      phone_number:data.mobile?'+91'+data.mobile:"",
      "custom:college_id": "507f1f77bcf86cd799439011",
      "custom:user_type": "user",
      email: data.primaryEmail,
      generated_by: "50721f77bcf86cd799439011",
      generated_by_name: "shyamsagar",
      user_data: {
        username:data.userName,
        firstName: data.firstName,
        middleName: data.middleName || "",
        lastName: data.lastName || "",
        fullName:
          data.firstName +
            " " +
            (data.middleName || "") +
            " " +
            data.lastName || "",
        birthdate: moment(data.birthdate).format("L"),
        gender: data.gender || "",
        mobile: "+91" + data.mobile,
        userThumbnailPath: "https://www.amci.net.in/logo",
        primaryEmail: data.primaryEmail,
        secondaryEmails: [],
        country: data.country || "",
        stateProvince: data.stateProvince || "",
        city: data.city || "",
      },
    };
    axios
      .post(postURL, payload)
      .then((res) => {
        console.log("response is ", res);
        var myJSON = JSON.stringify(res.data);
        setQrValue(myJSON);
        setAfterPost(true);
      })
      .catch((err) => {
        console.log("error is", err);
        console.log("error res is", err.response);
      });
    console.log("payload is ", payload);
  }
  return (
    <div>
      <ButtonAppBar />
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{ backgroundColor: "#CFE8FC", height: "90vh" }}
        >
          <Grid item xs={12} style={{ textAlign: "center" }}>
            User Name:
            <TextField
            style={{marginLeft:20}}
              required
              id="userName"
              // label="User Name"
              value={userName}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
          First Name:
            <TextField
            style={{marginLeft:20}}
              required
              id="firstName"
              // label="First Name"
              value={firstName}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
          Middle Name:
            <TextField
            style={{marginLeft:20}}
              id="middleName"
              // label="Middle Name"
              value={middleName}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
          Last Name:
            <TextField
            style={{marginLeft:20}}
              id="lastName"
              // label="Last Name"
              value={lastName}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
          Birthday:
            <TextField
            style={{marginLeft:20}}
              id="birthday"
              // label="Birthday"
              value={birthday}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
          Gender:
            <TextField
            style={{marginLeft:20}}
              id="gender"
              // label="Gender"
              value={gender}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
          Mobile:
            <TextField
            style={{marginLeft:20}}
              required
              id="mobile"
              // label="Mobile"
              value={mobile}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
          Primary Email:
            <TextField
            style={{marginLeft:20}}
              required
              id="primaryEmail"
              // label="Primary Email"
              value={primaryEmail}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            Country:
            <TextField
            style={{marginLeft:20}}
              id="country"
              // label="country"
              value={country}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
          State:
            <TextField
            style={{marginLeft:20}}
              id="stateProvince"
              // label="State"
              value={stateProvince}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
          City:
            <TextField
            style={{marginLeft:20}}
              id="city"
              // label="City"
              value={city}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
          Zip:
            <TextField
            style={{marginLeft:20}}
              id="postalCode"
              // label="Zip"
              value={postalCode}
              onChange={handleDataChange}
            />
          </Grid>
          <br />
          <Button
          style={{marginRight:30}}
            variant="contained"
            color="primary"
            onClick={onAutoFill}
          >
            Auto fill
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={check}
            onClick={onSubmitClick}
          >
            Submit
          </Button>
          {afterPost ? <Qrcode /> : ""}
          <br />
          {/* </Grid> */}
        </Typography>
      </Container>
    </div>
  );
}