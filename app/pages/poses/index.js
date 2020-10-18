import Link from "next/link";
import React from "react";
import styles from "../../styles/Home.module.css";


export default function Poses() {

  return (
    <div className={styles.container}>
      <h1>Poses</h1>
      <br/>
      <p> Individual poses</p>
      <br />

      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href="/poses/pose1" >
            <a className={styles.card}>
              <h3>Pose 1 &rarr;</h3>
              <p>View and try out Pose 1</p>
            </a>
          </Link>
          <Link href="/poses/pose1" >
            <a className={styles.card}>
              <h3>Pose 2 &rarr;</h3>
              <p>View and try out Pose 2</p>
            </a>
          </Link>
        </div>
      </main>

      <h2>
        <Link href="/">
            <a className={styles.card}>
                Back to home
            </a>
        </Link>
      </h2>

    </div>
  );
};