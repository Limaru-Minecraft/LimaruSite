import React from "react";
import Head from "@/components/Head";
import PageLayout from "@/components/PageLayout";
import SectionBox from "@/components/SectionBox";
import UnderConstruction from "@/components/LayoutComponents/UnderConstruction";
import Heading from "@/components/LayoutComponents/Heading";
import Pathfinder from "@/components/transportation/pathfinder";
import Status from "@/components/transportation/status";

const Home: React.FC = () => (
    <>
        <Head
            title="Transportation | Limaru"
            description="Transportation is a way to move people around Limaru."
            author="YJJcoolcool, winsanmwtv"
            keywords="limaru, limaru city server, limaru minecraft server, transport limaru, limaru transport"
        />
        <PageLayout title="Transportation">
            <SectionBox>
                <UnderConstruction type="page" />
            </SectionBox>
            <SectionBox>
                <Heading level={2}>Find your route</Heading>
                <div style={{ position: 'relative', zIndex: 10 }}><Pathfinder/></div>


            </SectionBox>

            <SectionBox>
                <Heading level={2}>Transit Status</Heading>
                <div style={{position: 'relative', zIndex: 1}}><Status/></div>
            </SectionBox>
        </PageLayout>
    </>
);

export default Home;
