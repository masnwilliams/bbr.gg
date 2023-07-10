import SocialLinks from 'components/SocialLinks'

const Footer = () => {
  return (
    <footer>
      <hr className={'mt-14'} />

      <div className={'grid my-4 gap-y-4 px-4 text-center '}>
        <div className={'flex justify-center text-gray-500'}>
          Made with ❤️ by the BattleBit Community
        </div>

        <SocialLinks />

        <div className={'text-xs text-gray-500'}>
          bbr.gg is not affiliated with or endorsed by OKIGAMES (BattleBit
          Remastered).
        </div>
      </div>
    </footer>
  )
}

export default Footer
