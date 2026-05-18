import Head from '@/components/Head'
import HomeLayout from '@/components/HomeLayout'
import SectionBox from '@/components/SectionBox'
import CardGrid from '@/components/LayoutComponents/CardGrid'
import Heading from '@/components/LayoutComponents/Heading'
import { quick_links } from '@/constants/links';
import { getAllFeaturedExperiences, type FeaturedExperienceMeta } from '@/lib/featuredExperiences';
import type { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

type HomeProps = {
  featuredExperiences: FeaturedExperienceMeta[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      featuredExperiences: getAllFeaturedExperiences().slice(0, 3),
    },
  };
};

function PlaceCard({ item }: { item: FeaturedExperienceMeta }) {
  return (
    <Link
      href={`/featured-experiences/${item.slug}`}
      className="group overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md"
    >
      <Image
        className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        src={item.image}
        width={640}
        height={420}
        alt=""
      />
      <div className="p-5">
        <Heading level={3}>{item.title}</Heading>
        <p className="text-gray-700">{item.description}</p>
      </div>
    </Link>
  );
}

export default function Home({ featuredExperiences }: HomeProps) {
  return (
    <>
      <Head
        title="Limaru Minecraft Server - Innovate, Create, Experience"
        description="Welcome to Limaru, a community of Minecraft players who like creative building and transportation. Come explore our server today!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server"
        path="/"
        image="/banners/Lands_End_Sunset.webp"
        imageAlt="Limaru Minecraft server landscape"
        includeSiteStructuredData
      />
      <HomeLayout>
        <SectionBox>
          <div className="grid overflow-hidden rounded-md border border-lime-800 bg-lime-700 text-white shadow-md lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="p-6 md:p-8">
              <p className="mb-3 font-nunito-sans text-sm font-extrabold uppercase tracking-wide text-yellow-200">
                Start Here
              </p>
              <Heading level={2}>New to Limaru?</Heading>
              <p className="max-w-3xl text-lg text-lime-50">
                Learn how to join the server in Minecraft, get introduced to
                the community, and find the first things worth checking out
                before you start building or exploring!
              </p>
            </div>
            <div className="px-6 pb-6 md:px-8 lg:p-8">
              <Link
                href="/getting-started"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-center font-bold text-gray-950 hover:bg-yellow-300 sm:w-auto"
              >
                Get Started
                <span className="material-symbols-rounded">arrow_forward</span>
              </Link>
            </div>
          </div>
        </SectionBox>

        <SectionBox>
          <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <Heading level={2}>Featured Experiences</Heading>
              <p className="text-lg text-gray-700">
                Not sure what to do? Try out our some of our curated
                experiences around Limaru!
              </p>
            </div>
            <Link
              href="/featured-experiences"
              className="inline-flex items-center gap-2 font-bold text-lime-800 hover:text-lime-950"
            >
              See more
              <span className="material-symbols-rounded">arrow_forward</span>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredExperiences.map((item) => (
              <PlaceCard key={item.title} item={item} />
            ))}
          </div>
        </SectionBox>

        <SectionBox>
          <div className="grid overflow-hidden rounded-md border border-gray-200 bg-slate-900 text-white shadow-md lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 md:p-8">
              <p className="mb-3 font-nunito-sans text-sm font-extrabold uppercase tracking-wide text-yellow-300">
                Transit Spotlight
              </p>
              <Heading level={2}>
                &quot;Have a <i>Rail</i> of a Time!&quot;
              </Heading>
              <p className="text-lg text-slate-100">
                Hop on our extensive transit network and take a journey to
                explore the various towns and cities of Limaru. Plan a route and
                check transit status in the Transportation page!
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/transportation"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-center font-bold text-gray-950 hover:bg-yellow-300 sm:w-auto"
                >
                  Transportation in Limaru
                  <span className="material-symbols-rounded">arrow_forward</span>
                </Link>
              </div>
            </div>
            <Image
              className="h-full min-h-72 w-full object-cover"
              src="/c151_train_yjjcity.webp"
              width={900}
              height={650}
              alt=""
            />
          </div>
        </SectionBox>

        <SectionBox>
          <div className="grid overflow-hidden rounded-md border border-gray-200 bg-white shadow-md lg:grid-cols-[0.9fr_1.1fr]">
            <Image
              className="h-full min-h-72 w-full object-cover"
              src="/fire_department_downtown.webp"
              width={900}
              height={650}
              alt=""
            />
            <div className="p-6 md:p-8">
              <p className="mb-3 font-nunito-sans text-sm font-extrabold uppercase tracking-wide text-lime-700">
                Build With Others
              </p>
              <Heading level={2}>Join a Project</Heading>
              <p className="text-lg text-gray-700">
                Limaru&apos;s towns and cities grow through collaboration. Find
                a project you&apos;re interested in through our #planning channel on
                Discord and start building!
              </p>
              <div className="mt-6 grid gap-4">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-lime-100 text-lime-800">
                    <i className="fa-solid fa-list-check" aria-hidden="true" />
                  </div>
                  <div>
                    <Heading level={3}>Find a project</Heading>
                    <p className="text-gray-700">
                      See which towns, districts, stations, and public spaces
                      need builders.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-lime-100 text-lime-800">
                    <i className="fa-solid fa-ruler-combined" aria-hidden="true" />
                  </div>
                  <div>
                    <Heading level={3}>Follow the local style</Heading>
                    <p className="text-gray-700">
                      Coordinate with the area&apos;s owners so new builds fit
                      the area they belong to.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-lime-100 text-lime-800">
                    <i className="fa-solid fa-people-group" aria-hidden="true" />
                  </div>
                  <div>
                    <Heading level={3}>Build together</Heading>
                    <p className="text-gray-700">
                      Turn plans into finished streets, landmarks, transport
                      links, and neighborhoods!
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="https://discord.com/channels/590800544214286347/1391994171908292669"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-lime-700 px-4 py-2 text-center font-bold text-white hover:bg-lime-800 sm:w-auto"
                >
                  Check out #planning
                  <i className="fa-brands fa-discord" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </SectionBox>

        <SectionBox>
          <div className="grid gap-6 rounded-md border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <Heading level={2}>History, Lore, and More...</Heading>
              <p className="text-lg text-gray-700">
                Explore the Limaru wiki containing information about places,
                people, and cultures and some lore behind them!
              </p>
            </div>
            <Link
              href="https://wiki.limaru.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-lime-700 px-4 py-2 text-center font-bold text-white hover:bg-lime-800 sm:w-auto"
            >
              Visit the Wiki
              <i className="fa-solid fa-book" aria-hidden="true" />
            </Link>
          </div>
        </SectionBox>

        <SectionBox>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Heading level={2}>Stay Connected</Heading>
              <p className="text-lg text-gray-700">
                Check out our socials, support the server, or jump straight to
                our Discord to start chatting!
              </p>
            </div>
            <CardGrid items={quick_links} columns="2" />
          </div>
        </SectionBox>
      </HomeLayout>
    </>
  )
}
