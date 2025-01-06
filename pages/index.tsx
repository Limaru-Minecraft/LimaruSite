import Head from '@/components/Head'
import HomeLayout from '@/components/HomeLayout'
import SectionBox from '@/components/SectionBox'
import Tabs from '@/components/LayoutComponents/Tabs'
import CardGridBackground from '@/components/LayoutComponents/CardGridBackground'
import CardGrid from '@/components/LayoutComponents/CardGrid'
import Heading from '@/components/LayoutComponents/Heading'
import UnderConstruction from '@/components/LayoutComponents/UnderConstruction'
import { quick_links } from '@/constants/links';

export default function Home() {
  return (
    <>
      <Head
        title="Limaru Minecraft Server - Innovate, Create, Experience."
        description="Welcome to Limaru, a Minecraft City-Building and Transportation Community. Come explore our server today!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server"
      />
      <HomeLayout>
        <SectionBox>
          <Heading level={2}>Explore Limaru</Heading>
          <UnderConstruction type="section"/>
          <CardGridBackground
            items={[
              {
                url: '/see-and-do',
                title: 'Go on a Nature Appreciation Journey',
                image: 'mountain_trail_yjjcity.webp',
              },
              {
                url: '/see-and-do',
                title: 'Architectural Finds in Limaru',
                image: 'fire_department_downtown.webp',
              },
              {
                url: '/see-and-do',
                title: 'Ride Our Extensive Train Network',
                image: 'c151_train_yjjcity.webp',
              },
            ]}
          />
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Our Motto – Innovate, Create, Experience.</Heading>
          <Tabs italic={true} large={true} tabs={[
            {
              title: "Innovate",
              content: <>
                <p>Here in Limaru, we’re always trying out new things and exploring new ideas - whether it be new building techniques, new plugins, or new server events.</p>
                <br/>
                <p>In the image is our National Day Parade back in 2021, where we arranged a whole show with a parachute jump, a military parade, and floats designed by our community!</p>
              </>,
              image: "/national_day_2021_fireworks.webp",
            },
            {
              title: "Create",
              content: <>
                <p>Limaru is a place for everyone to express their Creativity. Regardless of experience, our community is here to help you build your dream city together!</p>
                <br/>
                <p>In the image is Lake District in Mainland Limaru. Over the years, it has transformed into an area filled with modern architecture!</p>
              </>,
              image: "/lake_district.webp",
            },
            {
              title: "Experience",
              content: <>
                <p>What’s a city without the interaction? Limaru is filled with things to interact with - whether you would like to ride a train, visit an amusement park, or work at a glass factory, we’ve got you covered!</p>
                <br/>
                <p>In the image is the Glass Factory in Mainland Limaru. You can help out at the factory by converting sand into glass and earn some money!</p>
              </>,
              image: "/glass_factory.webp",
            },
          ]} />
        </SectionBox>
        <SectionBox>
          <Heading level={2}>A low level of entry for aspiring builders.</Heading>
          <p>Being a relatively small community, we are open to builders of any kind - from beginners to experienced builders. Our rank system is simple to understand and we actively work with each other to improve our building skills.</p>
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Quick Links</Heading>
          <CardGrid items={quick_links} />
        </SectionBox>
      </HomeLayout>
    </>
  )
}
