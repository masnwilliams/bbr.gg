import { GameServer } from "@/lib/types";

type HzSummary = {
  [hz: string]: number;
};

const HzServerCount: React.FC<{ servers: GameServer[] }> = ({ servers }) => {
  const hzSummary: HzSummary = servers.reduce((summary, server) => {
    const hzKey = server.Hz.toString();
    if (summary[hzKey]) {
      summary[hzKey]++;
    } else {
      summary[hzKey] = 1;
    }
    return summary;
  }, {} as HzSummary);

  return (
    <div className="p-4">
      <h3>Server Count by Hz</h3>
      <table>
        <thead>
          <tr>
            <th>Hz</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(hzSummary).map((hz) => (
            <tr key={hz}>
              <td>{hz}</td>
              <td>{hzSummary[hz]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HzServerCount;
