import { GameServer } from 'types/server'

type MaxPlayersSummary = {
  [maxPlayers: string]: number
}

const MaxPlayersServerCount = ({ servers }: { servers: GameServer[] }) => {
  const maxPlayersSummary: MaxPlayersSummary = servers.reduce(
    (summary, server) => {
      const maxPlayersKey = server.MaxPlayers.toString()
      if (summary[maxPlayersKey]) {
        summary[maxPlayersKey]++
      } else {
        summary[maxPlayersKey] = 1
      }
      return summary
    },
    {} as MaxPlayersSummary
  )

  return (
    <div>
      <h1 className="text-2xl mb-4">Server Count by Max Players</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Max Players</th>
            <th className="px-4 py-2">Server Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(maxPlayersSummary).map(([maxPlayers, count]) => (
            <tr key={maxPlayers}>
              <td className="border px-4 py-2">{maxPlayers}</td>
              <td className="border px-4 py-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MaxPlayersServerCount
