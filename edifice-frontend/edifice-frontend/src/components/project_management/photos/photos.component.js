import React, { Component } from "react";
import { Link } from "react-router-dom";
import AlbumDataService from "./../../../services/album.service";
import { WebcamCapture } from './webcam.component';
import { CameraViewer } from "./viewphoto.component";
import Accordion from 'react-bootstrap/Accordion';
import Typography from '@material-ui/core/Typography';
import Icon1 from "././../../../assets/PM/photos/image1.jpg";
import Icon2 from "././../../../assets/PM/photos/image2.jpg";

import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

export default class PhotosHome extends Component {
  
    constructor(props) {
      super(props);
      this.retrieveAlbums = this.retriveAlbums.bind(this);
      this.state = {
        albums: [],
        currentIndex: -1,
        content: "",
        id: this.props.match.params.id
      };
    }
    componentDidMount() {
      this.retriveAlbums(this.props.match.params.id);
    }
  
    retriveAlbums(id){
        AlbumDataService.getAll(id)
        .then(response => {
            this.setState({
              albums: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    render() {
      const { albums, currentIndex,id } = this.state;
      return (
        <div>
          <h2>Photos</h2>
          <p>Here you can manage your photos and captures photos onsite</p>
          <hr></hr>
          {/* Album division starts */}
          <div className="container">
            <h3>Albums</h3>
            <Link className="btn btn-primary mr-2" to={"/addalbum/"+id}>
              Add Album
            </Link>
            <hr></hr>
            <h4>Recent Albums</h4>
            <div className="container row">
            {albums &&
                albums.map((album, index) => (
                <div
                    className={
                    "container col-3" +
                    (index === currentIndex ? "active" : "")
                    }
                    key={index}
                >
                {/* unit data */}
                <Link to={"/viewdrawingcategory/"+id}>
                  <Card
                    bg={'secondary'}
                    text={'dark'}
                    style={{ width: '15rem' }}
                    className="mb-2"
                  >
                    <Card.Body>
                       <Card.Title><h4>{album.title}</h4></Card.Title>
                      <Card.Text>
                            description
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
                </div>
            ))}
            </div>
            <hr></hr>
          </div>
        {/* Album div ends */}
        {/* Photo div starts */}
        <div className="container">
          <h3>Photos</h3>
            <a href="/addphoto" className="btn btn-primary">Add Photo</a>
            <hr></hr>
          </div> 
          <div className="container">
            <h4>Recent Photos</h4>
            <div className="row">
              <div className="col-sm-6">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={Icon1} />
                <Card.Body>
                  <Card.Title>Image 1</Card.Title>
                  <Card.Text>
                  No caption
                  </Card.Text>
                  <Button variant="primary">view</Button>
                </Card.Body>
              </Card>
              </div>
              <div className="col-sm-6">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={Icon2} />
                <Card.Body>
                  <Card.Title>Image 2</Card.Title>
                  <Card.Text>
                    No caption
                  </Card.Text>
                  <Button variant="primary">view</Button>
                </Card.Body>
              </Card>
              </div>
            </div>
            <hr></hr>
        </div>
        {/* photo div ends */}
        <div className="container">
        <h3>Onsite Capturing</h3>
        <Typography>
              {/* <div className="container">
                  <h5>Press + button to capture images</h5>
                  <Link to={"/adddrawing/"}>
                    <Fab color="primary" aria-label="add" >
                        <AddIcon />
                    </Fab>
                    </Link>
                    
              </div> */}
        <WebcamCapture/>      
        </Typography>
        </div>
        {/* <CameraViewer/>     */}
      </div>
      
    );
  }
}