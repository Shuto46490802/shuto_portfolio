import React, { useEffect } from 'react';
import Head from 'next/head';

//Components
import ProfileIntro from "../Comps/Profile/ProfileIntro"
import ProfileSlideShow from '../Comps/Profile/ProfileSlideShow';
import ProfileTech from '../Comps/Profile/ProfileTech';
import ProfileContact from '../Comps/Profile/ProfileContact';

//Libraries
import { createClient } from "contentful";
import Footer from '../Comps/PageLayout/Footer';
import { motion } from "framer-motion";

export const getStaticProps = async () => {

    const contentfulClient = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY
    })

    const profileIntroImageRes = await contentfulClient.getEntries({
        content_type: "profileIntro"
    })

    const slideShowImagesRes = await contentfulClient.getEntries({
        content_type: "profileSlideShow"
    })

    return {
        props: {
            profileIntroImage: profileIntroImageRes.items[0].fields.profileIntroImage.fields.file.url,
            slideShowImages: slideShowImagesRes.items.map((item) => ({
                mediaURL: 'https:' + item.fields.profileSlideShowImage.fields.file.url
            }))
        }
    }
}

const Profile = ({ isFirstAnimationReady, GLColor, slideShowImages, profileIntroImage, isGLFirstLoaded, setIsGLFirstLoaded }) => {

    return (
        <>

            <Head>
                <title>Shuto Portfolio | Profile</title>
            </Head>

            <motion.section
                className="profile"
                initial={{ visibility: 'hidden' }}
                animate={{ visibility: 'visible' }}
                exit={{ visibility: 'hidden' }}
                transition={{ ease: "none", duration: 0, delay: 1.3 }}
            >

                <div className="profile__inner position-relative w-100">

                    <ProfileIntro isFirstAnimationReady={isFirstAnimationReady} GLColor={GLColor} image={profileIntroImage} isGLFirstLoaded={isGLFirstLoaded} setIsGLFirstLoaded={setIsGLFirstLoaded} />

                    <ProfileSlideShow GLColor={GLColor} slideShowImages={slideShowImages} isFirstAnimationReady={isFirstAnimationReady} />

                    <ProfileTech />

                    <ProfileContact />

                    <Footer />

                </div>

            </motion.section>

        </>
    );
}

export default Profile;