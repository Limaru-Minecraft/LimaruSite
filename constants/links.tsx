export interface SocialLink {
  href: string;
  icon: string;
}

export interface QuickLink {
  image?: string;
  href: string;
  title: string;
  subtitle: string;
  newtab?: boolean;
}

export interface NavLink {
  href: string;
  newtab?: boolean;
  text: string;
  pages?: { href: string; newtab?: boolean; text: string }[]; // Optional array of pages
}

export const nav_links: NavLink[] = [
  {
    href: "/about",
    text: "Information",
    pages: [
      { href: "/about", text: "About Limaru" },
      { href: "/rules", text: "Rules" },
      { href: "/getting-started", text: "Getting Started" },
      { href: "https://wiki.limaru.net/wiki/Ranks", newtab: true, text: "Ranks" },
      { href: "/transportation", text: "Transportation" },
    ],
  },
  {
    href: "/see-and-do",
    text: "See & Do",
    pages: [
      { href: "/districts", text: "Districts" },
      { href: "/featured-experiences", text: "Featured Experiences" },
      { href: "/jobs", text: "Jobs" },
      { href: "/iciwi-maker", text: "Iciwi Maker" },
    ],
  },
  {
    href: "",
    text: "Quick Links",
    pages: [
      {
        href: "https://discord.limaru.net",
        newtab: true,
        text: "Discord",
      },
      { href: "https://wiki.limaru.net", newtab: true, text: "Wiki" },
      { href: "https://bluemap.limaru.net", newtab: true, text: "BlueMap" },
      { href: "https://youtube.com/LiMARU", newtab: true, text: "YouTube" },
    ],
  },
];

export const vote_links: QuickLink[] = [
  {
    href: "https://minecraft-mp.com/server/313850/vote/",
    title: "Minecraft Server List",
    subtitle: "minecraft-mp.com",
    newtab: true,
  },
  {
    href: "https://minecraftservers.org/vote/645173",
    title: "Minecraft Servers",
    subtitle: "minecraftservers.org",
    newtab: true,
  },
];

export const donate_links: QuickLink[] = [
  {
    href: "https://ko-fi.com/mineshafter61",
    title: "Support Mineshafter61 on Ko-fi!",
    subtitle: "ko-fi.com",
    newtab: true,
  },
  {
    href: "https://ko-fi.com/yjjcoolcool",
    title: "Support YJJcoolcool on Ko-fi!",
    subtitle: "ko-fi.com",
    newtab: true,
  },
];

export const footer_resource_links: NavLink[] = [
  {
    href: "https://docs.google.com/document/d/e/2PACX-1vTLvBGG1T4y8w3ZaDb_V4qVkOxtJ3Vk9iQmpXbSS_yN9JnePcrdTohmYPpfjDTUs8wVvSnGP6ABCb2r/pub",
    text: "Rules & Laws of Limaru",
    newtab: true,
  },
];

export const social_media_links: SocialLink[] = [
  { href: 'https://youtube.com/LiMARU', icon: 'youtube' },
  { href: 'https://www.instagram.com/limaru.minecraft', icon: 'instagram' },
  //{ href: 'https://twitter.com/FRoLserver', icon: 'twitter' },
];

export const quick_links: QuickLink[] = [
  { href: 'https://discord.limaru.net', title: 'Discord', subtitle: 'Join our Discord server to get the latest updates and interact with our community!', newtab: true },
  //{ href: 'https://forms.gle/6v5TJMq3UCbWuUeP6', title: 'Citizen Application Form', subtitle: 'Online form to apply for citizenship in Limaru', newtab: true },
  { href: 'https://ko-fi.com/mineshafter61', title: 'Donate to our Ko-fi', subtitle: 'Help us keep the server running by donating to us!', newtab: true },
  { href: 'https://youtube.com/LiMARU', title: 'Limaru YouTube Channel', subtitle: 'Our official YouTube channel featuring server events, builds, and more!', newtab: true },
  { href: 'https://youtube.com/YJJCityProject', title: 'YJJ City Project YouTube Channel', subtitle: 'Features creative works made in Minecraft, sometimes made in Limaru', newtab: true },
];
