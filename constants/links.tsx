export interface NavLink {
  href: string;
  text: string;
  newtab?: boolean;
}

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

export const nav_links: NavLink[] = [
  { href: '/getting-started', text: 'Getting Started' },
  { href: '/see-and-do', text: 'See & Do' },
  { href: '/about', text: 'About' },
  { href: '/transport', text: 'Transport' },
  { href: 'https://wiki.limaru.net', text: 'Wiki', newtab: true },
  { href: 'http://maps.limaru.net', text: 'Live Map', newtab: true },
  { href: '/support-us', text: 'Support Us' },
];

export const footer_resource_links: NavLink[] = [
  { href: 'https://docs.google.com/document/d/e/2PACX-1vTLvBGG1T4y8w3ZaDb_V4qVkOxtJ3Vk9iQmpXbSS_yN9JnePcrdTohmYPpfjDTUs8wVvSnGP6ABCb2r/pub', text: 'Rules & Laws of Limaru', newtab: true },
];

export const social_media_links: SocialLink[] = [
  { href: 'https://youtube.com/LiMARU', icon: 'youtube' },
  { href: 'https://instagram.com/YJJCityProject', icon: 'instagram' },
  { href: 'https://twitter.com/FRoLserver', icon: 'twitter' },
];

export const quick_links: QuickLink[] = [
  { href: 'https://discord.limaru.net', title: 'Discord', subtitle: 'Join our Discord server to get the latest updates and interact with our community!', newtab: true },
  { href: 'https://forms.gle/6v5TJMq3UCbWuUeP6', title: 'Citizen Application Form', subtitle: 'Online form to apply for citizenship in Limaru', newtab: true },
  { href: 'https://ko-fi.com/mineshafter61', title: 'Donate to our Ko-fi', subtitle: 'Help us keep the server running by donating to us!', newtab: true },
  { href: 'https://youtube.com/LiMARU', title: 'Limaru YouTube Channel', subtitle: 'Our official YouTube channel featuring server events, builds, and more!', newtab: true },
  { href: 'https://youtube.com/YJJCityProject', title: 'YJJ City Project YouTube Channel', subtitle: 'Features creative works made in Minecraft, sometimes made in Limaru', newtab: true },
];
