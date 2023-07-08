import { GameServer } from '@/lib/types'
import ServerSummary from '@/components/ServerSummary'

const getServerList = async (): Promise<GameServer[]> => {
  const res = await fetch(
    'https://publicapi.battlebit.cloud/Servers/GetServerList',
    {
      next: {
        revalidate: 10, // Fetches server data every 10 seconds
      },
    }
  )
  return (await res.json()) as GameServer[]
}

const Home = async () => {
  const servers = await getServerList()

  return <ServerSummary servers={servers} />
}

export default Home
