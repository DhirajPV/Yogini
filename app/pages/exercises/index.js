import Link from 'next/link'
import Webcam from 'react-webcam'
import Processor from '../../components/Processor'

export default function Exercise() {
    return  <div>
                <h1>Exercises</h1>
                <br></br>
                <p> Get all the excercises avaiable and show em all </p>
                <br/>
                <h2>
                    <Link href="/">
                        <a>Back to home</a>
                    </Link>
                </h2>
                <Processor/>
            </div>
}
