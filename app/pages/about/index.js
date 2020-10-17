import Link from 'next/link'


export default function About() {
    return (
                <div>
                <h1>About Me</h1>
                <br></br>
                <p> This is a yoga web app which tracks your posture in real time and shows any corrections.</p>
                <br />
                <h2>
                    <Link href="/">
                        <a>Back to home</a>
                    </Link>
                </h2>
            </div>
          )
}
