import * as cheerio from "cheerio";
import hljs from "highlight.js";
import { NextPage, GetStaticPropsContext } from "next";
import { client } from "../../lib/cmsClient";
import { Content, GetContentDetailResponse, GetContentListResponse } from "../../types";

const Detail: NextPage<Content> = (content) => {
  return (
    <main>
      <h1>{content.title}</h1>
      <p>{content.publishedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: `${content.body}` }} />
    </main>
  );
};

// 静的生成のPathを指定
export const getStaticPaths = async () => {
  const data = await client.get<GetContentListResponse>({ endpoint: "blogs" });

  const paths = data.contents.map((c) => `/blogs/${c.id}`);

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ id: string }>) => {
  const id = params?.id;
  const content = await client.get<Content>({
    endpoint: "blogs",
    contentId: id,
  });

  const $ = cheerio.load(content.body);
  $("pre code").each((_, elm) => {
    const highlightResult = hljs.highlightAuto($(elm).text());
    $(elm).html(highlightResult.value);
    $(elm).addClass("hljs");
  });

  return {
    props: {
      ...content,
      body: $.html(),
    },
  };
};

export default Detail;
