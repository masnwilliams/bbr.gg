import { GameServer } from '@/lib/types'
import MapServerCount from '@/components/MapServerCount'
import MaxPlayersServerCount from '@/components/MaxPlayersSummary'
import RegionPlayerCount from '@/components/RegionPlayerCount'
import HzServerCount from '@/components/HzServerCount'
import DayNightServerCount from '@/components/DayNightSummary'
import GamemodeServerSummary from '@/components/GamemodeServerSummary'

const ServerSummary = ({ servers }: { servers: GameServer[] }) => {
  return (
    <div className={'grid px-24 gap-y-5 max-w-screen-xl m-auto'}>
      <div className={'flex justify-end text-gray-700'}>
        Data updates every 10 seconds after page refresh
      </div>
      <div className="grid gap-y-10 gap-x-5 grid-cols-1 md:grid-cols-2">
        <RegionPlayerCount servers={servers} />
        <MapServerCount servers={servers} />
        <MaxPlayersServerCount servers={servers} />
        <GamemodeServerSummary servers={servers} />
        <HzServerCount servers={servers} />
        <DayNightServerCount servers={servers} />
      </div>
    </div>
  )
}

export default ServerSummary
