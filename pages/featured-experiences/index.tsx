import Head from "@/components/Head";
import PageLayout from "@/components/PageLayout";
import SectionBox from "@/components/SectionBox";
import Heading from "@/components/LayoutComponents/Heading";
import {
  getAllFeaturedExperiences,
  type FeaturedExperienceMeta,
} from "@/lib/featuredExperiences";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

type FeaturedExperiencesProps = {
  experiences: FeaturedExperienceMeta[];
};

export const getStaticProps: GetStaticProps<FeaturedExperiencesProps> = async () => {
  return {
    props: {
      experiences: getAllFeaturedExperiences(),
    },
  };
};

export default function FeaturedExperiences({
  experiences,
}: FeaturedExperiencesProps) {
  return (
    <>
      <Head
        title="Featured Experiences | Limaru"
        description="Featured places and activities to try in Limaru."
        author="YJJcoolcool"
        keywords="limaru, featured experiences, minecraft city server"
        path="/featured-experiences/"
        image="/sun_moon_lake.webp"
        imageAlt="Sun Moon Lake in Limaru"
      />
      <PageLayout title="Featured Experiences">
        <SectionBox>
          <p className="text-lg text-gray-700">
            A few starting points for exploring Limaru.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {experiences.map((experience) => (
              <Link
                key={experience.slug}
                href={`/featured-experiences/${experience.slug}`}
                className="group overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md"
              >
                <Image
                  className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
                  src={experience.image}
                  width={800}
                  height={520}
                  alt=""
                />
                <div className="p-5">
                  <Heading level={2}>{experience.title}</Heading>
                  <p className="text-gray-700">{experience.description}</p>
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
                </div>
              </Link>
            ))}
          </div>
        </SectionBox>
      </PageLayout>
    </>
  );
}
