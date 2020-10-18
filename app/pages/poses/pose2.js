import React, { Component } from "react";
import Link from 'next/link'
import Processor from '../../components/Processor'
import styles from "../../styles/Home.module.css";

export class Pose1 extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={styles.container}>
                <h1>Pose 2</h1>
                <br></br>
                <p> Try out Pose 2 </p>
                <br/>
                <div className="container">
                    <Processor poseNo="pose2" />
                    <img src={'/pose4.png'} id="pose1" width="300" height="300" />
                </div>
                <h2>
                    <Link href="/poses">
                        <a className={styles.card}>
                            Back to poses
                        </a>
                    </Link>
                </h2>
            </div>
        );
    }
}
export default Pose1
