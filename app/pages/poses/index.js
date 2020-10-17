import Link from 'next/link'
import Webcam from 'react-webcam'


export default function Poses() {
    return  <div>
                <h1>Poses</h1>
                <br></br>
                <p> Individual popses</p>
                <br />
                <Webcam mirrored='true' style={{height: 'auto', width:'auto'}} />
                <h2>
                    <Link href="/">
                        <a>Back to home</a>
                    </Link>
                </h2>
            </div>
}