export type Job = "Warrior" | "Thief" | "Mage";

export interface Stats {
  strength: number;
  dexterity: number;
  intelligence: number;
}

export interface Character {
  name: string;
  job: Job;
  stats: Stats;
  hp: number;
  maxHp: number;
  alive: boolean;
}
