import Head from '@/components/Head'
import PageLayout from '@/components/PageLayout'
import SectionBox from '@/components/SectionBox'
import CardGrid from '@/components/LayoutComponents/CardGrid'
import Heading from '@/components/LayoutComponents/Heading'
import { vote_links, donate_links } from '@/constants/links';

export default function Home() {
  return (
    <>
      <Head
        title="Support Us | Limaru"
        description="You can help support us by contributing in multiple ways, such as voting for us on server lists or donating!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server, donate limaru, limaru donation"
      />
      <PageLayout title='Support Us'>
        <SectionBox>
          <Heading level={2}>Vote for Limaru</Heading>
          <p>Vote for us on online Minecraft server lists to allow more people to discover our community! As a bonus, you'll get £10 of in-game currency for each vote!</p>
          <CardGrid items={vote_links} />
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Donate</Heading>
          <p>To help us keep the server running, consider donating to us if you have the means to do so! Please note that to maintain fairness for others who cannot contribute monetarily, there will be <b>no perks</b> for Donators, other than the Donator decorative role.</p>
          <p>You may donate to either channels. All funds go directly towards paying for the server.</p>
          <CardGrid items={donate_links} />
        </SectionBox>
      </PageLayout>
    </>
  )
}
