import React, { Component } from 'react';
import logo from './logo.svg';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Col,
    Container,
    Row
} from 'reactstrap';

import './App.css';
import { CreateBadge } from './Components/CreateBadge'
import { CreateIssuer } from './Components/CreateIssuer'
import { IpfsUploader } from './Components/IpfsUploader'
// import {UploadBadge} from './Components/UploadBadge'
// import {CheckBadge} from './Components/CheckBadge'

class App extends Component {
    render() {
        return ( <div className = "App" > <header className = "App-header">
            <img src = { logo } className = "App-logo"
            alt = "logo" / >
            <h1 className = "App-title" > Welcome to Undeniable Truth Factory < /h1>
            </header>

            <p className = "App-intro">
            Hier kan je badges maken en vastleggen op de blockchain
            </p>
            <Container>
                <Row>
                    <Col xs="6"><CreateIssuer / ></Col>
                    <Col xs="6"><CreateBadge / > </Col>
                </Row>
                <Row>
                    <Col><IpfsUploader /></Col>
                </Row>

            </Container>


            // <CreateIssuer / >

            <p className = "App-intro">
            BREAK LINE
            </p>
            <IpfsUploader / >
            <p className = "App-intro" >
            BREAK LINE </p>

            <CreateBadge />
       
            </div>

          );
        }
    }
    export default App;
