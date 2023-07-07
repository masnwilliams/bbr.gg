import { GameServer } from "@/lib/types";
import GameServerList from "@/component/GameServerList";

const getServerList = async (): Promise<GameServer[]> => {
  const res = await fetch(
    "https://publicapi.battlebit.cloud/Servers/GetServerList"
  );
  return (await res.json()) as GameServer[];
};

const Home = async () => {
  const servers = await getServerList();

  return (
    <div>
      <GameServerList servers={servers} />
    </div>
  );
};

export default Home;
