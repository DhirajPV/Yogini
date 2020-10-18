import React, { Component, useEffect } from 'react'
import Webcam from 'react-webcam'
import PropTypes from 'prop-types'

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
        if (this.webCam.current !== undefined && this.webCam.current !== null
          && this.webCam.current.video.readyState === 4){
            this.poseNet = this.ml5.poseNet(this.webCam, () => {
                console.log(this.poseNet.singlePose());

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
          }


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
            <div>
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
