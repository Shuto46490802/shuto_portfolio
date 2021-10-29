import { getServerSideSitemap } from "next-sitemap";
import { createClient } from "contentful";

export const getServerSideProps = async (ctx) => {

    const contentfulClient = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY
    });

    const res = await contentfulClient.getEntries();

    const fields = res.items
        .filter((item) => {
            return item.sys.contentType.sys.id === 'beloved-joy' || item.sys.contentType.sys.id === 'covid-19-tracker' || item.sys.contentType.sys.id === 'shuto-portfolio'
        })
        .map((item) => {
            return ({
                loc: `https://shutosuganuma.com/works/${item.sys.contentType.sys.id}`,
                lastmod: new Date().toISOString(),
            })
        })

    return getServerSideSitemap(ctx, fields)
}

const SiteMap = () => null;

export default SiteMap;