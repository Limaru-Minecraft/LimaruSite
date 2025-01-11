import Head from '@/components/Head'
import PageLayout from '@/components/PageLayout'
import SectionBox from '@/components/SectionBox'
import CurrentRoute from '@/components/TransportationComponents/route'
import TripPlanner from '@/components/TransportationComponents/pathfinder'

export default function Home() {
    return (
        <>
            <Head
                title="Route Query | Limaru"
                description="Find your route by the destination!"
                author="YJJcoolcool"
                keywords="limaru, limaru city server, limaru minecraft server"
            />
            <PageLayout title='Transportation'>
                <SectionBox>
                    <TripPlanner/>
                </SectionBox>
                <SectionBox>
                    <CurrentRoute/>
                </SectionBox>
            </PageLayout>
        </>
    )
}