import { GameServer } from '@/lib/types'

type HzSummary = {
  [hz: string]: number
}

const HzServerCount = ({ servers }: { servers: GameServer[] }) => {
  const hzSummary: HzSummary = servers.reduce((summary, server) => {
    const hzKey = server.Hz.toString()
    if (summary[hzKey]) {
      summary[hzKey]++
    } else {
      summary[hzKey] = 1
    }
    return summary
  }, {} as HzSummary)

  return (
    <div>
      <h1 className="text-2xl mb-4">Server Count by Hz</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Hz</th>
            <th className="px-4 py-2">Server Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(hzSummary).map(([hz, count]) => (
            <tr key={hz}>
              <td className="border px-4 py-2">{hz}</td>
              <td className="border px-4 py-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HzServerCount
