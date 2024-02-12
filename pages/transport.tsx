import Head from '@/components/Head'
import HomeLayout from '@/components/HomeLayout'
import SectionBox from '@/components/SectionBox'
import Heading from '@/components/LayoutComponents/Heading'
import UnderConstruction from '@/components/LayoutComponents/UnderConstruction'

export default function Home() {
  
  const submitIciwi = async (event: any) => {
    event.preventDefault();
    alert(`So your name is ${event.target.username.value}?`);
  };

  return (
    <>
      <Head
        title="Transport | Limaru"
        description="Ride Limaru's extensive transport network!"
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server"
      />
      <HomeLayout>
        <SectionBox>
          <Heading level={2}>Our Railways</Heading>
          <p>Limaru has a growing network of staff-built and player-built railways. Tickets are handled using the Iciwi plugin - a plugin built in-house that is used across many servers.</p>
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
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-lime-600 rounded-full hover:bg-lime-700"
            >
              Submit
            </button>
          </form>

        </SectionBox>
      </HomeLayout>
    </>
  )
}
