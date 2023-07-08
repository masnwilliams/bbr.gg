import { GameServer } from "@/lib/types";
import MapServerCount from "@/component/MapServerCount";
import MaxPlayersServerCount from "@/component/MaxPlayersSummary";
import RegionPlayerCount from "@/component/RegionPlayerCount";

const ServerSummary: React.FC<{ servers: GameServer[] }> = ({ servers }) => {
  return (
    <div>
      <RegionPlayerCount servers={servers} />
      <MapServerCount servers={servers} />
      <MaxPlayersServerCount servers={servers} />
    </div>
  );
};

export default ServerSummary;
