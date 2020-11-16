import { React, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import ButtonAppBar from './AppBar'
import Avatar from "@material-ui/core/Avatar";
import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";


import { makeStyles } from '@material-ui/core/styles';

const Joi = require("joi");

const Schema = Joi.object({
  subjectName: Joi.string().required(),
  description: Joi.string().required(),
  displayPriority: Joi.number().allow(''),
  imgBase: Joi.string()


});


const useStyles = makeStyles((theme) => ({

  rootPicture: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }, roots: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
  }));


var sb1, description, priority, check = true,imagesHere;
// var priorityCodes = ['1','2','3','4','5']


export default function SimpleContainer() {

  var [data, setData] = useState({})
  var [image,setImage]=useState( require('./../assets/blank-avatar-photo.jpg'));


  var imgFile;
  const picFunction = async (e) => {
    imgFile = e.target.files[0];
    var tempImgURL = URL.createObjectURL(imgFile);
    setImage(tempImgURL);
    var b64 = await convertBase64(imgFile);
    console.log(b64);

    var eve = {
      target: {
        id: "imgBase",
        value: b64 || " ",
      },
    };
    handleDataChange(eve);
  };


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






  const classes = useStyles();

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
    setData(value)
    console.log("data state is", data)
    if (event.target.value == null) {
      console.log("yes")
    }
  }


  return (
    <div>
      <ButtonAppBar />
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '90vh' }} >



        <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button size="large">
              <label htmlFor="file" id="uploadBtn">
                <div className={classes.rootPicture}>
                  <Avatar alt="Profile Picture" src={image} />
                </div>
                <FormHelperText>Subject Img</FormHelperText>

              </label>
            </Button>
            <input
              type="file"
              id="file"
              value={imagesHere||""}
              onChange={(e) => {
                picFunction(e);
              }}
              style={{ display: "none" }}
            />
          </Grid>




          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              id="subjectName"
              label="Subject Name"
              value={sb1}
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              id="description"
              label="Description"
              value={description}
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              id="displayPriority"
              label="Priority"
              value={priority}
              onChange={handleDataChange}
            />
          </Grid>

          {/* <Grid item xs={12} style={{ textAlign: "center" }}>
          <FormControl> 
          <InputLabel id="countryCode">Priority</InputLabel>

            <Select
              id="displayPriority"
              label="Priority"
              value={priority}
              onChange={handleDataChange}
              
            >
              {countryCodes.map((ele) => (
                <MenuItem value={ele} key={ele}>
                  {ele}
                </MenuItem>
              ))}

            </Select>
            <FormHelperText>Select your Subject Priority here</FormHelperText>

            </FormControl>
          </Grid> */}

          
          <br />

          <Button variant='contained' color='primary' disabled={check}>Submit</Button>
        </Typography>
      </Container>
    </div>
  );
}