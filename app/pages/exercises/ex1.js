import React, { Component } from 'react'
import Pose1 from '../poses/pose1';
import Pose2 from '../poses/pose2';
import Link from 'next/link'
import styles from "../../styles/Home.module.css";


export class ex1 extends Component {

    render() {
        return (
            <div>
                <h2>Welcome to exercise 1. Press the button once you are done with the pose</h2>
                <Link href="/exercises/ex1-2"><button>Go to next pose</button></Link>
                <div>
                    <Pose1 />
                </div>
                <br />
                <br />
                <br />
                <Link href="/exercises">
                        <a className={styles.card}>
                            Go to Exercises
                        </a>
                </Link>

            </div>
        )
    }
}

export default ex1
