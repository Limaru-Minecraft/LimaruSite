import Head from '@/components/Head'
import PageLayout from '@/components/PageLayout'
import SectionBox from '@/components/SectionBox'
import Heading from '@/components/LayoutComponents/Heading'
import UnderConstruction from '@/components/LayoutComponents/UnderConstruction'
import DynamicForm from '@/components/DynamicForm'

export default function Home() {

  return (
    <>
      <Head
        title="Iciwi Maker | Limaru"
        description="Create your own fares.yml!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server"
      />
      <PageLayout title='Iciwi Maker'>
        <SectionBox>
          <Heading level={2}>Iciwi Maker</Heading>
          <DynamicForm></DynamicForm>
        </SectionBox>
      </PageLayout>
    </>
  )
}
