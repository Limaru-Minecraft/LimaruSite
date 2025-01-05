import Head from "@/components/Head";
import PageLayout from "@/components/PageLayout";
import SectionBox from "@/components/SectionBox";
import CardGrid from "@/components/LayoutComponents/CardGrid";
import Heading from "@/components/LayoutComponents/Heading";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head
        title="Rules | Limaru"
        description="Rules & Laws of Limaru."
        author="YJJcoolcool"
        keywords="limaru, limaru city server, limaru minecraft server, donate limaru, limaru donation"
      />
      <PageLayout title="Rules">
        <SectionBox>
          <Heading level={2}>The 10 Major Rules</Heading>
          <Heading level={3}>1. No Griefing</Heading>
          <p>Do not modify or destroy others’ builds without permission.</p>
          <Heading level={3}>2. No Stealing of Others’ Works</Heading>
          <p>Do not copy or redistribute others’ builds within or outside of the server, unless permission is given by them. Adaptations of others’ works are allowed, but they cannot be a blatant copy of the original work.</p>
          <Heading level={3}>3. Respect Others</Heading>
          <p>Limaru aims to be a peaceful and welcoming community. Do not harass, spam, or discriminate against anyone based on their race, ethnicity, nationality, sexuality, gender identity, status or beliefs will not be tolerated.</p>
          <Heading level={3}>4. No Doxxing</Heading>
          <p>Do not disseminate any private information about players, which includes (but is not limited to): real names, email addresses, and personal pictures of people. Action will be taken if the privacy of individuals is infringed.</p>
          <Heading level={3}>5. No DM Protesting</Heading>
          <p>Do not directly message the server staff of Limaru to change or grant exceptions to a rule. Limaru provides the appropriate channels (such as the Helpop system and Voting) which are open to everyone to share their opinions or request changes to our rules.</p>
          <Heading level={3}>6. No Advertising</Heading>
          <p>Mentioning the IP address, communication channels and/or social media accounts of non-partner servers is not allowed. However, you may still mention other servers or casually chat about them.</p>
          <Heading level={3}>7. Do Not Aid In Crime</Heading>
          <p>Assisting someone else in breaking a rule will also be dealt with severely.</p>
          <Heading level={3}>8. Do Not Commit Acts of Wrongdoing In The Name of Limaru</Heading>
          <p>Using Limaru’s name for wrongful activities (e.g., attacking/“waging war” against another server or community), accusing Limaru of wrongdoings that Limaru has had no involvement in, or any similar activities aimed at harming the community or Limaru’s reputation will not be tolerated.</p>
          <Heading level={3}>9. Do Not Launch Cyberattacks on Limaru</Heading>
          <p>Launching cyberattacks such as Denial of Service (DoS/DDoS) attacks, establishing backdoors, or exploiting vulnerabilities on the server without permission is strictly prohibited and may even lead to real-world consequences.</p>
          <Heading level={3}>10. Do Not Use AI Tools to Generate Builds</Heading>
          <p>The use of Artificial Intelligence tools to create builds is not allowed.</p>
        </SectionBox>
        <SectionBox>
          <CardGrid items={[{ href: 'https://docs.google.com/document/d/e/2PACX-1vTLvBGG1T4y8w3ZaDb_V4qVkOxtJ3Vk9iQmpXbSS_yN9JnePcrdTohmYPpfjDTUs8wVvSnGP6ABCb2r/pub', title: 'Full Rules & Laws of Limaru', subtitle: 'View the full list of Rules & Laws of Limaru on Google Docs', newtab: true }]} />
        </SectionBox>
      </PageLayout>
    </>
  );
}
