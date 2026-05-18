import Head from "@/components/Head";
import PageLayout from "@/components/PageLayout";
import SectionBox from "@/components/SectionBox";
import CardGrid from "@/components/LayoutComponents/CardGrid";

const tools = [
  {
    href: "/article-writer",
    title: "Article Writer",
    subtitle: "Write and download Markdown articles for Featured Experiences.",
  },
  {
    href: "/iciwi-maker",
    title: "Iciwi Maker",
    subtitle: "Create Iciwi route and station data.",
  },
  {
    href: "/tools/plugins",
    title: "Plugins",
    subtitle: "Browse plugin repositories used by Limaru.",
  },
];

export default function Tools() {
  return (
    <>
      <Head
        title="Tools | Limaru"
        description="Tools for Limaru builders and contributors."
        author="YJJcoolcool"
        keywords="limaru, tools, minecraft"
        path="/tools/"
      />
      <PageLayout title="Tools">
        <SectionBox>
          <CardGrid items={tools} columns="2" />
        </SectionBox>
      </PageLayout>
    </>
  );
}
