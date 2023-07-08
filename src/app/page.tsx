import { GameServer } from '@/lib/types'
import ServerSummary from '@/component/ServerSummary'

const getServerList = async (): Promise<GameServer[]> => {
  const res = await fetch(
    'https://publicapi.battlebit.cloud/Servers/GetServerList'
  )
  return (await res.json()) as GameServer[]
}

const Home = async () => {
  const servers = await getServerList()

  return <ServerSummary servers={servers} />
}

export default Home
