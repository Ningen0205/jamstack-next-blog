import { NextPage, GetStaticPropsContext } from "next";
import { client } from "../../lib/cmsClient";
import { Content, GetContentDetailResponse, GetContentListResponse } from "../../types";

const detail: NextPage<{content: Content}> = ({ content }) => {
    return(
        <main>
            <h1>{ content.title }</h1>
            <p>{ content.publishedAt }</p>
            <div dangerouslySetInnerHTML={{ __html: `${content.body}`}} />
        </main>
    )
}

// 静的生成のPathを指定
export const getStaticPaths = async() => {
    const data = await client.get<GetContentListResponse>({ endpoint: "blogs"});

    const paths = data.contents.map(c => `/blog/${c.id}`);

    return { paths, fallback: false };

}

export const getStaticProps = async({ params }: GetStaticPropsContext<{ id: string }>) => {
    const id = params?.id;
    const data = await client.get<GetContentDetailResponse>({ endpoint: "blogs", contentId: id})

    return {
        props: {
            content: data
        }
    }
}

export default detail;