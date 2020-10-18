import React, { Component } from "react";
import Webcam from "react-webcam";
import * as tfjs from "@tensorflow/tfjs";
import * as tf from "@tensorflow/tfjs-core";
import * as posenet from "@tensorflow-models/posenet";

const connections = [
[11, 5], [7, 5],
[7, 9], [11, 13],
[13, 15], [12, 6],
[8, 6], [8, 10],
[12, 14], [14, 16],
[5, 6], [11, 12]
];


export class Processor extends Component {
  constructor(props) {
    super(props);
    this.WebcamRef = React.createRef(null);
  }



  draw = (pose, colour) => {
    const canvas = document.getElementById("canvas");
    const ct = canvas.getContext("2d");

    let jointAngles = {}

    ct.clearRect(0, 0, canvas.width, canvas.height);
    ct.drawImage(this.WebcamRef.current.video, 0, 0, 650, 480, 0, 0, 650, 480);

    const points = pose.keypoints;
    for (let i = 0; i < points.length; i++) {
      const key = points[i];
      if (key.score > 0.2) {
        ct.beginPath();
        ct.arc(key.position.x, key.position.y, 2, 0, 2 * Math.PI);
        ct.fillStyle = colour;
        ct.stroke();

        //Store the angle
        jointAngles[key.part] = key.position
      }
    }

    for (let i = 0; i < connections.length; i++) {
      let link = connections[i]
      if (points[link[0]].score > 0.2 || points[link[1]].score > 0.2) {
      ct.moveTo(points[link[0]].position.x, points[link[0]].position.y)
      ct.lineTo(points[link[1]].position.x, points[link[1]].position.y)
      ct.lineWidth = 3
      ct.strokeStyle = "green"
      ct.stroke()
      }
    }


    
     let yogaPoses = {
       //pos1 is basically just a quick check of the three joints below, with ELBOW as the pivot
      'pos1' : (360 - this.arcTanFunction(jointAngles.leftShoulder, jointAngles.leftElbow, jointAngles.leftWrist)),
      'pos2' : this.arcTanFunction(jointAngles.rightShoulder, jointAngles.rightElbow, jointAngles.rightWrist), //same, for RIGHT

      //Basically 0 when you stand STRAIGHT UP; try squatting... your back should be at 45 degrees, as given by THETA
      'pos3' : (180 + this.arcTanFunction(jointAngles.rightEye, jointAngles.rightHip, jointAngles.rightKnee))
     }


      let theta = yogaPoses['pos3']
      console.log(`Theta: ${theta}`)
      const THRESHOLD = 45;
      //If you're standing straight, it's no good; just start squatting...
      if (theta < THRESHOLD && theta != null){console.log("Not good enough")}
  };


  // Three joints: b is PIVOT
  arcTanFunction(a,b,c){

    if(a==null || b==null || c==null){
      console.log("Out of Frame.")
      return null
    }
    else{
    let theta = (
      Math.atan2(
        a.y - b.y,
        a.x - b.x
      )
      - Math.atan2(
        c.y - b.y,
        c.x - b.x
      )
    ) * (180 / Math.PI); 

    // console.log(`Theta: ${theta}`)
    return theta
  }
}



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
        flipHorizontal: false
      });
      this.draw(pose, "#00FF00");
    }
  };

  runNet = async () => {
    const net = await posenet.load({
      architecture: "ResNet50",
      outputStride: 32,
      inputResolution: { width: 257, height: 200 },
      quantBytes: 2
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
          mirrored="false"
          style={{ height: "0", width: "0" }}
          ref={this.WebcamRef}
        />
        <canvas id="canvas" width="650" height="480">
          {" "}
        </canvas>
      </div>
    );
  }
}

Processor.propTypes = {};

export default Processor;
