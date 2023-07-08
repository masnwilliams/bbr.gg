import { GameServer } from "@/lib/types";
import MapServerCount from "@/component/MapServerCount";
import MaxPlayersServerCount from "@/component/MaxPlayersSummary";
import RegionPlayerCount from "@/component/RegionPlayerCount";
import HzServerCount from "@/component/HzServerCount";
import DayNightServerCount from "@/component/DayNightSummary";
import GamemodeServerSummary from "@/component/GamemodeServerSummary";

const ServerSummary = ({ servers }: { servers: GameServer[] }) => {
  return (
    <div>
      <RegionPlayerCount servers={servers} />
      <MapServerCount servers={servers} />
      <MaxPlayersServerCount servers={servers} />
      <GamemodeServerSummary servers={servers} />
      <HzServerCount servers={servers} />
      <DayNightServerCount servers={servers} />
    </div>
  );
};

export default ServerSummary;
