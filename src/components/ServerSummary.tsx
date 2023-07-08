import { GameServer } from '@/lib/types'
import ServerTable from '@/components/ServerTable'

const getServerList = async (): Promise<GameServer[]> => {
  const res = await fetch(
    'https://publicapi.battlebit.cloud/Servers/GetServerList',
    {
      next: {
        revalidate: 10, // Fetches server data every 10 seconds
        tags: ['server-list'],
      },
    }
  )
  return (await res.json()) as GameServer[]
}

const ServerSummary = async () => {
  const servers = await getServerList()

  const playerCount = servers.reduce((acc, server) => {
    return acc + server.Players
  }, 0)

  const serverCount = servers.length

  return (
    <div className={'grid px-24 gap-y-5 max-w-screen-xl m-auto'}>
      <div className={'flex justify-end text-gray-700'}>
        Data updates every 10 seconds after page refresh
      </div>

      <ServerTable
        servers={servers}
        playerCount={playerCount}
        serverCount={serverCount}
      />
    </div>
  )
}

export default ServerSummary
