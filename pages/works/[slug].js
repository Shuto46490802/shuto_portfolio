import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

//Components
import WorkPageIntro from "../../Comps/WorkPage/WorkPageIntro";
import WorkPageOverViewVideo from '../../Comps/WorkPage/WorkPageOverViewVideo';
import WorkPageFeaturedContent1 from '../../Comps/WorkPage/WorkPageFeaturedContent1';
import WorkPageFeaturedContent2 from '../../Comps/WorkPage/WorkPageFeaturedContent2';
import works from '../../Comps/WorkPage/WorkLists';
import WorkPageContact from '../../Comps/WorkPage/WorkPageContact';
import Footer from '../../Comps/PageLayout/Footer';

//Libraries
import { createClient } from "contentful";
import WorkPageOtherWorks from '../../Comps/WorkPage/WorkPageOtherWorks';
import { motion } from "framer-motion";


const Work = ({ GLColor, workPageIntroImage, workPageOverviewVideo, featuredImage1, featuredVideo2, featuredImage3, workImages }) => {

    const router = useRouter();

    const [introDetails, setIntroDetails] = useState({});
    const [execution1, setExecution1] = useState({});
    const [execution2, setExecution2] = useState({});
    const [execution3, setExecution3] = useState({})
    const [otherWorksImage, setOtherWorksImage] = useState();

    useEffect(() => {
        const key = router.query.slug;
        const content = works[`${key}`];

        const introDetails = {
            introTitle: content.introTitle,
            introSubtitle: content.introSubtitle,
            technologies: content.technologies,
            credit: content.credit,
            introOverview: content.introOverview,
            url: content.url
        };

        const execution1 = content.execution1;
        const execution1Details = {
            title: execution1.title,
            overview: execution1.overview
        };

        const execution2 = content.execution2;
        const execution2Details = {
            title: execution2.title,
        };

        const execution3 = content.execution3;
        const execution3Details = {
            title: execution3.title,
            overview: execution3.overview
        }

        const otherWorksImage = workImages.filter((image) => image.title !== key);

        setIntroDetails(introDetails);
        setExecution1(execution1Details);
        setExecution2(execution2Details);
        setExecution3(execution3Details);
        setOtherWorksImage(otherWorksImage);
    }, [])

    const capitalizeTitle = (_slug) => {

        if (_slug) {

            const arr = _slug.split("-");

            const newArr = [];
            for (let i = 0; i < arr.length; i++) {
                const newStr = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

                newArr.push(newStr);
            }

            return newArr.join(" ");

        }
    }

    return (
        <>

            <Head>
                <title>Shuto Portfolio | {capitalizeTitle(router.query.slug)}</title>
            </Head>

            <motion.section
                className="work-page"
                initial={{ visibility: 'hidden' }}
                animate={{ visibility: 'visible' }}
                exit={{ visibility: 'hidden' }}
                transition={{ ease: "none", duration: 0, delay: 1.3 }}
            >

                <div className="work-page__inner position-relative w-100">

                    <WorkPageIntro workPageIntroImage={workPageIntroImage} introDetails={introDetails} />

                    <WorkPageOverViewVideo workPageOverviewVideo={workPageOverviewVideo} />

                    <WorkPageFeaturedContent1 execution={"Execution1"} execution1={execution1} images={featuredImage1} />

                    <WorkPageFeaturedContent2 featuredVideo2={featuredVideo2} execution2={execution2} />

                    <WorkPageFeaturedContent1 execution={"Execution3"} execution1={execution3} images={featuredImage3} />

                    <WorkPageOtherWorks workImages={otherWorksImage} GLColor={GLColor} pathname={router.pathname} />

                    <WorkPageContact />

                    <Footer />

                </div>

            </motion.section>

        </>
    );
}

const contentfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
});

export const getStaticPaths = async () => {

    const res = await contentfulClient.getEntries();

    const paths = res.items
        .filter((item) => {
            return item.sys.contentType.sys.id === 'beloved-joy' || item.sys.contentType.sys.id === 'covid-19-tracker' || item.sys.contentType.sys.id === 'shuto-portfolio'
        })
        .map((item) => {
            return {
                params: { slug: item.sys.contentType.sys.id }
            }
        })

    return {
        paths,
        fallback: false
    }

}

export const getStaticProps = async ({ params }) => {

    const workPageRes = await contentfulClient.getEntries({
        content_type: `${params.slug}`
    });

    const introImage = workPageRes.items[0].fields.introImage.fields.file.url;

    const overviewVideo = workPageRes.items[0].fields.video1.fields.file.url;

    const featuredImage1 = workPageRes.items[0].fields.featuredImage1;

    const featuredVideo2 = workPageRes.items[0].fields.featuredVideo2;

    const featuredImage3 = workPageRes.items[0].fields.featuredImage3;

    const workImagesRes = await contentfulClient.getEntries({
        content_type: "homeWork"
    });

    return {
        props: {
            workPageIntroImage: "https:" + introImage,
            workPageOverviewVideo: "https:" + overviewVideo,
            featuredImage1: featuredImage1.map((image) => {
                return "https:" + image.fields.file.url
            }),
            featuredVideo2: featuredVideo2.map((video) => {
                return "https:" + video.fields.file.url
            }),
            featuredImage3: featuredImage3.map((image) => {
                return "https:" + image.fields.file.url
            }),
            workImages: workImagesRes.items[0].fields.homeWorkImage.map((image) => ({
                mediaURL: 'https:' + image.fields.file.url,
                title: image.fields.title
            })),
        }
    }
}

export default Work;