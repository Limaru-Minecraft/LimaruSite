import Head from '@/components/Head'
import PageLayout from '@/components/PageLayout'
import SectionBox from '@/components/SectionBox'
import CardGridBackground from '@/components/LayoutComponents/CardGridBackground'
import Heading from '@/components/LayoutComponents/Heading'
import UnderConstruction from '@/components/LayoutComponents/UnderConstruction'

export default function Home() {
  return (
    <>
      <Head
        title="About | Limaru"
        description="You can help support us by contributing in multiple ways, such as voting for us on server lists or donating!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server, donate limaru, limaru donation"
      />
      <PageLayout title='About'>
        <SectionBox>
          <UnderConstruction type="page"/>
        </SectionBox>
        <SectionBox>
          <Heading level={2}>What is Limaru?</Heading>
          <p>Limaru is a Minecraft community formed of people who enjoy city-building and transportation.</p>
          <p>We envision a community that always strives to innovate by creating new inventions, machines, and functionality within the possibilities of Minecraft, and a community that welcomes all people, regardless of their building ability. This is represented in our core values and motto - Innovate, Create, and Experience.</p>
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Our People</Heading>
          <Heading level={3}>Server Owners</Heading>
          <p>
            Also known as the Leaders/Founders, we are the people who formed Limaru and manage the server!
          </p>
          <CardGridBackground
            items={[
              {
                title: 'YJJcoolcool',
                image: 'avatars/YJJcoolcool.webp',
              },
              {
                title: 'Mineshafter61',
                image: 'avatars/Mineshafter61.webp',
              },
              {
                title: 'panas_d',
                image: 'avatars/panas_d.webp',
              },
            ]}
          />
          <Heading level={3}>Veterans</Heading>
          <p>
            We are long-term community members who have had significant contributions to the server. We are in charge of moderating and managing the server alongside the Owners!
          </p>
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Countries & Regions of Limaru</Heading>
          <p>Limaru is a large server with an expansive map. To help with navigation, it is good to know the general areas of the server.</p>
          <Heading level={3}>YJJ City</Heading>
          <p>
            This is where you spawn in when you first join the server. YJJ City is a large circular island located on the west side of the world.
          </p>
          <Heading level={3}>Mainland Limaru</Heading>
          <p>
            Sometimes just called Limaru, it is the largest landmass in the server and spans the north and east sides of the world.
          </p>
          <Heading level={3}>Losning</Heading>
          <p>
            A small island located south of YJJ City.
          </p>
        </SectionBox>
      </PageLayout>
    </>
  )
}
