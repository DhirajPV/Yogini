import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import LocalLottie from '../components/LocalLottie'
import yogini from '../public/yogini.json'
import Webcam from 'react-webcam'

export default function Home() {
  return (

    <div className={styles.container}>
      <Head>
        <title>yogini</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charset="utf-8"/>
	      <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      </Head>

      <main className={styles.main}>

      <LocalLottie animationData={yogini} />

        <h1 className={styles.title}>
           yogini
        </h1>  <br/>
        <h3 className={styles.title}>
           /jəʊɡɪˈniː/
        </h3> <br/>
        <h6 className={styles.title}>
           1. (yoga) a devotee or adherent of yoga. [from 17th c.]
            <br/>
           2. (COVID) your personal yoga assistant.
        </h6>
        <div className={styles.grid}>

          <Link href="/exercises" >
          <a className={styles.card}>
            <h3>Exercises &rarr;</h3>
            <p>View all the exercises available with a how to attached</p>
          </a>
          </Link>

          <Link href="/poses" >
          <a className={styles.card}>
            <h3>Poses &rarr;</h3>
            <p>Has all the poses listed out and can be accessed</p>
          </a>
          </Link>
        </div>
      </main>

      <Webcam style={{height: 'auto', width:'auto'}} />

      <footer className={styles.footer}>
          <Link href="/about" >
          <a>
            <p>made with 💖, by Achinth, Ahnaf, Huzefa, Dhiraj and Shaunak
            </p>
            <br/>
            <p>  © 2020 </p>
          </a>
          </Link>
      </footer>
    </div>
  )
}
