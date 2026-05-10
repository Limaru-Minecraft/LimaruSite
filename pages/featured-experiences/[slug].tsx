import Head from "@/components/Head";
import PageLayout from "@/components/PageLayout";
import SectionBox from "@/components/SectionBox";
import Heading from "@/components/LayoutComponents/Heading";
import {
  getFeaturedExperienceBySlug,
  getFeaturedExperienceSlugs,
  type FeaturedExperience,
} from "@/lib/featuredExperiences";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type FeaturedExperiencePageProps = {
  experience: FeaturedExperience;
};

type FeaturedExperienceParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<FeaturedExperienceParams> = async () => {
  return {
    paths: getFeaturedExperienceSlugs().map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  FeaturedExperiencePageProps,
  FeaturedExperienceParams
> = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }

  return {
    props: {
      experience: getFeaturedExperienceBySlug(params.slug),
    },
  };
};

export default function FeaturedExperiencePage({
  experience,
}: FeaturedExperiencePageProps) {
  return (
    <>
      <Head
        title={`${experience.title} | Featured Experiences | Limaru`}
        description={experience.description}
        author="YJJcoolcool"
        keywords={`limaru, featured experiences, ${experience.tags.join(", ")}`}
      />
      <PageLayout title={experience.title}>
        <SectionBox>
          <article className="mx-auto max-w-4xl">
            <Link
              href="/featured-experiences"
              className="mb-5 inline-flex items-center gap-2 font-bold text-lime-800 hover:text-lime-950"
            >
              <span className="material-symbols-rounded">arrow_back</span>
              Featured Experiences
            </Link>
            <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
              <Image
                className="h-80 w-full object-cover"
                src={experience.image}
                width={1200}
                height={720}
                alt=""
              />
              <div className="p-6 md:p-8">
                <Heading level={2}>{experience.title}</Heading>
                <p className="text-lg text-gray-700">
                  {experience.description}
                </p>
                {experience.tags.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-lime-100 px-2 py-1 text-sm font-bold text-lime-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="limaru-markdown mt-8">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target={href?.startsWith("http") ? "_blank" : undefined}
                          rel={
                            href?.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {children}
                        </a>
                      ),
                      img: ({ src = "", alt = "" }) => (
                        <Image
                          src={src}
                          alt={alt}
                          width={960}
                          height={540}
                          className="rounded-md"
                        />
                      ),
                    }}
                  >
                    {experience.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </article>
        </SectionBox>
      </PageLayout>
    </>
  );
}
