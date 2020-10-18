import Link from "next/link";
import React from "react";

export default function Poses() {

  return (
    <div>
      <h1>Poses</h1>
      <br></br>
      <p> Individual popses</p>
      <br/>
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
