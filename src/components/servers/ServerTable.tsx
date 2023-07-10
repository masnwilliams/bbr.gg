'use client'

import { GameServer } from 'types/server'
import { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { useKeyboardShortcut } from 'hooks/useKeyboardShortcut'

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
  const searchRef = useRef(null)

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

  useKeyboardShortcut(['mod', 'k'], () => {
    if (searchRef.current != null) {
      // @ts-ignore
      searchRef.current.focus()
    }
  })

  return (
    <div>
      <h1 className="text-2xl mb-4">Server List</h1>

      <div className={'flex justify-between items-end'}>
        <input
          type="text"
          placeholder="Search servers..."
          value={searchTerm}
          onChange={handleChange}
          className="border p-2 rounded w-full sm:w-64 md:w-80"
          ref={searchRef}
        />
        <div className={'text-gray-700 hidden sm:inline'}>
          Players: {playerCount} - Servers: {serverCount}
        </div>
      </div>

      <div className={'mt-4'}>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 hidden md:table-cell">Map</th>
              <th className="px-4 py-2 hidden md:table-cell">Server Name</th>
              <th className="px-4 py-2 hidden md:table-cell">Game Mode</th>
              <th className="px-4 py-2 hidden md:table-cell">Map Size</th>
              <th className="px-4 py-2 hidden sm:table-cell">Players</th>
            </tr>
          </thead>
          <tbody>
            {filteredServers.map((server) => (
              <tr key={server.Name}>
                <td className="border px-4 py-2 hidden md:table-cell">
                  <Image
                    src={`/maps/${server.Map.toLowerCase()}.webp`}
                    alt={server.Map}
                    width={100}
                    height={100}
                  />
                </td>
                <td className="border px-4 py-2">
                  <div className={'sm:text-lg font-semibold'}>
                    [{server.IsOfficial ? 'OFFICIAL' : ''}] {server.Name}
                  </div>

                  <div
                    className={
                      'flex gap-x-2 [&>*]:border-2 [&>*]:rounded [&>*]:px-2 text-xs sm:text-sm'
                    }
                  >
                    <div>{server.Map}</div>
                    <div>{server.Region}</div>
                    <div>{server.DayNight}</div>
                  </div>
                </td>
                <td className="border px-4 py-2 hidden md:table-cell">
                  {server.Gamemode}
                </td>
                <td className="border px-4 py-2 hidden md:table-cell">
                  {server.MapSize}
                </td>
                <td className="border px-4 py-2 hidden sm:table-cell">
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
