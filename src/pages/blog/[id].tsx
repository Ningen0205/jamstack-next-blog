import { GetStaticProps, NextPage, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { client } from "../../lib/cmsClient";
import { GetContentDetailResponse, GetContentListResponse } from "../../types";

const detail: NextPage<GetContentDetailResponse> = ({ content }) => {
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
    const data = await client.get<Content>({ endpoint: "blogs", contentId: id})

    return {
        props: {
            content: data
        }
    }
}


export default detail;