import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

//Components
import HomeIntro from '../Comps/HomePage/HomeIntro';
import HomeProfile from '../Comps/HomePage/HomeProfile';
import HomeWorks from '../Comps/HomePage/HomeWorks';
import HomeContact from '../Comps/HomePage/HomeContact';
import Footer from '../Comps/PageLayout/Footer';

//Libraries
import { createClient } from "contentful";
import { motion } from "framer-motion";

export const getStaticProps = async () => {

  const contentfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  });

  const homeIntroImageRes = await contentfulClient.getEntries({
    content_type: "homeIntro"
  })

  const homeProfileImagesRes = await contentfulClient.getEntries({
    content_type: "homeProfile"
  })

  const homeWorkImagesRes = await contentfulClient.getEntries({
    content_type: "homeWork"
  })

  return {
    props: {
      homeIntroImage: 'https:' + homeIntroImageRes.items[0].fields.homeIntroImage.fields.file.url,
      homeProfileImages: homeProfileImagesRes.items.map((item) => ({
        mediaURL: 'https:' + item.fields.homeProfileImage.fields.file.url
      })),
      homeWorkImages: homeWorkImagesRes.items[0].fields.homeWorkImage.map((image) => ({
        mediaURL: 'https:' + image.fields.file.url
      })),
    }
  }

}

const Home = ({ GLColor, homeIntroImage, homeProfileImages, homeWorkImages, isFirstAnimationReady, isGLFirstLoaded, setIsGLFirstLoaded, worksWrapper }) => {

  const router = useRouter();

  return (
    <>

      <Head>
        <title>Shuto Portfolio</title>
      </Head>


      <motion.section
        className="home"
        initial={{ visibility: 'hidden' }}
        animate={{ visibility: 'visible' }}
        exit={{ visibility: 'hidden' }}
        transition={{ ease: "none", duration: 0, delay: 1.3 }}
      >

        <div className="home__inner position-relative w-100">

          <HomeIntro isFirstAnimationReady={isFirstAnimationReady} GLColor={GLColor} homeIntroImage={homeIntroImage} isGLFirstLoaded={isGLFirstLoaded} setIsGLFirstLoaded={setIsGLFirstLoaded} />

          <HomeProfile GLColor={GLColor} homeProfileImages={homeProfileImages} />

          <HomeWorks GLColor={GLColor} homeWorkImages={homeWorkImages} pathname={router.pathname} worksWrapper={worksWrapper} />

          <HomeContact />

          <Footer />

        </div>

      </motion.section>

    </>
  );
}

export default Home;