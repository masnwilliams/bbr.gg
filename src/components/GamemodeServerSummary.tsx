import { GameServer } from '@/lib/types'

type GamemodeServerSummary = {
  [gamemode: string]: number
}

const GamemodeServerCount = ({ servers }: { servers: GameServer[] }) => {
  const gamemodeSummary: GamemodeServerSummary = servers.reduce(
    (summary, server) => {
      if (summary[server.Gamemode]) {
        summary[server.Gamemode]++
      } else {
        summary[server.Gamemode] = 1
      }
      return summary
    },
    {} as GamemodeServerSummary
  )

  return (
    <div>
      <h1 className="text-2xl mb-4">Server Count by Gamemode</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Gamemode</th>
            <th className="px-4 py-2">Server Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(gamemodeSummary).map(([gamemode, count]) => (
            <tr key={gamemode}>
              <td className="border px-4 py-2">{gamemode}</td>
              <td className="border px-4 py-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GamemodeServerCount
