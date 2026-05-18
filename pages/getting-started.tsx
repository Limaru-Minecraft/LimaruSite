import Head from "@/components/Head";
import PageLayout from "@/components/PageLayout";
import SectionBox from "@/components/SectionBox";
import Heading from "@/components/LayoutComponents/Heading";
import ServerAddressButton from "@/components/LayoutComponents/ServerAddressButton";
import Image from "next/image";
import Link from "next/link";

const rulesDocumentUrl =
  "https://docs.google.com/document/d/e/2PACX-1vTLvBGG1T4y8w3ZaDb_V4qVkOxtJ3Vk9iQmpXbSS_yN9JnePcrdTohmYPpfjDTUs8wVvSnGP6ABCb2r/pub";

const joinSteps = [
  {
    title: "Open Minecraft",
    description: "Launch Minecraft and go to the multiplayer server list.",
  },
  {
    title: "Add Limaru",
    description:
      "Click the Add Server button and paste in play.limaru.net in the server address. You can name the server Limaru so it is easy to find later. Enabling server resource packs is highly recommended for the best experience!",
  },
  {
    title: "Join the Server",
    description: "Select Limaru and click Join Server.",
  },
];

const recommendedMods = {
  Optimisation: [
    {
      name: "Dynamic FPS",
      description:
        "Reduces resource usage when Minecraft is in the background.",
      href: "https://modrinth.com/mod/dynamic-fps",
      icon: "/mod-icons/dynamic-fps.webp",
    },
    {
      name: "Entity Culling",
      description:
        "Skips rendering entities that are not visible, which can improve performance.",
      href: "https://modrinth.com/mod/entityculling",
      icon: "/mod-icons/entity-culling.webp",
    },
    {
      name: "Lithium",
      description:
        "Improves game logic performance while keeping gameplay behaviour consistent.",
      href: "https://modrinth.com/mod/lithium",
      icon: "/mod-icons/lithium.webp",
    },
    {
      name: "Sodium",
      description:
        "Improves rendering performance and pairs well with shader setups.",
      href: "https://modrinth.com/mod/sodium",
      icon: "/mod-icons/sodium.webp",
    },
  ],
  "Quality of Life": [
    {
      name: "Continuity",
      description: "Adds connected textures for supported resource packs.",
      href: "https://modrinth.com/mod/continuity",
      icon: "/mod-icons/continuity.webp",
    },
    {
      name: "Distant Horizons",
      description:
        "Adds very far terrain views without needing normal render distance to be set as high.",
      href: "https://modrinth.com/mod/distanthorizons",
      icon: "/mod-icons/distant-horizons.webp",
    },
    {
      name: "LambDynamicLights",
      description:
        "Adds dynamic lighting from held items and nearby light sources.",
      href: "https://modrinth.com/mod/lambdynamiclights",
      icon: "/mod-icons/lambdynamiclights.webp",
    },
    {
      name: "Sound Physics Remastered",
      description:
        "Improves how sounds behave around blocks, spaces, and distance.",
      href: "https://modrinth.com/mod/sound-physics-remastered",
      icon: "/mod-icons/sound-physics-remastered.webp",
    },
    {
      name: "Zoomify",
      description: "Adds a configurable zoom feature for looking at details.",
      href: "https://modrinth.com/mod/zoomify",
      icon: "/mod-icons/zoomify.webp",
    },
  ],
};

export default function GettingStarted() {
  return (
    <>
      <Head
        title="Getting Started | Limaru"
        description="Learn how to join Limaru and get oriented in the Minecraft server."
        author="YJJcoolcool"
        keywords="limaru, limaru minecraft server, getting started, join limaru"
        path="/getting-started/"
      />
      <PageLayout title="Getting Started">
        <SectionBox>
          <div className="rounded-md border border-lime-800 bg-lime-700 p-6 text-white shadow-md md:p-8">
            <Heading level={2}>Join Limaru in Minecraft</Heading>
            <div className="mt-4">
              <ServerAddressButton />
            </div>
          </div>
        </SectionBox>

        <SectionBox>
          <div className="grid gap-6 md:grid-cols-3">
            {joinSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-md border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-yellow-100 font-bold text-yellow-900">
                  {index + 1}
                </div>
                <Heading level={3}>{step.title}</Heading>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </SectionBox>

        <SectionBox>
          <details className="group rounded-md border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-nunito-sans text-2xl font-extrabold text-gray-950">
              Recommended Mods (Optional)
              <span className="material-symbols-rounded transition group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <p className="mt-4 text-lg text-gray-700">
              These mods can make gameplay smoother and add useful features, but
              they are not required to play on Limaru. We recommend using the{" "}
              <Link
                href="https://modrinth.com/app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-lime-800 underline decoration-yellow-400 decoration-2 underline-offset-4 hover:text-lime-950"
              >
                Modrinth app
              </Link>{" "}
              because it makes installing and managing mods easier.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {Object.entries(recommendedMods).map(([category, mods]) => (
                <div key={category}>
                  <Heading level={3}>{category}</Heading>
                  <ul className="space-y-3">
                    {mods.map((mod) => (
                      <li
                        key={mod.name}
                        className="rounded-md border border-gray-200 bg-gray-50 p-4"
                      >
                        <Link
                          href={mod.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid gap-4 sm:grid-cols-[2.5rem_1fr] sm:items-start"
                        >
                          <Image
                            src={mod.icon}
                            alt=""
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-md"
                          />
                          <span>
                            <span className="flex items-center gap-2 font-bold text-gray-950">
                              {mod.name}
                              <span className="material-symbols-rounded text-sm text-gray-600">
                                open_in_new
                              </span>
                            </span>
                            <span className="block text-gray-700">
                              {mod.description}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </SectionBox>

        <SectionBox>
          <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <Heading level={2}>Check out the Visitor Centre</Heading>
            <p className="text-lg text-gray-700">
              When you first join Limaru, you will spawn inside a plane. Exit
              the plane and enter the visitor centre, where you can get an
              introduction to Limaru before heading out into the world.
            </p>
          </div>
        </SectionBox>

        <SectionBox>
          <div className="grid gap-6 rounded-md border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <Heading level={2}>Read the Rules</Heading>
              <p className="text-lg text-gray-700">
                Before interacting with the community, familiarise yourself with
                Limaru&apos;s 10 major rules. They cover the basic expectations
                for respecting other players, builds, and the server.
              </p>
            </div>
            <Link
              href={rulesDocumentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-lime-700 px-4 py-2 text-center font-bold text-white hover:bg-lime-800 sm:w-auto"
            >
              Rules Document
              <span className="material-symbols-rounded text-base">
                open_in_new
              </span>
            </Link>
          </div>
        </SectionBox>

        <SectionBox>
          <div className="grid gap-6 rounded-md border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <Heading level={2}>Join the Discord</Heading>
              <p className="text-lg text-gray-700">
                Limaru&apos;s Discord is used for announcements and updates,
                chatting with other players, planning builds and community
                projects, and the #helpop system where players can get help
                from staff.
              </p>
            </div>
            <Link
              href="https://discord.limaru.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-center font-bold text-white hover:bg-indigo-700 sm:w-auto"
            >
              Join Discord
              <i className="fa-brands fa-discord" aria-hidden="true" />
            </Link>
          </div>
        </SectionBox>

        <SectionBox>
          <div className="grid gap-6 rounded-md border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <Heading level={2}>Explore the Map</Heading>
              <p className="text-lg text-gray-700">
                Use BlueMap to view Limaru from above, find towns and cities,
                understand where places are, and plan where you want to visit
                next.
              </p>
            </div>
            <Link
              href="https://bluemap.limaru.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-lime-700 px-4 py-2 text-center font-bold text-white hover:bg-lime-800 sm:w-auto"
            >
              Open BlueMap
              <i className="fa-solid fa-map-location-dot" aria-hidden="true" />
            </Link>
          </div>
        </SectionBox>

        <SectionBox>
          <div className="grid gap-6 rounded-md border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <Heading level={2}>Ready To Join Our Building Community?</Heading>
              <p className="text-lg text-gray-700">
                Learn about the ranks available in Limaru, what each rank lets
                you do, and how to apply when you are ready to take part in
                building projects.
              </p>
            </div>
            <Link
              href="https://wiki.limaru.net/wiki/Ranks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-lime-700 px-4 py-2 text-center font-bold text-white hover:bg-lime-800 sm:w-auto"
            >
              View Ranks
              <span className="material-symbols-rounded text-base">
                open_in_new
              </span>
            </Link>
          </div>
        </SectionBox>

        <SectionBox>
          <div className="rounded-md border border-lime-800 bg-lime-700 p-6 text-white shadow-md md:p-8">
            <Heading level={2}>We&apos;ll See You In Limaru!</Heading>
            <p className="text-lg text-lime-50">
              We can&apos;t wait for you to be part of our community. We&apos;ll
              see you in Limaru!
            </p>
          </div>
        </SectionBox>

      </PageLayout>
    </>
  );
}
