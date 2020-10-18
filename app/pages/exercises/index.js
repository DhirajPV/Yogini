

import Link from 'next/link'
import React, { Component } from 'react'
import Webcam from 'react-webcam'
import styles from "../../styles/Home.module.css";


//Backend
import * as tfjs from "@tensorflow/tfjs";
import * as tf from "@tensorflow/tfjs-core";
import * as posenet from "@tensorflow-models/posenet";


export class Exercises extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getPoseDetails()
    }


    async getPoseDetails(){

        // const posenet = require('@tensorflow-models/posenet');
    
        async function estimatePoseOnImage(imageElement) {
        // load the posenet model from a checkpoint
        const net = await posenet.load();
    
        const pose = await net.estimateSinglePose(imageElement, {
            flipHorizontal: false
        });
        return pose;
        }
    
        const imageElement = document.getElementById('pose');
        const pose = await estimatePoseOnImage(imageElement);
        // this.plotPoints(pose);
        this.drawJoint(pose);
                
    }


    plotPoints(pose){

        const canvas = document.getElementById("canvas");
        const ct = canvas.getContext("2d");

        const points = pose.keypoints;
        // loop through the keypoints (check posenet for numbering -> location)
        for (let i = 0; i < points.length; i++) {
        const key = points[i];
        if (key.score > 0) {
            // console.log(key.position);
            ct.beginPath();
            ct.arc(key.position.x, key.position.y, 10, 0, 2 * Math.PI);
            ct.stroke();
        }
      }
    }



    drawJoint(pose){

        const points = pose.keypoints;

        let jointAngles = {}

        for(let i=0; i < points.length ; i++){

            let {part, score} = points[i]

            if (score > 0){
                // console.log("Part ", part);
                // console.log("Coords ", points[i].position);
                // jointAngles[points[i].part] = 0
                jointAngles[part] = points[i].position
        }
    }

    console.log(jointAngles)

    // let knee = jointAngles.leftKnee;
    // let hip = jointAngles.leftHip;
    // let ankle = jointAngles.leftAnkle;

    // this.angleFunc(ankle,hip,knee)

    
    this.angleFunc(jointAngles.leftShoulder, jointAngles.leftAnkle);




}

    angleFunc(joint1, joint2){

        let imaginaryPoint = {x: joint1.x,  y: joint2.y};

        let trunkLean = 360 - (
            Math.atan2(
              imaginaryPoint.y - joint2.y,
              imaginaryPoint.x - joint2.x
            ) - Math.atan2(
                joint1.y - joint2.y,
                joint1.x - joint2.x)
          ) * (180 / Math.PI);
        
        console.log('Trunk Lean: ', trunkLean)


        const canvas = document.getElementById("canvas");
        const ct = canvas.getContext("2d");

        let joints = [joint1, joint2 , imaginaryPoint]

        joints.forEach((ele, i)=>{
            ct.beginPath();
            ct.arc(ele.x, ele.y, 10, 0, 2 * Math.PI);
            ct.stroke();
        })

        

    }






    render() {
        return  <div>
                    <h1>Exercises</h1>
                    <br></br>
                    <p> Get all the excercises avaiable and show em all </p>
                    <br />

                    <div id="container">
                        <img src={'/pose4.png'} id="pose" width="300" height="300" />
                        <canvas id="canvas" width="300" height="300"></canvas>
                    </div>
                    

                    <h2>
                        <Link href="/">
                            <a>Back to home</a>
                        </Link>
                    </h2>

                </div>         
    }
}

export default Exercises;
