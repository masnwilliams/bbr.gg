import { GameServer } from 'types/server'
import ServerTable from 'components/servers/ServerTable'

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
    <div className={'px-4 sm:px-10'}>
      <ServerTable
        servers={servers}
        playerCount={playerCount}
        serverCount={serverCount}
      />
    </div>
  )
}

export default ServerSummary
