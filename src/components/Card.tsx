export interface Props {
  href?: string;
  author?: string;
  tags: string[];
  frontmatter: {
    title: string;
    pubDatetime: Date;
    modDatetime: Date;
    description: string;
    author?: string;
  };
  image?: {
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  };
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, tags, image, secHeading = true }: Props) {
  const { title, pubDatetime, description } = frontmatter;

  return (
    <li className="mb-8 w-full md:w-1/2 lg:w-1/3 px-4">
      <article className="bg-gradient-to-br from-white to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
        <a href={href} className="block group">
          {image?.url && (
            <div className="relative aspect-video overflow-hidden">
              <img
                src={image?.url}
                alt={image?.alternativeText || title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                width={image?.width}
                height={image?.height}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
          <div className="p-6">
            {secHeading ? (
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-500 transition-colors">
                {title}
              </h3>
            ) : (
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-500 transition-colors">
                {title}
              </h3>
            )}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-medium bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300 rounded-full">
                {new Date(pubDatetime).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
              {description}
            </p>
            <div className="flex items-center text-accent-500 dark:text-accent-400 font-medium">
              Read more
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 7l5 5-5 5" />
              </svg>
            </div>
            <ul>
              {
                tags?.map((tag: string, index: number) => (

                  <li
                    className={`inline-block  my-1 underline-offset-4"`}
                  >
                    <a
                      href={`/tags/${tag?.toLowerCase()}/`}
                      className=" text-md pr-2 group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.018 3.815 15.232 8h-4.966l.716-3.815-1.964-.37L8.232 8H4v2h3.857l-.751 4H3v2h3.731l-.714 3.805 1.965.369L8.766 16h4.966l-.714 3.805 1.965.369.783-4.174H20v-2h-3.859l.751-4H21V8h-3.733l.716-3.815-1.965-.37zM14.106 14H9.141l.751-4h4.966l-.752 4z"
                        >
                        </path>
                      </svg>
                      &nbsp;<span>{tag}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </a>
      </article>
    </li>
  );
}
