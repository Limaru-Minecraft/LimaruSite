import Head from '@/components/Head'
import PageLayout from '@/components/PageLayout'
import SectionBox from '@/components/SectionBox'
import CardGridBackground from '@/components/LayoutComponents/CardGridBackground'
import CollapsibleItemList from '@/components/LayoutComponents/CollapsibleItemList'
import Heading from '@/components/LayoutComponents/Heading'
import UnderConstruction from '@/components/LayoutComponents/UnderConstruction'

export default function Home() {
  return (
    <>
      <Head
        title="See & Do | Limaru"
        description="You can help support us by contributing in multiple ways, such as voting for us on server lists or donating!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server, sights limaru, limaru sights"
      />
      <PageLayout title='See & Do'>
        <SectionBox>
          <UnderConstruction type="page"/>
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Top Sights in Limaru</Heading>
          <p>Don't know where to go in Limaru? Here's some of our top picks to get you started!</p>
          <CollapsibleItemList
            items={[
              {
                title: 'Sun Moon Lake',
                url: '/places/sun-moon-lake'
              },
              {
                title: 'Seven Sisters Fire Station',
                image: 'fire_department_downtown.webp',
                url: '/places/downtown-fire-department'
              },
              {
                title: 'Lake District',
                image: 'lake_district.webp',
                url: '/places/lake-district'
              },
              {
                title: 'YJJ City Mountain Trail',
                image: 'mountain_trail_yjjcity.webp',
                url: '/places/yjj-city-mountain-trail'
              },
            ]}
          />
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Applying for Ranks</Heading>
          <p>Most ranks are pretty straightforward: confirm that you have the prerequisites, fill up the application form, ping the owners on Discord and wait. Ranks in Limaru require that you are of a single rank lower than the rank you are applying for, otherwise the application is rejected unless there is a special reason to do otherwise.</p>
          <Heading level={3}>Common ranks</Heading>
          <Heading level={4}>Tourist</Heading>
          <p>Upon joining the server, all new players will be ranked Tourist. The Tourist rank allows players to explore the entire server, ride trains, and buy goods. However, players of this rank cannot purchase land, nor can they earn an income other than the hourly TimeIsMoney payouts.</p>
          <p>Prerequisites: None</p>
          <p>Added permissions from previous rank: None</p>
          <Heading level={4}>Resident</Heading>
          <p>The Resident rank allows players to better interact with the world: residents can buy and sell goods, purchase pre-built houses, and buy vehicles. They can also earn money in other ways, like doing jobs and starting a company.</p>
          <p>Prerequisites: Be of the Tourist rank and complete the Resident Test at spawn.</p>
          <p>Added permissions from previous rank:</p>
          <ul>
            <li>Ability to sell goods</li>
            <li>Ability to start companies</li>
            <li>Ability to buy/sell houses and vehicles</li>
          </ul>
          <Heading level={4}>Citizen</Heading>
          <p>Citizens make up Limaru's main building force, and the main bulk of the playerbase. This rank allows players to purchase plots and build on them, unleashing more creativity into the world</p>
          <p>Prerequisites: Be of the Resident rank and get your application approved.</p>
          <p>Added permissions from previous rank:</p>
          <ul>
            <li>Ability to buy plots to build</li>
          </ul>
          <Heading level={3}>Building ranks</Heading>
          <Heading level={4}>Architect</Heading>
          <p>Architects are expected to maintain high build quality and are the ones who build the best sights on the server. Upon receiving the rank, players will be part of the Architect Committee which has the power to remove abandoned buildings.</p>
          <p>Prerequisites: Be of the Citizen rank, have good building skill, and get your application approved.</p>
          <p>Added permissions from previous rank:</p>
          <ul>
            <li>Ability to build anywhere</li>
            <li>Right to remove builds deemed abandoned</li>
          </ul>
          <Heading level={4}>Engineer</Heading>
          <p>A special variant of the Architect rank, Engineers specialise in redstone, TrainCarts signs, commands, code, and anything of the logical world. </p>
          <p>Prerequisites: Be of the Citizen rank, have good math, coding, or redstoning skill, and get your application approved.</p>
          <p>Added permissions from previous rank:</p>
          <ul>
            <li>Ability to build anywhere</li>
            <li>Right to remove builds deemed abandoned</li>
          </ul>
          <Heading level={3}>Staff ranks</Heading>
          <Heading level={4}>Helper</Heading>
          <p>A junior staff rank, Helpers are expected to show a high level of professionalism and leadership. In return, they are granted moderation powers to keep the server civil. In other words, the police of the server.</p>
          <p>Prerequisites: Be of the Citizen rank, and get your application approved.</p>
          <p>Added permissions from previous rank:</p>
          <ul>
            <li>Some moderation powers</li>
          </ul>
          <Heading level={4}>Moderator</Heading>
          <p>A senior staff rank, Moderators keep the server in check and help to guide certain high staff decisions. They have more powers than Helpers, and have the responsibility to investigate incidents when they happen.</p>
          <p>Prerequisites: Be of the Helper rank and be nominated.</p>
          <p>Added permissions from previous rank:</p>
          <ul>
            <li>More moderation powers</li>
            <li>Right to remove builds</li>
          </ul>
          <Heading level={3}>Executive ranks</Heading>
          <Heading level={4}>Veteran</Heading>
          <p>The highest rank attainable in Limaru for most players. While all permissions are granted, Veterans still do not have absolute say over what happens on the server: local governments have the final say as to what happens on their land most of the time.</p>
          <p>Prerequisites: Have either an Architect or Engineer rank, a Moderator rank, and be nominated.</p>
          <p>Added permissions from previous rank:</p>
          <ul>
            <li>Operator status</li>
          </ul>
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Jobs</Heading>
          <p>Feel like doing something interactive? Try out the many jobs that Limaru has to offer!</p>
          <CollapsibleItemList
            items={[
              {
                title: 'Cake Baking',
                description: 'Bake cakes!'
              },
              {
                title: 'Log processor',
                description: 'Process logs'
              },
              {
                title: 'Ore processor',
                description: 'idk'
              },
              {
                title: 'Train operator',
                description: 'Drive trains'
              },
            ]}
          />
        </SectionBox>
        
      </PageLayout>
    </>
  )
}
