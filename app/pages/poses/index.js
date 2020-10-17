import Link from 'next/link'
import React from 'react'
import Webcam from  'react-webcam'
import * as tfjs from '@tensorflow/tfjs'
import * as tf from '@tensorflow/tfjs-core'
import * as posenet from '@tensorflow-models/posenet'


export default function Poses() {
    const WebcamRef = React.createRef();

    const runNet = async () => {
        const net = await posenet.load({
            architecture: 'MobileNetV1',
            outputStride: 16,
            inputResolution: { width: 640, height: 480 },
            multiplier: 0.75
          });
    
        setInterval(() => {
            runPose(net);
        }, 50);
    };
    
    
    
    const runPose = async (net) => {
        
        if (WebcamRef.current !== undefined && WebcamRef.current !== null && WebcamRef.current.video.readyState === 4) {
            const curFrame = WebcamRef.current.video;
            const pose = await net.estimateSinglePose(curFrame);
            console.log(pose);
        }
    };


    runNet();

    return  <div>
                <h1>Poses</h1>
                <br></br>
                <p> Individual popses</p>
                <br />
                <Webcam ref={WebcamRef} mirrored='true' style={{height: 'auto', width:'auto'}} />
                <h2>
                    <Link href="/">
                        <a>Back to home</a>
                    </Link>
                </h2>
            </div>
}