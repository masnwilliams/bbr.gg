export type GameServer = {
  Name: string
  Map: string
  MapSize: string
  Gamemode: string
  Region: string
  Players: number
  QueuePlayers: number
  MaxPlayers: number
  Hz: number
  DayNight: string
  IsOfficial: boolean
  HasPassword: boolean
  AntiCheat: string
  Build: string
}

export type ClassData = {
  name: string
  skills: string[]
  health?: number
  runningSpeed?: number
}
