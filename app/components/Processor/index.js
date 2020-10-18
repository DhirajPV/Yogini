import React, { Component } from "react";
import Webcam from "react-webcam";
import * as tfjs from "@tensorflow/tfjs";
import * as tf from "@tensorflow/tfjs-core";
import * as posenet from "@tensorflow-models/posenet";

export class Processor extends Component {
  constructor(props) {
    super(props);
    this.WebcamRef = React.createRef(null);
  }

  drawPoints = (pose, colour) => {
    const canvas = document.getElementById("canvas");
    const ct = canvas.getContext("2d");

    ct.clearRect(0, 0, canvas.width, canvas.height);
    ct.drawImage(this.WebcamRef.current.video, 0, 0, 640, 480, 0, 0, 640, 480);

    const points = pose.keypoints;
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
  };

  drawLines = (pose, colour) => {
    const canvas = document.getElementById("canvas");
    const ct = canvas.getContext("2d");

    ct.clearRect(0, 0, canvas.width, canvas.height);
    ct.drawImage(this.WebcamRef.current.video, 0, 0, 640, 480, 0, 0, 640, 480);

    const points = pose.keypoints;
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
  };

  draw = (pose, colour) => {
    const canvas = document.getElementById("canvas");
    const ct = canvas.getContext("2d");

    ct.clearRect(0, 0, canvas.width, canvas.height);
    ct.drawImage(this.WebcamRef.current.video, 0, 0, 640, 480, 0, 0, 640, 480);

    this.drawPoints(pose, colour);
    this.drawLines(pose, colour);
  };

  runPose = async (net) => {
    if (
      this.WebcamRef.current !== undefined &&
      this.WebcamRef.current !== null &&
      this.WebcamRef.current.video.readyState === 4
    ) {
      const curFrame = this.WebcamRef.current.video;
      curFrame.width = this.WebcamRef.current.video.videoWidth;
      curFrame.height = this.WebcamRef.current.video.videoHeight;
      const pose = await net.estimateSinglePose(curFrame, {
        flipHorizontal: false,
      });
      this.drawPoints(pose, '#00FF00');
    }
  };

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
  };

  componentDidMount() {
    this.runNet();
  }

  render() {
    return (
      <div>
        <Webcam
          mirrored="true"
          style={{ height: "0", width: "0" }}
          ref={this.WebcamRef}
        />
        <canvas id="canvas" width="640" height="480">
          {" "}
        </canvas>
      </div>
    );
  }
}

Processor.propTypes = {};

export default Processor;
