

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
        // this.getPoseDetails()
    }

/* 
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

    
    // this.angleFunc(jointAngles.leftShoulder,
    //                jointAngles.leftHip);

    this.triAngleFunc(jointAngles.leftEye, 
                    jointAngles.leftWrist,  //Hinge
                     jointAngles.leftAnkle);




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
            ct.fillStyle = "red" 
        })

    }


    //WANT angle between AB and BC (so B is hinge)
    triAngleFunc(a, b ,c){

        // Angle_B=Math.acos
        //     ((Math.pow (len (b, c), 2) +
        //     Math.pow (len (a, b),2) -
        //     Math.pow (len (a, c),2))/ (2*len
        //     (b, c) *len (a, b)))*180/Math.PI

        //Get vectors
        let xs = (a.x - b.x);
        let ys = (a.y - b.y);
        let AB = xs*xs + ys*ys;

        xs = (b.x - c.x);
        ys = (b.y - c.y);
        let BC = xs*xs + ys*ys;

        xs = (a.x - c.x);
        ys = (a.y - c.y);
        let AC = xs*xs + ys*ys;


        let theta = Math.acos((BC + AB -AC)/(2*BC*AB))*180/Math.PI
        console.log("THETA, ", theta)


        const canvas = document.getElementById("canvas");
        const ct = canvas.getContext("2d");

        let joints = [a, b, c]

        joints.forEach((ele, i)=>{
            ct.beginPath();
            ct.arc(ele.x, ele.y, 10, 0, 2 * Math.PI);
            ct.stroke();
        })

    }




*/

    render() {
        return  <div>
                    <h1>Exercises</h1>
                    <br></br>
                    <p> Get all the excercises avaiable and show em all </p>
                    <br />
                    <h3>Exercise Set 1</h3>
                    <p>It contains the following poses</p>
                    <div id="container">
                        <img src={'/pose1.png'} id="pose" width="35%" height="35%" />
                        <img src={'/pose2.png'} id="pose" width="35%" height="35%" />
                    </div>
                    <Link href="/exercises/ex1">
                        <button>Go to Exercise 1</button>
                    </Link>
                    <h2>
                        <Link href="/">
                            <a>Back to home</a>
                        </Link>
                    </h2>

                </div>         
    }
}

export default Exercises;
