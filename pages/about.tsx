import Head from "@/components/Head";
import PageLayout from "@/components/PageLayout";
import SectionBox from "@/components/SectionBox";
import CardGridBackground from "@/components/LayoutComponents/CardGridBackground";
import Heading from "@/components/LayoutComponents/Heading";
import UnderConstruction from "@/components/LayoutComponents/UnderConstruction";

export default function Home() {
  return (
    <>
      <Head
        title="About | Limaru"
        description="You can help support us by contributing in multiple ways, such as voting for us on server lists or donating!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server, donate limaru, limaru donation"
      />
      <PageLayout title="About">
        <SectionBox>
          <UnderConstruction type="page" />
        </SectionBox>
        <SectionBox>
          <Heading level={2}>What is Limaru?</Heading>
          <p>
            Limaru is a Minecraft community of people who enjoy City-Building
            and Transportation.
          </p>
          <p>
            Limaru is a server with a simple concept - a space for people to
            build and explore cities and places. From its early days as a
            single-player world made by and shared with friends who loved the
            creative aspect of Minecraft, Limaru has since grown into a
            full-fledged public Minecraft server accessible to anyone worldwide.
            Many people have visited and seen our creations, some admiring them
            and even wanting to add their own builds to the world. And so, we
            opened it to the world and invited players to create with us. From
            there, Limaru has expanded beyond just being a place to build, to a
            space for people around the world to showcase and preserve their
            culture through architecture.
          </p>
          <p>
            We envision a community that always strives to innovate by creating
            new inventions, machines, and functionality within the possibilities
            of Minecraft, and a community that welcomes all people, regardless
            of their building ability. This is represented in our core values
            and motto - <b>Innovate, Create, and Experience</b>.
          </p>
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Our People</Heading>
          <Heading level={3}>Server Owners</Heading>
          <p>
            Also known as the Leaders/Founders, we are the people who formed
            Limaru and manage the server!
          </p>
          <CardGridBackground
            items={[
              {
                title: "YJJcoolcool",
                image: "avatars/YJJcoolcool.webp",
              },
              {
                title: "Mineshafter61",
                image: "avatars/Mineshafter61.webp",
              },
              {
                title: "panas_d",
                image: "avatars/panas_d.webp",
              },
            ]}
          />
          <Heading level={3}>Veterans</Heading>
          <p>
            Veterans are long-term community members who have had significant
            contributions to the server. They are often referred to (along with
            the Owners) as the <b>Server Staff</b>, and are in charge of
            moderating and managing the server alongside the Owners!
          </p>
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Regions of Limaru</Heading>
          <p>
            Limaru is a large server with an expansive map. It is good to know
            the general areas of the server to help with navigation.
          </p>
          <Heading level={3}>Mainland Limaru</Heading>
          <p>
            Often just referred to as &quot;Limaru&quot;, it refers to the
            largest landmass covering the East side of the map. Because it is so
            big, people usually direct to the respective city within Mainland
            Limaru. Some of the major cities in the mainland include{" "}
            <b>
              Mizuno, Lipan, Downtown, Pelle, Parkston, New Traxia, and Kingston
            </b>
            .
          </p>
          <Heading level={3}>YJJ City</Heading>
          <p>
            Located to the West of the map, YJJ City is a large circular island
            owned by YJJcoolcool. With the island being recently regenerated in
            October 2024, development is still picking up on the island.
          </p>
          <Heading level={3}>Losning</Heading>
          <p>
            Although being a considerably small island compared to neighbouring
            YJJ City and Enshima, Losning is a dense city filled with
            skyscrapers. It is located to the South-West of the map and is owned
            by Solutional.
          </p>
          <Heading level={3}>Other Regions</Heading>
          <p>
            Apart from the above regions, there are other (mostly) islands that
            have little development and consist of mostly natural landscapes.
            These include{" "}
            <b>New Kearny, Mitten Island, Enshima, and Lexington</b>.
          </p>
          <Heading level={3}>View the Regions on BlueMap below!</Heading>
          <CardGridBackground
            items={[
              {
                title: "Mainland Limaru",
                image: "fire_department_downtown.webp",
                url: "https://bluemap.limaru.net/#world:-4715:0:6155:1000:0:0:0:1:flat",
              },
              {
                title: "YJJ City",
                image: "sun_moon_lake.webp",
                url: "https://bluemap.limaru.net/#world:-8008:0:6606:2000:0:0:0:1:flat",
              },
              {
                title: "Losning",
                image: "",
                url: "https://bluemap.limaru.net/#world:-7148:0:8526:500:0:0:0:1:flat",
              },
            ]}
          />
        </SectionBox>
      </PageLayout>
    </>
  );
}
