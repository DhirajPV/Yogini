import Link from 'next/link'
import Webcam from 'react-webcam'
import Processor from '../../components/Processor'
import styles from "../../styles/Home.module.css";


export default function Exercise() {
    return  <div className={styles.container}>
                <h1>Exercises</h1>
                <br></br>
                <p> Get all the excercises avaiable and show em all </p>
                <br/>
                <h2>
                    <Link href="/">
                        <a className={styles.card}>
                            Back to home
                        </a>
                    </Link>
                </h2>
                <Processor/>
            </div>
}
