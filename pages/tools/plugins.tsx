import Head from "@/components/Head";
import PageLayout from "@/components/PageLayout";
import SectionBox from "@/components/SectionBox";
import CardGrid from "@/components/LayoutComponents/CardGrid";
import type { GetStaticProps } from "next";

const plugins = [
  {
    href: "https://github.com/Limaru-Minecraft/iciwi",
    title: "Iciwi",
    subtitle: "Limaru's Minecraft transit plugin repository.",
    newtab: true,
  },
  {
    href: "https://github.com/Mineshafter61/MikesTCAddons",
    title: "MikesTCAddons",
    subtitle: "Add-ons and related plugin work for the server.",
    newtab: true,
  },
];

type PluginsProps = {
  plugins: typeof plugins;
};

export const getStaticProps: GetStaticProps<PluginsProps> = async () => {
  return {
    props: {
      plugins,
    },
  };
};

export default function Plugins({ plugins }: PluginsProps) {
  return (
    <>
      <Head
        title="Plugins | Limaru"
        description="Plugin repositories used by Limaru."
        author="YJJcoolcool"
        keywords="limaru, plugins, minecraft"
      />
      <PageLayout title="Plugins">
        <SectionBox>
          <CardGrid items={plugins} columns="2" />
        </SectionBox>
      </PageLayout>
    </>
  );
}
