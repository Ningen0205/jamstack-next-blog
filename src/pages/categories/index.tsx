import { NextPage } from "next";
import Link from "next/link";
import { client } from "../../lib/cmsClient";
import { GetCategoryListResponse } from "../../types";

const List: NextPage<GetCategoryListResponse> = ({ contents, totalCount }) => {
  return (
    <div>
      <h1>カテゴリが{totalCount}件見つかりました。</h1>
      <div>
        {contents.map((c) => (
          <Link key={c.id} href={`/categories/${c.id}`}>
            <a>
              <div>{c.name}</div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const data = await client.get<GetCategoryListResponse>({
    endpoint: "categories",
  });
  console.log(data);
  return {
    props: {
      ...data,
    },
  };
};

export default List;
