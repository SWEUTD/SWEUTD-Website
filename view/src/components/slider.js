import React from "react";
import { Grid } from "@material-ui/core";
import PostCard from "./PostCard";
import axios from "axios";

// wrapper for items
class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemRows: [], avatar: "", profileLink: "" };
  }
  mediumURL =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sweutd";

    // , "Access-Control-Allow-Headers":"*"
    // "Access-Control-Allow-Origin": "*" , 
    //, { headers: {"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"}, }
  async componentDidMount() {
    await axios
      .get(this.mediumURL)
      .then(async (res) => await res.data)
      .then((data) => {
        // create two-dimensional array with 3 elements per inner array
        const avatar = data.feed.image;
        const profileLink = data.feed.link;
        const res = data.items; //This is an array with the content. No feed, no info about author etc..
        this.setState({ avatar: avatar, profileLink: profileLink });
        const itemRows = [];
        res.forEach((item, i) => {
          item["avatar"] = this.state.avatar; // push avatar inside the json
          item["profilelink"] = this.state.profileLink; // push profile link inside the JSON
          const row = Math.floor(i / 3);
          if (!itemRows[row]) itemRows[row] = [];
          itemRows[row].push(item);
        });

        this.setState({ itemRows: itemRows });
      });
  }
  render() {
    const { itemRows } = this.state;
    const containerStyle = {
      backgroundColor: "#5A5377",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const headerStyle = {
      backgroundColor: "#5A5377",
      color: "#f5f5f5",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '15px',
    };

    return (
      <div>
        <div style={headerStyle}>
          <h1>SWE UTD Articles</h1> <br/>
        </div>
      <Grid container spacing={1} style={containerStyle} >
        {itemRows.map((row, id) =>
          row.map((item, key) => <PostCard {...item} key={key} />)
        )}
      </Grid>
      </div>
    );
  }
}
export default Slider;