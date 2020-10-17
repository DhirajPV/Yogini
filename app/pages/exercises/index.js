import Link from 'next/link'
import Webcam from 'react-webcam'


export default function Exercise() {
    return  <div>
                <h1>Exercises</h1>
                <br></br>
                <p> Get all the excercises avaiable and show em all </p>
                <br />

<<<<<<< HEAD
                <ul>
                    <li>Sth sth</li>
                    <li>Sth sth</li>
                    <li>Sth sth</li>
                </ul>
=======
                <Webcam mirrored='true' style={{height: 'auto', width:'auto'}} />
>>>>>>> 6ef5a14dccd4fd65fc008563f3bbc3009ae3c864

                <h2>
                    <Link href="/">
                        <a>Back to home</a>
                    </Link>
                </h2>
            </div>
}
