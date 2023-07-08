// Classes: Leader, Assault, Medic, Engineer, Support, Recon

import { ClassData } from '@/lib/types'

export const classes: { [key: string]: ClassData } = {
  leader: {
    name: 'Leader',
    skills: ['Squad Leader'],
    health: 150,
  },
  assault: {
    name: 'Assault',
    skills: ['Assault', 'Grenadier', 'Breacher'],
  },
  medic: {
    name: 'Medic',
    skills: ['Medic', 'Combat Medic', 'Field Medic'],
  },
  engineer: {
    name: 'Engineer',
    skills: ['Engineer', 'Combat Engineer', 'Field Engineer'],
  },
  support: {
    name: 'Support',
    skills: ['Support', 'Combat Support', 'Field Support'],
  },
  recon: {
    name: 'Recon',
    skills: ['Recon', 'Combat Recon', 'Field Recon'],
  },
}
