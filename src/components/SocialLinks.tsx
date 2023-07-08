import Link from 'next/link'
import { DiscordIcon, GitHubIcon, TwitterIcon } from '@/components/Icons'

const socialLinks = [
  {
    name: 'Discord',
    link: 'https://discord.gg/battlebit',
    icon: <DiscordIcon width={24} height={24} />,
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/@battlebitgame',
    icon: <TwitterIcon width={24} height={24} />,
  },
  {
    name: 'GitHub',
    link: 'https://www.github.com/masnwilliams/bbr.gg',
    icon: <GitHubIcon width={24} height={24} />,
  },
]

const SocialLinks = () => {
  return (
    <div className="flex justify-center">
      <ul className="flex items-center space-x-4 text-gray-700">
        {socialLinks.map((social) => (
          <li
            key={social.name}
            className={'hover:text-blue-400 hover:scale-105 transition-all'}
          >
            <Link href={social.link} target={'_blank'}>
              {social.icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SocialLinks
