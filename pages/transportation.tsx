import Head from '@/components/Head'
import PageLayout from '@/components/PageLayout'
import SectionBox from '@/components/SectionBox'
import Heading from '@/components/LayoutComponents/Heading'
import Status from '@/components/TransportationComponents/status'
import TripPlanner from '@/components/TransportationComponents/pathfinder'
import UnderConstruction from "@/components/LayoutComponents/UnderConstruction";

const intog = async (key: string, s: string) => {
    const letterArray = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    let p = new Array(s.length);
    let q = new Array(s.length);
    for (let i = 0; i < s.length; i++) {
        p[i] = letterArray.indexOf(s[i]);
    }
    for (let i = 0; i < key.length; i++) {
        q[i] = letterArray.indexOf(key[i]);
    }

}

const submitIciwi = async (event: any) => {
    event.preventDefault();
    const user : string = event.target.username.value;
    const start : string = event.target.start.value;
    const end : string = event.target.end.value;

    const f : any = "";

    //alert(`So your name is ${event.target.username.value}?`);
};

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
                    <Heading level={2}>Our Railways</Heading>
                    <p>Limaru has a growing network of staff-built and player-built railways. Tickets are handled using the Iciwi plugin - a plugin built in-house that is used across many servers.</p>
                </SectionBox>
                <SectionBox>
                    <Heading level={2}>Find your route</Heading>
                    <TripPlanner/>
                </SectionBox>
                <SectionBox>
                    <Heading level={2}>Transit Status</Heading>
                    <Status/>
                </SectionBox>
                <SectionBox>
                    <Heading level={2}>Tickets</Heading>
                    <UnderConstruction type="section" />
                    <p>Want to plan your trip in advance? Iciwi has an online ticketing agent - available soon!</p>

                    <form className="flex flex-col" onSubmit={submitIciwi}>
                        <label htmlFor="username" className="mb-2 font-bold">Username</label>
                        <input
                            className="mb-4 border-b-4"
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                        />
                        <label htmlFor="from" className="mb-2 font-bold">Starting station</label>
                        <input
                            className="mb-4 border-b-4"
                            id="from"
                            name="from"
                            type="text"
                            autoComplete="from"
                            required
                        />
                        <label htmlFor="end" className="mb-2 font-bold">Destination</label>
                        <input
                            className="mb-4 border-b-4"
                            id="end"
                            name="end"
                            type="text"
                            autoComplete="end"
                            required
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 font-bold text-white bg-lime-600 rounded-full hover:bg-lime-700"
                        >
                            Submit
                        </button>
                    </form>

                </SectionBox>
            </PageLayout>
        </>
    )
}