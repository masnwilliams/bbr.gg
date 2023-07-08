import React from "react";
import { GameServer } from "@/lib/types";

type RegionSummary = {
  [region: string]: number;
};

const RegionPlayerCount: React.FC<{ servers: GameServer[] }> = ({
  servers,
}) => {
  const regionSummary: RegionSummary = servers.reduce((summary, server) => {
    if (summary[server.Region]) {
      summary[server.Region] += server.Players;
    } else {
      summary[server.Region] = server.Players;
    }
    return summary;
  }, {} as RegionSummary);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Player Count by Region</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Region</th>
            <th className="px-4 py-2">Player Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(regionSummary).map(([region, count]) => (
            <tr key={region}>
              <td className="border px-4 py-2">{region}</td>
              <td className="border px-4 py-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegionPlayerCount;
