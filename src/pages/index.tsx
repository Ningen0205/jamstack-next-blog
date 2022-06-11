import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { client } from "../lib/cmsClient";
import styles from "../styles/Home.module.css";
import { GetContentListResponse } from "../types";

const Home: NextPage<GetContentListResponse> = ({ contents }) => {
  return (
    <div>
      <h1>ブログTop</h1>

      <p>現在作成中です。</p>
    </div>
  );
};

export const getStaticProps = async () => {
  const data = await client.get<GetContentListResponse>({ endpoint: "blogs" });

  return {
    props: {
      ...data,
    },
  };
};

export default Home;
