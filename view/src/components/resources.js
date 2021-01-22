import React, { Component } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import {
  Card,
  CardContent,
  Button,
  ButtonGroup,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import DocIcon from "../assets/document-icon.png";
import LinkIcon from "../assets/link.png";
import CameraIcon from "../assets/camera.png";
import SlideshowIcon from "../assets/slideshow.png";

const resources = [
    {
      title: "Tamara's Interview Survival Guide",
      type: "document",
      link: "https://docs.google.com/document/d/1hLltgCr-xsETgWqO6vRjWkhLxcUd0efknbfT0_dSMko/edit?usp=sharing"
    },
    {
      title: "Link Title",
      type: "link",
      link: "#"
    },
    {
      title: "Image / Video Title",
      type: "media",
      link: "#"
    },
    {
      title: "Slideshow Title",
      type: "slideshow",
      link: "#"
    }
];

  const styles = (theme) => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    details: {
      display: "flex",
    },
    locationText: {
      paddingLeft: "15px",
    },
    gridItem: {
      display: "flex",
      width: "100%",
    },
    card: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      width: "100%",
    },
    buttonProperty: {
      position: "absolute",
      top: "50%",
    },
    progess: {
      position: "absolute",
    },
    submitButton: {
      marginTop: "10px",
    },
    body: {
      display: "flex",
      flexWrap: "wrap",
    },
    linkBtns: {
      borderRadius: "10px",
      flexDirection: "row",
      margin: "20px",
      maxWidth: "25%"
    },
    iconImg: {
      width: "100px",
      padding: "10px",
    },
  });

class event extends Component {
    
    render() {
        const { classes } = this.props;
        return (
            <div>
            <Card
                className={classes.details}
                className="movingItem"
                variant="outlined"
            >
                    <CardContent align="center">
                    <div>
                        <br />
                        <h3>General Resources</h3>
                        <h5>
                            Here you will find links to various resources with general information that may be useful when applying to internships! 
                            <b> If you would like to add to these resources, please fill out <a href="https://forms.gle/XYhwKi2UZahKaugR7">this form</a>.</b>
                        </h5>
                        <br />
                        <div className={classes.body}>
                            {resources.map((resource) => (
                            <Button
                                variant={"outlined"}
                                className={classes.linkBtns}
                                onClick={() => {
                                    const url = "https://docs.google.com/document/d/1hLltgCr-xsETgWqO6vRjWkhLxcUd0efknbfT0_dSMko/edit?usp=sharing";
                                    window.open(url, "_blank");
                                }}
                            >
                                <img src={
                                (() => {
                                    switch (resource.type) {
                                    case "document": return DocIcon;
                                    case "link": return LinkIcon;
                                    case "media": return CameraIcon;
                                    case "slideshow": return SlideshowIcon;
                                    }
                                })()
                                } className={classes.iconImg}/>
                                <p>{resource.title}</p>
                            </Button>
                            ))}     
                        </div>
                        </div>
                    </CardContent>
            </Card>                
            </div>

        );

    }
}

export default withStyles(styles)(event);