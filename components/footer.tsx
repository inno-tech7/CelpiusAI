'use client';
import Image from 'next/image';
import Link from 'next/link';
import XIcon from '@/public/socials/x.svg';
import YoutubeIcon from '@/public/socials/youtube.svg';
import InstagramIcon from '@/public/socials/instagram.svg';
import DiscordIcon from '@/public/socials/discord.svg';

const footerLinks = {
  product: [{ name: 'Documentation', href: '#' }],
  company: [
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Updates', href: '#' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
};

const socials = [
  {
    id: '0',
    title: 'x',
    icon: XIcon,
    url: 'https://x.com/',
  },
  {
    id: '1',
    title: 'Youtube',
    icon: YoutubeIcon,
    url: 'https://www.youtube.com',
  },
  {
    id: '2',
    title: 'Instagram',
    icon: InstagramIcon,
    url: 'https://www.instagram.com/',
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[rgb(102_102_102_/_19%)] dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid lg:grid-cols-3 lg:gap-[12rem] max-1024:gap-[6rem] max-820:grid-rows-1">
          <div className="flex flex-col lg:justify-start max-820:items-center">
            <div className="mb-4 flex items-start space-x-2">
              <Image
                src="/celpius-ai-logo.png"
                alt="Celpius AI"
                width={120}
                height={40}
                className="h-[4rem] w-auto lg:translate-x-[-2.5rem] lg:scale-[0.7] max-820:translate-x-[0rem] max-820:scale-[0.8]"
              />
            </div>

            <p className="mb-6 text-slate-600 dark:text-slate-400 lg:max-w-md max-820:max-w-[30rem] max-820:text-center">
              AI-powered CELPIP preparation platform helping thousands achieve their Canadian
              immigration goals through intelligent, adaptive learning.
            </p>

            <div className="flex space-x-4">
              {socials.map(({ id, url, icon: Icon, title }) => (
                <Link key={id} href={url}>
                  <Icon className="h-5 w-5 text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400" />
                  <span className="sr-only">{title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-start lg:flex-row xl:gap-[10rem] max-1024:ml-[4.4rem] max-1024:gap-[7rem] max-820:ml-[0rem] max-820:flex-wrap max-820:justify-center max-640:flex-col max-640:gap-[4rem]">
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-mono text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-mono text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="whitespace-nowrap font-mono text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-[rgb(102_102_102_/_19%)] pt-8 dark:border-white/10 sm:flex-row">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Celpius AI. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 sm:mt-0">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
