import Link from "next/link";

import Image from "next/image";
import { Content } from "../types";

const ContentCard = ({ content }: { content: Content }) => {
  const eyecatchImageUrl = content.eyecatch ? content.eyecatch.url : "/noimage.jpg";
  return (
    <div className="m-5 max-w-sm rounded overflow-hidden shadow-lg" key={`${content.id}`}>
      <Link href={`/blogs/${content.id}`}>
        <a>
          <Image
            className="w-full"
            src={eyecatchImageUrl}
            width="300"
            height="200"
            layout="responsive"
            alt="blog article eyecache image"
          />
          {/* <img className="w-full" src={eyecatchImageUrl} alt="blog article eyecache image" /> */}
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">{content.title}</p>
          </div>
        </a>
      </Link>

      <div className="px-6 pt-4 pb-2">
        <Link href={`/categories/${content.category.id}`}>
          <a>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{content.category.name}
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ContentCard;
