import Link from 'next/link'
import React, { Component } from 'react'
import Webcam from 'react-webcam'
import Processor from '../../components/processor'

export class Exercises extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.getPoseDetails()
    }



    async getPoseDetails(){

        const posenet = require('@tensorflow-models/posenet');
    
        async function estimatePoseOnImage(imageElement) {
        // load the posenet model from a checkpoint
        const net = await posenet.load();
    
        const pose = await net.estimateSinglePose(imageElement, {
            flipHorizontal: false
        });
        return pose;
        }
    
        const imageElement = document.getElementById('pose');
        console.log(imageElement)
        const pose = await estimatePoseOnImage(imageElement);
        
    
        console.log("Pose :", pose);
    }




    render() {
        return  <div>
                    <h1>Exercises</h1>
                    <br></br>
                    <p> Get all the excercises avaiable and show em all </p>
                    <br />

                    <img src={'/pose4.png'} id="pose" />


                    <Webcam mirrored='true' style={{height: 'auto', width:'auto'}} />


                    <h2>
                        <Link href="/">
                            <a>Back to home</a>
                        </Link>
                    </h2>
                    <Processor/>
                </div>         
    }
}

export default Exercises;
