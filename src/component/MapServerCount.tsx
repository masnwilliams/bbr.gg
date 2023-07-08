import { GameServer } from '@/lib/types'

type MapSummary = {
  [map: string]: number
}

const MapServerCount = ({ servers }: { servers: GameServer[] }) => {
  const mapSummary: MapSummary = servers.reduce((summary, server) => {
    if (summary[server.Map]) {
      summary[server.Map]++
    } else {
      summary[server.Map] = 1
    }
    return summary
  }, {} as MapSummary)

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Server Count by Map</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Map</th>
            <th className="px-4 py-2">Server Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(mapSummary).map(([map, count]) => (
            <tr key={map}>
              <td className="border px-4 py-2">{map}</td>
              <td className="border px-4 py-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MapServerCount
