import Head from '@/components/Head'
import PageLayout from '@/components/PageLayout'
import SectionBox from '@/components/SectionBox'
import CollapsibleItemList from '@/components/LayoutComponents/CollapsibleItemList'
import Heading from '@/components/LayoutComponents/Heading'
import UnderConstruction from '@/components/LayoutComponents/UnderConstruction'

import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

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
          <p>Don&apos;t know where to go in Limaru? Here&apos;s some of our top picks to get you started!</p>
          <CollapsibleItemList
            items={[
              {
                title: 'Sun Moon Lake',
                image: 'sun_moon_lake.webp',
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
          <Heading level={2}>Jobs</Heading>
          <p>Feel like doing something interactive? Try out the many jobs that Limaru has to offer!</p>
          <div className="text-center w-full bg-transparent border rounded-md border-1 border-gray-300">
            {isLoading && <p className='my-16'>Loading Jobs...</p>}
            <iframe
              className={`airtable-embed border rounded-md ${isLoading ? "hidden" : ""}`}
              src="https://airtable.com/embed/shrWCiVeuJHRG5Hkx?backgroundColor=blue&viewControls=on"
              width="100%"
              height="600"
              onLoad={handleIframeLoad}
            />
          </div>
        </SectionBox>
      </PageLayout>
    </>
  )
}
