import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '../lib/cmsClient'
import styles from '../styles/Home.module.css'
import { GetContentListResponse } from '../types'



const Home: NextPage<GetContentListResponse> = ({ contents }) => {
  return(
    <div>
      {contents.map(content=> (
          <div className="m-5 max-w-sm rounded overflow-hidden shadow-lg" key={`${content.id}`}>
            <Link href={`/blogs/${content.id}`}>
              <a>
                <img className="w-full" src={`${content.eyecatch.url}`} alt="blog article eyecache image"/>
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-base">
                    { content.title }
                  </p>
                </div>
              </a>
            </Link>
            <div className="px-6 pt-4 pb-2">
              <Link href="#">
                <a>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{content.category.name}</span>
                </a>
              </Link>
            </div>
          </div>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const data = await client.get<GetContentListResponse>({endpoint: "blogs"});

  return {
    props: {
      ...data
    }
  }
}

export default Home

