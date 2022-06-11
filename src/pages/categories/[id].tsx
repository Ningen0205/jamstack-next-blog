import { NextPage, GetStaticPropsContext } from "next";
import ContentCard from "../../components/contentCard";
import { client } from "../../lib/cmsClient";
import {
  Category,
  Content,
  GetCategoryListResponse,
  GetContentListResponse,
} from "../../types";

const Detail: NextPage<{ category: Category; contents: Content[] }> = ({
  category,
  contents,
}) => {
  return (
    <div>
      <div>{category.id}</div>
      <div>{category.name}</div>

      <section>
        <h2>記事一覧</h2>
        {contents.map((content) => (
          <ContentCard content={content} />
        ))}
      </section>
    </div>
  );
};

export const getStaticPaths = async () => {
  const data = await client.get<GetCategoryListResponse>({
    endpoint: "categories",
  });

  const paths = data.contents.map((c) => `/categories/${c.id}`);

  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ id: string }>) => {
  const id = params?.id;
  const category = await client.get<Category>({
    endpoint: "categories",
    contentId: id,
  });

  const contents = await client.get<GetContentListResponse>({
    endpoint: "blogs",
    queries: {
      filters: `category[equals]${id}`,
    },
  });

  return {
    props: {
      category: category,
      contents: contents.contents,
    },
  };
};

export default Detail;
