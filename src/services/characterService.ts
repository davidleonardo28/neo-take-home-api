import { Character, Job, Stats } from "../models/Character";

const characters: Character[] = [];

const baseStats: Record<Job, Stats & { hp: number }> = {
  Warrior: { strength: 10, dexterity: 5, intelligence: 5, hp: 20 },
  Thief: { strength: 4, dexterity: 10, intelligence: 4, hp: 15 },
  Mage: { strength: 5, dexterity: 6, intelligence: 10, hp: 12 },
};

export const createCharacter = (name: string, job: Job): Character => {
  if (!/^[a-zA-Z0-9_]{4,15}$/.test(name)) throw new Error("Invalid name");
  if (!baseStats[job]) throw new Error("Invalid job");
  if (characters.find((c) => c.name === name))
    throw new Error("Name already used");

  const stats = baseStats[job];
  const newChar: Character = {
    name,
    job,
    stats,
    hp: stats.hp,
    maxHp: stats.hp,
    alive: true,
  };
  characters.push(newChar);
  return newChar;
};

export const getAllCharacters = () =>
  characters.map(({ name, job, alive }) => ({ name, job, alive }));

export const getCharacterByName = (name: string) =>
  characters.find((c) => c.name === name);

export const calculateAttackModifier = (char: Character): number => {
  const { strength, dexterity, intelligence } = char.stats;
  switch (char.job) {
    case "Warrior":
      return 0.8 * strength + 0.2 * dexterity;
    case "Thief":
      return 0.25 * strength + 1 * dexterity + 0.25 * intelligence;
    case "Mage":
      return 0.2 * strength + 0.2 * dexterity + 1.2 * intelligence;
  }
};

export const calculateSpeedModifier = (char: Character): number => {
  const { strength, dexterity, intelligence } = char.stats;
  switch (char.job) {
    case "Warrior":
      return 0.6 * dexterity + 0.2 * intelligence;
    case "Thief":
      return 0.8 * dexterity;
    case "Mage":
      return 0.4 * dexterity + 0.1 * strength;
  }
};

export const simulateBattle = (name1: string, name2: string): string[] => {
  const a = getCharacterByName(name1);
  const b = getCharacterByName(name2);
  if (!a || !b) throw new Error("Character not found");
  if (!a.alive || !b.alive) throw new Error("One character is dead");

  const log: string[] = [];
  log.push(
    `Battle between ${a.name} (${a.job}) - ${a.hp} HP and ${b.name} (${b.job}) - ${b.hp} HP begins!`
  );

  const getSpeed = () => [
    { char: a, speed: Math.floor(Math.random() * calculateSpeedModifier(a)) },
    { char: b, speed: Math.floor(Math.random() * calculateSpeedModifier(b)) },
  ];

  while (a.alive && b.alive) {
    const [s1, s2] = getSpeed();
    const first = s1.speed > s2.speed ? s1 : s2;
    const second = s1.speed > s2.speed ? s2 : s1;

    log.push(
      `${first.char.name} ${first.speed} speed was faster than ${second.char.name} ${second.speed} speed and will begin this round.`
    );

    [first, second].forEach(({ char: attacker }) => {
      const defender = attacker === a ? b : a;
      if (!defender.alive) return;
      const damage = Math.floor(
        Math.random() * calculateAttackModifier(attacker)
      );
      defender.hp = Math.max(defender.hp - damage, 0);
      if (defender.hp === 0) defender.alive = false;
      log.push(
        `${attacker.name} attacks ${defender.name} for ${damage}, ${defender.name} has ${defender.hp} HP remaining.`
      );
    });
  }

  const winner = a.alive ? a : b;
  log.push(
    `${winner.name} wins the battle! ${winner.name} still has ${winner.hp} HP remaining!`
  );
  return log;
};
