import Head from '@/components/Head'
import PageLayout from '@/components/PageLayout'
import SectionBox from '@/components/SectionBox'
import Heading from '@/components/LayoutComponents/Heading'
import Status from '@/components/TransportationComponents/status'
import TripPlanner from '@/components/TransportationComponents/pathfinder'

export default function Home() {
    return (
        <>
            <Head
                title="Transportation | Limaru"
                description="Ride Limaru's extensive transport network!"
                author="YJJcoolcool"
                keywords="limaru, limaru city server, limaru minecraft server"
            />
            <PageLayout title='Transportation'>
                <SectionBox>
                    <Heading level={2}>Find your route</Heading>
                    <TripPlanner/>
                </SectionBox>
                <SectionBox>
                    <Heading level={2}>Transit Status</Heading>
                    <Status/>
                </SectionBox>
            </PageLayout>
        </>
    )
}