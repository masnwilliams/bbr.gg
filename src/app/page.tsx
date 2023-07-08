import Image from 'next/image'

const HomePage = () => {
  return (
    <div className={'w-full m-auto'}>
      <Image
        src={'/bbr_banner.png'}
        alt={'BattleBit Remastered Banner'}
        width={1920}
        height={1080}
        className={'flex justify-center'}
      />
    </div>
  )
}

export default HomePage
