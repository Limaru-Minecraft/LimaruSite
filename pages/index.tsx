import Head from '@/components/Head'
import HomeLayout from '@/components/HomeLayout'
import SectionBox from '@/components/SectionBox'
import Tabs from '@/components/LayoutComponents/Tabs'
import CardGridBackground from '@/components/LayoutComponents/CardGridBackground'
import CardGrid from '@/components/LayoutComponents/CardGrid'
import Heading from '@/components/LayoutComponents/Heading'
import Image from 'next/image';
import UnderConstruction from '@/components/LayoutComponents/UnderConstruction'

const tabs = [
  {
    title: "Innovate",
    content: <>
      <p>Here in Limaru, we’re always trying out new things and exploring new ideas - whether it be new building techniques, new plugins, or new server events.</p>
      <br/>
      <p>In the image is our National Day Parade back in 2021, where we arranged a whole show with a parachute jump, a military parade, and floats designed by our community!</p>
    </>,
    image: <Image src="https://via.placeholder.com/150" alt="Tab 1" />,
  },
  {
    title: "Create",
    content: <>
      <p>Limaru is a place for everyone to express their Creativity. Regardless of experience, our community is here to help you build your dream city together!</p>
      <br/>
      <p>In the image is Lake District in Mainland Limaru. Over the years, it has transformed into an area filled with modern architecture!</p>
    </>,
    image: <Image src="https://via.placeholder.com/150" alt="Tab 2" />,
  },
  {
    title: "Experience",
    content: <>
      <p>What’s a city without the interaction? Limaru is filled with things to interact with - whether you would like to ride a train, visit an amusement park, or work at a glass factory, we’ve got you covered!</p>
      <br/>
      <p>In the image is the Glass Factory in Mainland Limaru. You can help out at the factory by converting sand into glass and earn some money!</p>
    </>,
    image: <Image src="https://via.placeholder.com/150" alt="Tab 3" />,
  },
];

//A

export default function Home() {
  return (
    <>
      <Head
        title="Limaru - Innovate, Create, Experience."
        description="Welcome to Limaru, a Minecraft City-Building and Transportation Community. Join our community that fosters creativity and innovation!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server"
      />
      <HomeLayout>
        <SectionBox>
          <Heading level={2}>Explore Limaru</Heading>
          <CardGridBackground
            items={[
              {
                url: '/see-and-do',
                title: 'Go on a Nature Appreciation Journey',
                image: 'mountain_trail_yjjcity.png',
              },
              {
                url: '/see-and-do',
                title: 'Architectural Finds in Limaru',
                image: 'fire_department_downtown.png',
              },
              {
                url: '/see-and-do',
                title: 'Ride Our Extensive Train Network',
                image: 'c151_train_yjjcity.png',
              },
            ]}
          />
          <UnderConstruction type="section"/>
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Our Motto – Innovate, Create, Experience.</Heading>
          <Tabs tabs={tabs} italic={true} large={true} />
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Quick Links</Heading>
          <CardGrid
            items={[
              {
                url: 'https://discord.limaru.net/',
                title: 'Discord',
                subtitle: 'Join our Discord server to get the latest updates and interact with our community!',
                newtab: true,
              },
              {
                url: 'https://youtube.com/LiMARU',
                title: 'Limaru YouTube Channel',
                subtitle: 'Featuring server events, builds, and more!',
                newtab: true,
              },
              {
                url: 'https://youtube.com/YJJCityProject',
                title: 'YJJ City Project YouTube Channel',
                subtitle: 'Featuring creative works made in Minecraft',
                newtab: true,
              },
            ]}
          />
        </SectionBox>
      </HomeLayout>
    </>
  )
}
