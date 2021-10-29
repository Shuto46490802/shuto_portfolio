import React, { useEffect } from "react";
import Head from 'next/head';

//Components
import ErrorPageContent from "../Comps/ErrorPage/Content";

//Libraries
import { createClient } from "contentful";
import { motion } from "framer-motion";

export const getStaticProps = async () => {

    const contentfulClient = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY
    });

    const errorImageRes = await contentfulClient.getEntries({
        content_type: "errorPage"
    })

    return {
        props: {
            errorImage: 'https:' + errorImageRes.items[0].fields.errorImage.fields.file.url
        }

    }

}

const ErrorPage = ({ errorImage, GLColor }) => {

    return (
        <>

            <Head>
                <title>Shuto Portfolio | 404</title>
            </Head>

            <motion.section
                className="error"
                initial={{ visibility: 'hidden' }}
                animate={{ visibility: 'visible' }}
                exit={{ visibility: 'hidden' }}
                transition={{ ease: "none", duration: 0, delay: 1.3 }}
            >

                <div className="error__inner position-relative w-100">

                    <ErrorPageContent errorImage={errorImage} />

                </div>

            </motion.section>

        </>
    );
}

export default ErrorPage;