import React, { Component, useEffect } from 'react'
import Webcam from 'react-webcam'
import PropTypes from 'prop-types'
import styles from "../styles/Home.module.css";

export class Processor extends Component {
    constructor(props) {
        super(props);
        this.webCam = React.createRef();
        this.poseNet;
        this.ml5; 

        this.state = {
            detected: false,
            isModelLoaded: false,
        };
    }

    initializePoseNetModel = () => {
        this.poseNet = this.ml5.poseNet(this.webCam.current, () => {
            console.log("Model Initilaized");
            
            this.setState({
                isModelLoaded: true,
            });

            /*this.poseNet.on('pose', (result) => {
                this.poses = result;
                this.setState({
                    detected: result !== undefined && result.length > 0 ? true : false
                })
            });*/

        });

        console.log('this.poseNet: ', this.poseNet)
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/ml5@0.5.0/dist/ml5.min.js";
        script.type = "text/javascript";
        document.body.appendChild(script);

        this.ml5 = require('ml5')
        this.initializePoseNetModel();
    }

    render() {
        return (
            <div className={styles.container}>
            <Webcam 
                mirrored = 'true' 
                style = {{height: 'auto', width:'auto'}} 
                ref = {this.webCam}

            />
            </div>
        )
    }
}

Processor.propTypes = {
}

export default Processor;

