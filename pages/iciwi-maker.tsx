import Head from '@/components/Head'
import PageLayout from '@/components/PageLayout'
import SectionBox from '@/components/SectionBox'
import Heading from '@/components/LayoutComponents/Heading'
import UnderConstruction from '@/components/LayoutComponents/UnderConstruction'
import IciwiMakerForm from '@/components/IciwiMakerForm'

export default function Home() {

  const processTable = (routes: any, fares: any) => {
    console.log('Routes:', routes);
    console.log('Fares:', fares);
  }

  return (
    <>
      <Head
        title="Iciwi Maker | Limaru"
        description="Create your own fares.yml!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server"
      />
      <PageLayout title='Iciwi Maker'>
        <UnderConstruction type="page" />
        <SectionBox>
          <Heading level={2}>Create your own fares.yml here!</Heading>
          <IciwiMakerForm submitFunction={processTable}></IciwiMakerForm>
        </SectionBox>
      </PageLayout>
    </>
  )
}
