"use client";

import { GameServer } from "@/lib/types";
import { useState } from "react";

const GameServerCard: React.FC<{ server: GameServer }> = ({ server }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded border p-4 m-2 w-64">
      <h2
        className="text-xl mb-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {server.Name}
      </h2>
      <p>
        <strong>Map:</strong> {server.Map}
      </p>
      <p>
        <strong>Players:</strong> {server.Players}
      </p>

      {isOpen && (
        <div className="mt-2">
          <p>
            <strong>Map Size:</strong> {server.MapSize}
          </p>
          <p>
            <strong>Game mode:</strong> {server.Gamemode}
          </p>
          <p>
            <strong>Region:</strong> {server.Region}
          </p>
          {/* ...rest of the properties */}
        </div>
      )}
    </div>
  );
};

const GameServerList: React.FC<{ servers: GameServer[] }> = ({ servers }) => {
  const totalPlayers = servers.reduce(
    (total, server) => total + server.Players,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Total Active Players: {totalPlayers}</h2>
      <div className="flex flex-wrap">
        {servers.map((server, index) => (
          <GameServerCard key={index} server={server} />
        ))}
      </div>
    </div>
  );
};

export default GameServerList;
