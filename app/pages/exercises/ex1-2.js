import React from 'react'
import Pose2 from '../poses/pose2';
import Link from 'next/link'
import styles from "../../styles/Home.module.css";


export default function ex12() {
    return (
        <div>
            <h2>Welcome to exercise 1. Press the button once you are done with the pose</h2>
            <Link href="/exercises"><a className={styles.card}>Go to next pose</a></Link>
            <Pose2 />
            <Link href="/exercises">
                        <a className={styles.card}>
                            Go to Exercises
                        </a>
            </Link>
        </div>
    )
}
