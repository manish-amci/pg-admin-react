import { React, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import ButtonAppBar from './AppBar'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
// import { makeStyles } from '@material-ui/core/styles';

const Joi = require("joi");

const Schema = Joi.object({
  subjectName: Joi.string().required(),
  chapterNumber: Joi.number().required(),
  chapterName: Joi.string().required(),
  Topic: Joi.string().required(),
  subTopic: Joi.string().required(),
  fileBase:Joi.string().required()
});

var countryCodes = ['Maths','Physics','chem','bio','zoo']


// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//     }, roots: {
//         '& > *': {
//           margin: theme.spacing(1),
//           width: '25ch',
//         },
//       },
//   }));


var sb1, sb2, sb3, check = true,sb4,sb5,file;


export default function AddNotes() {

  var [data, setData] = useState({})

  // const classes = useStyles();

  function handleDataChange(event) {
    console.log("event.target value is ", event.target.id, event.target.value)
    const { error, value } = Schema.validate({ ...data, [event.target.id]: event.target.value, });
    console.log("value is", value)
    if (error) {
      console.log("error is", error)
      check = true
    } else {
      console.log("value is", value)
      check = false;
    }
    setData({ ...data, [event.target.id]: event.target.value })
    console.log("data state is", data)
    if (event.target.value == null) {
      console.log("yes")
    }
  }

 async function handleFileChange(event){
console.log("event target value is",event.target.value)
var file = event.target.files[0]
console.log("file is ",file)

var base64File = await convertBase64(file)
console.log("converted file b64 is",base64File)

var e = {
  target:{
    id:'fileBase',
    value:base64File
  }
}

handleDataChange(e)

  }

  function convertBase64(file) {
    return new Promise((res, rej) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = () => {
        res(filereader.result);
      };

      filereader.onerror = (errors) => {
        rej(errors);
      };
    });
  }


  return (
    <div>
      <ButtonAppBar />
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '90vh' }} >

          {/* <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              id="subjectName"
              label="Subject Name"
              value={sb1}
              onChange={handleDataChange}
            />
          </Grid> */}

          

          <Grid item xs={12} style={{ textAlign: "center"}}>
            <FormControl>
              <InputLabel id="subjectName">subject Name*</InputLabel>
              <Select
                labelId="subjectName"
                id="subjectName"
                //label="code"
                value={ sb1}
                onChange={(event) => {
                  event.target = { ...event.target, ...{ id: "subjectName" } };
                  handleDataChange(event);
                }}
              >
                {/* <MenuItem value={'+91'} selected >{"+91"}</MenuItem> */}
                {countryCodes.map((ele, i) => (
                  <MenuItem value={ele} key={i}>
                    {ele}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select subject name</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              id="chapterName"
              label="Chapter Name"
              value={sb2}
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              id="chapterNumber"
              label="Chapter Number"
              value={sb3}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              id="Topic"
              label="Topic"
              value={sb4}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              id="subTopic"
              label="Sub Topic"
              value={sb5}
              onChange={handleDataChange}
            />
          </Grid>
          <br/>
          <Grid item xs={12} style={{ textAlign: "center" }}>

          <FormControl>
              <input
              id='file'
              label="File"
              type="file"
              accept='audio*/'
              value={file}
              onChange={handleFileChange}
                    />

          </FormControl>
          </Grid>

          {/* <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
  />
</Button> */}
          <br />

          <Button variant='contained' color='primary' disabled={check}>Submit</Button>
        </Typography>
      </Container>
    </div>
  );
}