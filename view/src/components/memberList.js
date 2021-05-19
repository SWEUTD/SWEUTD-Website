import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  Box,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";

import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
} from "@material-ui/core";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

/*const styles = {
  scrollable: {
    width: "100%",
    height: "100px",
    margin: "0",
    padding: "0",
    overflow: "scroll",
  },
  tr: {
    height: "10px !important",
  },
  "tr td": {
     height: "auto !important",
  }
}*/

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  //const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
                <TableRow>
                <TableCell>
                  <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell
                  component="tr"
                  width="25%"
                  scope="row"
                  align="left"
                >
                  <b>{props.data.firstName} {props.data.lastName}</b>
                  </TableCell>
                  
                  <TableCell
                  component="tr"
                  width="15%"
                  scope="row"
                  align="left"
                >
                  {props.data.points} pt
                </TableCell>

                <TableCell
                  component="tr"
                  width="20%"
                  scope="row"
                  align="left"
                >
                  {props.data.email}
                </TableCell>

                

                <TableCell /*component="tr" scope="row" align="left"*/ width="40%" /*style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}*/>
          <Collapse in={open} timeout="auto" unmountOnExit>
                { props.data.events == null ?
                  (null) : ( 
                    props.data.events.map((event) => (
                      <p>{event.eventName}</p>
                  )))}
          </Collapse>
        </TableCell>

              </TableRow>
              </React.Fragment>
  )
}

const CountryList = ({countryList=[]}) => {
  const [open, setOpen] = React.useState([]);
  //const classes = useRowStyles();
  return (
    <>
    <TableContainer component={Paper} align="center">
          <Table aria-label="collapsible table">
            <TableBody>
    { countryList.map((data,index) => {
             if (data) {
               //data.open = false;
              return (
                //<div>
                <Row data={data} />
                	
             )	
           }
           return null
        }) }
        
        </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}

export default CountryList