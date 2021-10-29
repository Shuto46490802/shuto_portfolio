import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

//CSS
import '../styles/index.scss';
import '../styles/app.scss';
import 'bootstrap/dist/css/bootstrap.css';

//Components
import Layout from '../Comps/PageLayout/Layout';

//Libraries
import { AnimatePresence } from "framer-motion";
import * as THREE from "three";

function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState('blue');
  const [GLColor, setGLColor] = useState(new THREE.Color("#7993b6"));
  const [isGLFirstLoaded, setIsGLFirstLoaded] = useState(false);
  const [isFirstAnimationReady, setIsFirstAnimationReady] = useState(false);
  const [isScrollingToWorks, setIsScrollingToWorks] = useState(false);
  const [worksOffsetY, setWorksOffsetY] = useState(0);
  const worksWrapper = useRef();
  const router = useRouter();

  useEffect(() => {
    //set CSS for theme color

    if (theme === "blue") {
      document.body.classList.add("blue-theme")
      document.body.classList.remove("orange-theme")
      document.body.classList.remove("green-theme")
      document.body.classList.remove("light-green-theme")
      document.body.classList.remove("grey-theme")
      document.body.classList.remove("black-theme")
      setGLColor(new THREE.Color("#7993b6"))
    } else if (theme === "orange") {
      document.body.classList.remove("blue-theme")
      document.body.classList.add("orange-theme")
      document.body.classList.remove("green-theme")
      document.body.classList.remove("light-green-theme")
      document.body.classList.remove("grey-theme")
      document.body.classList.remove("black-theme")
      setGLColor(new THREE.Color("#bc8c39"))
    } else if (theme === "green") {
      document.body.classList.remove("blue-theme")
      document.body.classList.remove("orange-theme")
      document.body.classList.add("green-theme")
      document.body.classList.remove("light-green-theme")
      document.body.classList.remove("grey-theme")
      document.body.classList.remove("black-theme")
      setGLColor(new THREE.Color("#52a47e"))
    } else if (theme === "light-green") {
      document.body.classList.remove("blue-theme")
      document.body.classList.remove("orange-theme")
      document.body.classList.remove("green-theme")
      document.body.classList.add("light-green-theme")
      document.body.classList.remove("grey-theme")
      document.body.classList.remove("black-theme")
      setGLColor(new THREE.Color("#8c9a65"))
    } else if (theme === "grey") {
      document.body.classList.remove("blue-theme")
      document.body.classList.remove("orange-theme")
      document.body.classList.remove("green-theme")
      document.body.classList.remove("light-green-theme")
      document.body.classList.add("grey-theme")
      document.body.classList.remove("black-theme")
      setGLColor(new THREE.Color("#a7b6b0"))
    } else if (theme === "black") {
      document.body.classList.remove("blue-theme")
      document.body.classList.remove("orange-theme")
      document.body.classList.remove("green-theme")
      document.body.classList.remove("light-green-theme")
      document.body.classList.remove("grey-theme")
      document.body.classList.add("black-theme")
      setGLColor(new THREE.Color("#2a2927"))
    }

  }, [theme])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      getWorksOffsetY();
    });
    window.addEventListener('resize', () => {
      getWorksOffsetY();
    });

    return () => {
      window.removeEventListener('scroll', () => {
        getWorksOffsetY();
      });
      window.removeEventListener('resize', () => {
        getWorksOffsetY();
      });
    }
  }, [])

  const getWorksOffsetY = () => {

    if (worksWrapper.current) {
      const relativeOffsetY = worksWrapper.current.getBoundingClientRect().top;
      const scrollTop = window.pageYOffset;
      const absoluteOffsetY = relativeOffsetY + scrollTop;

      setWorksOffsetY(absoluteOffsetY)
    }

  }

  const scrollTop = () => {
    if (!isScrollingToWorks) {

      window.scroll({
        top: 1,
        left: 0,
        behavior: 'smooth'
      });

    } else {

      window.scroll({
        top: worksOffsetY,
        left: 0,
        behavior: 'smooth'
      });

      setTimeout(() => {
        setIsScrollingToWorks(false);
      }, 1000)
    }
  }

  return (
    <>

      <Head>
        <title>Shuto Portfolio</title>
        <meta name="description" content="This is the portfolio website of Shuto Suganuma, Front-End Web Developer. I'm very passionate about building an innovative and creative website that help you with your goals, and I will always do my best to live up to your expectations and think outside the box and face challenges with my passion and determination." />
        <meta name="copyright" content="(c) Shuto Suganuma." />
        <meta property="og:site_name" content="Shuto Suganuma Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shutosuganuma.com" />
        <meta property="og:title" content="Shuto Suganuma Portfolio" />
        <meta property="og:description" content="This is the portfolio website of Shuto Suganuma, Front-End Web Developer. I'm very passionate about building an innovative and creative website that help you with your goals, and I will always do my best to live up to your expectations and think outside the box and face challenges with my passion and determination." />
        <meta property="og:image" content="https://shutosuganuma.com/ogp.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shuto Suganuma Portfolio" />
        <meta name="twitter:description" content="This is the portfolio website of Shuto Suganuma, Front-End Web Developer. I'm very passionate about building an innovative and creative website that help you with your goals, and I will always do my best to live up to your expectations and think outside the box and face challenges with my passion and determination." />
        <meta name="twitter:image" content="https://shutosuganuma.com/ogp.jpg" />
      </Head>

      <Layout
        setTheme={setTheme}
        GLColor={GLColor}
        setIsFirstAnimationReady={setIsFirstAnimationReady}
        isGLFirstLoaded={isGLFirstLoaded}
        setIsScrollingToWorks={setIsScrollingToWorks}
      >

        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => {
            scrollTop();
          }}
        >

          <Component {...pageProps} key={router.asPath} isFirstAnimationReady={isFirstAnimationReady} isGLFirstLoaded={isGLFirstLoaded} setIsGLFirstLoaded={setIsGLFirstLoaded} GLColor={GLColor} worksWrapper={worksWrapper} />

        </AnimatePresence>

      </Layout>

    </>
  )
}

export default MyApp
