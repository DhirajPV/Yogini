import Link from "next/link";
import React from "react";
import Webcam from "react-webcam";
import * as tfjs from "@tensorflow/tfjs";
import * as tf from "@tensorflow/tfjs-core";
import * as posenet from "@tensorflow-models/posenet";

export default function Poses() {
  const WebcamRef = React.createRef();

  function drawPoints(pose) {
    const canvas = document.getElementById("canvas");
    const ct = canvas.getContext("2d");

    const points = pose.keypoints;
    // loop through the keypoints (check posenet for numbering -> location)
    for (let i = 0; i < points.length; i++) {
      const key = points[i];
      if (key.score > 0.1) {
        console.log(key.position);
        ct.beginPath();
        ct.arc(key.position.x, key.position.y, 10, 0, 2 * Math.PI);
        ct.stroke();
      }
    }
  }

  function drawCameraIntoCanvas() {
    // Draw the video element into the canvas
    ctx.drawImage(video, 0, 0, 640, 480);
    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    drawSkeleton();
    window.requestAnimationFrame(drawCameraIntoCanvas);
  }

  const runPose = async (net) => {
    if (
      WebcamRef.current !== undefined &&
      WebcamRef.current !== null &&
      WebcamRef.current.video.readyState === 4
    ) {
      const curFrame = WebcamRef.current.video;
      curFrame.width = WebcamRef.current.video.videoWidth;
      curFrame.height = WebcamRef.current.video.videoHeight;
      const pose = await net.estimateSinglePose(curFrame);
      drawPoints(pose);
    }
  };

  const runNet = async () => {
    const net = await posenet.load({
      architecture: "MobileNetV1",
      outputStride: 16,
      inputResolution: { width: 640, height: 480 },
      multiplier: 0.75,
    });

    setInterval(() => {
      runPose(net);
    }, 150);
  };

  runNet();
  return (
    <div>
      <h1>Poses</h1>
      <br></br>
      <p> Individual popses</p>
      <br />
      <Webcam
        ref={WebcamRef}
        mirrored="true"
        style={{ height: "auto", width: "auto" }}
      />
      <canvas id="canvas" width="640" height="480">
        {" "}
      </canvas>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </div>
  );
}
