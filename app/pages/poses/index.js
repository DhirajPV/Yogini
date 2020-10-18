import Link from "next/link";
import React from "react";

export default function Poses() {

  return (
    <div>
      <h1>Poses</h1>
      <br/>
      <p> Individual poses</p>
      <br />
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </div>
  );
};