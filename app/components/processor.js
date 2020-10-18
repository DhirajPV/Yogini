import React, { Component } from 'react'
import Webcam from 'react-webcam'

import PropTypes from 'prop-types'
import styles from "../styles/Home.module.css";

import * as tfjs from "@tensorflow/tfjs"
import * as tf from "@tensorflow/tfjs-core"
import * as posenet from "@tensorflow-models/posenet"

export class Processor extends Component {
    constructor(props) {
        super(props);
        this.WebcamRef = React.createRef(null);
    }

    drawPoints = (pose, colour) => {
        const canvas = document.getElementById("canvas");
        const ct = canvas.getContext("2d");
        ct.clearRect(0, 0, canvas.width, canvas.height);
        const points = pose.keypoints;
        // loop through the keypoints (check posenet for numbering -> location)
        for (let i = 0; i < points.length; i++) {
            const key = points[i];
            if (key.score > 0.1) {
                console.log(key.position);
                ct.beginPath();
                ct.arc(key.position.x, key.position.y, 2, 0, 2 * Math.PI);
                ct.fillStyle = colour;
                ct.stroke();
                ct.fill();
            }
        }
    }

    drawLines = (pose, colour) => {

    }

    drawCameraIntoCanvas = () => {
        // Draw the video element into the canvas
        ctx.drawImage(video, 0, 0, 640, 480);
        // We can call both functions to draw all keypoints and the skeletons
        drawKeypoints();
        drawSkeleton();
        window.requestAnimationFrame(drawCameraIntoCanvas);
    }

    runPose = async (net) => {
        if (this.WebcamRef.current !== undefined && this.WebcamRef.current !== null && 
          this.WebcamRef.current.video.readyState === 4 ) {
            const curFrame = this.WebcamRef.current.video;
            curFrame.width = this.WebcamRef.current.video.videoWidth;
            curFrame.height = this.WebcamRef.current.video.videoHeight;
            const pose = await net.estimateSinglePose(curFrame);
            this.drawPoints(pose);
        }
      }
    
    runNet = async () => {
        const net = await posenet.load({
          architecture: "MobileNetV1",
          outputStride: 16,
          inputResolution: { width: 640, height: 480 },
          multiplier: 0.75,
        });
    
        setInterval(() => {
          this.runPose(net);
        }, 150);
    }

    componentDidMount() {
        this.runNet();
    }

    render() {
        return (
            <div className={styles.container}>
            <Webcam 
                mirrored = 'true' 
                style = {{height: 'auto', width:'auto'}} 
                ref = {this.WebcamRef}

            />
            <canvas id="canvas" width="640" height="480">
            {" "}
            </canvas>
            </div>
        )
    }
}

Processor.propTypes = {
}

export default Processor;

