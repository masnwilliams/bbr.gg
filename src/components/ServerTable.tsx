'use client'

import { GameServer } from '@/lib/types'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'

const ServerTable = ({
  servers,
  playerCount,
  serverCount,
}: {
  servers: GameServer[]
  playerCount: number
  serverCount: number
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredServers = servers.filter(
    (server) =>
      server.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.Map.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.MapSize.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.Gamemode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.Region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.Players.toString().includes(searchTerm.toLowerCase()) ||
      server.QueuePlayers.toString().includes(searchTerm.toLowerCase()) ||
      server.MaxPlayers.toString().includes(searchTerm.toLowerCase()) ||
      server.Hz.toString().includes(searchTerm.toLowerCase()) ||
      server.DayNight.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.IsOfficial.toString().includes(searchTerm.toLowerCase()) ||
      server.HasPassword.toString().includes(searchTerm.toLowerCase()) ||
      server.AntiCheat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.Build.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl mb-4">Server List</h1>

      <div className={'flex justify-between'}>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleChange}
          className="border p-2 rounded w-80"
        />
        <div className={'text-gray-700'}>
          Players: {playerCount} - Servers: {serverCount}
        </div>
      </div>

      <div className={'mt-4'}>
        {/*// This table is hidden on mobile devices*/}
        <table className="table-auto w-full collapse md:visible">
          <thead>
            <tr>
              <th className="px-4 py-2">Map</th>
              <th className="px-4 py-2">Server Name</th>
              <th className="px-4 py-2">Game Mode</th>
              <th className="px-4 py-2">Map Size</th>
              <th className="px-4 py-2">Players</th>
            </tr>
          </thead>
          <tbody>
            {filteredServers.map((server) => (
              <tr key={server.Name}>
                <td className="border px-4 py-2">
                  <Image
                    src={`/maps/${server.Map.toLowerCase()}.webp`}
                    alt={''}
                    width={100}
                    height={100}
                  />
                </td>
                <td className="border px-4 py-2">
                  <div className={'text-xl font-semibold'}>
                    [{server.IsOfficial ? 'OFFICIAL' : ''}] {server.Name}
                  </div>

                  <div
                    className={
                      'flex gap-x-2 [&>*]:border-2 [&>*]:rounded [&>*]:px-2 text-sm'
                    }
                  >
                    <div>{server.Map}</div>
                    <div>{server.Region}</div>
                  </div>
                </td>
                <td className="border px-4 py-2">{server.Gamemode}</td>
                <td className="border px-4 py-2">{server.MapSize}</td>
                <td className="border px-4 py-2">
                  {`${server.Players}${
                    server.QueuePlayers ? `(+${server.QueuePlayers})` : ''
                  }/${server.MaxPlayers}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*// This table is visible on mobile devices*/}
        <table className="table-auto w-full md:collapse">
          <thead>
            <tr>
              <th className="px-4 py-2">Server Name</th>
              <th className="px-4 py-2">Players</th>
            </tr>
          </thead>
          <tbody>
            {filteredServers.map((server) => (
              <tr key={server.Name}>
                <td className="border px-4 py-2">
                  <div className={'text-sm font-semibold'}>
                    [{server.IsOfficial ? 'OFFICIAL' : ''}] {server.Name}
                  </div>

                  <div
                    className={
                      'flex gap-x-2 [&>*]:border-2 [&>*]:rounded [&>*]:px-2 text-sm'
                    }
                  >
                    <div>{server.Map}</div>
                    <div>{server.Region}</div>
                  </div>
                </td>
                <td className="border px-4 py-2">
                  {`${server.Players}${
                    server.QueuePlayers ? `(+${server.QueuePlayers})` : ''
                  }/${server.MaxPlayers}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServerTable
