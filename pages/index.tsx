import Head from '@/components/Head'
import Layout from '@/components/Layout'
import Tabs from '@/components/Tabs'
import Image from 'next/image';

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

export default function Home() {
  return (
    <>
      <Head
        title="Limaru - Innovate, Create, Experience."
        description="Welcome to Limaru, a Minecraft City-Building and Transportation Community. Join our community that fosters creativity and innovation!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server" />
      <Layout>
        <Tabs tabs={tabs} />
        <br></br>
      </Layout>
    </>
  )
}
