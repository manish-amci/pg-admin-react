import { React, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import ButtonAppBar from './AppBar'
// import { makeStyles } from '@material-ui/core/styles';

const Joi = require("joi");

const Schema = Joi.object({
  subjectName: Joi.string().required(),
  displayPriority: Joi.number().required(),
  description: Joi.string().required()

});


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


var sb1, sb2, sb3, check = true;


export default function SimpleContainer() {

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


  return (
    <div>
      <ButtonAppBar />
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '90vh' }} >

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
              value={sb2}
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              id="displayPriority"
              label="Priority"
              value={sb3}
              onChange={handleDataChange}
            />
          </Grid>
          <br />

          <Button variant='contained' color='primary' disabled={check}>Submit</Button>
        </Typography>
      </Container>
    </div>
  );
}