import { GameServer } from "@/lib/types";

type DayNightSummary = {
  [dayNight: string]: number;
};

const DayNightServerCount: React.FC<{ servers: GameServer[] }> = ({
  servers,
}) => {
  const dayNightSummary: DayNightSummary = servers.reduce((summary, server) => {
    if (summary[server.DayNight]) {
      summary[server.DayNight]++;
    } else {
      summary[server.DayNight] = 1;
    }
    return summary;
  }, {} as DayNightSummary);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Server Count by Day/Night</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Day/Night</th>
            <th className="px-4 py-2">Server Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(dayNightSummary).map(([dayNight, count]) => (
            <tr key={dayNight}>
              <td className="border px-4 py-2">{dayNight}</td>
              <td className="border px-4 py-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DayNightServerCount;
