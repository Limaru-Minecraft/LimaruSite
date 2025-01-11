import Head from "@/components/Head";
import PageLayout from "@/components/PageLayout";
import SectionBox from "@/components/SectionBox";
import Heading from "@/components/LayoutComponents/Heading";
import Status from "@/components/TransportationComponents/status";
import TripPlanner from "@/components/TransportationComponents/pathfinder";

export default function Home() {
  return (
    <>
      <Head
        title="Transportation | Limaru"
        description="Ride Limaru's extensive transport network!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server"
      />
      <PageLayout title="Transportation">
        <SectionBox>
          <Heading level={2}>Route Planner</Heading>
          <TripPlanner />
        </SectionBox>
        <SectionBox>
          <Heading level={2}>Service Status</Heading>
          <Status />
        </SectionBox>
      </PageLayout>
    </>
  );
}
