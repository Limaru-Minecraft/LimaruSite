import Head from "@/components/Head";
import PageLayout from "@/components/PageLayout";
import SectionBox from "@/components/SectionBox";
import Heading from "@/components/LayoutComponents/Heading";
import Image from "next/image";
import Link from "next/link";

const experiences = [
  {
    title: "Ride the Transit Network",
    description:
      "Plan a rail journey and use Limaru's transit systems to move between towns and cities.",
    image: "/c151_train_yjjcity.webp",
    href: "/transportation",
  },
  {
    title: "Visit Sun Moon Lake",
    description:
      "Explore a scenic destination and see a quieter side of Limaru's world.",
    image: "/sun_moon_lake.webp",
    href: "/see-and-do",
  },
  {
    title: "Explore Lake District",
    description:
      "Walk through a developed urban area shaped by years of modern builds.",
    image: "/lake_district.webp",
    href: "/see-and-do",
  },
  {
    title: "Follow the Mountain Trail",
    description:
      "Take a nature-focused route through terrain, viewpoints, and open landscapes.",
    image: "/mountain_trail_yjjcity.webp",
    href: "/see-and-do",
  },
];

export default function FeaturedExperiences() {
  return (
    <>
      <Head
        title="Featured Experiences | Limaru"
        description="Featured places and activities to try in Limaru."
        author="YJJcoolcool"
        keywords="limaru, featured experiences, minecraft city server"
      />
      <PageLayout title="Featured Experiences">
        <SectionBox>
          <p className="text-lg text-gray-700">
            A few starting points for exploring Limaru.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {experiences.map((experience) => (
              <Link
                key={experience.title}
                href={experience.href}
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
                </div>
              </Link>
            ))}
          </div>
        </SectionBox>
      </PageLayout>
    </>
  );
}
