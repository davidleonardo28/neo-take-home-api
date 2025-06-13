import {
  createCharacter,
  getAllCharacters,
  getCharacterByName,
  simulateBattle,
} from "../src/services/characterService";

describe("Character Service", () => {
  beforeEach(() => {
    //
  });

  it("should create a Warrior character with correct initial stats", () => {
    const char = createCharacter("Warrior_01", "Warrior");
    expect(char.name).toBe("Warrior_01");
    expect(char.job).toBe("Warrior");
    expect(char.stats.strength).toBe(10);
    expect(char.hp).toBe(20);
    expect(char.alive).toBe(true);
  });

  it("should not allow duplicate names", () => {
    createCharacter("Duplicate_01", "Thief");
    expect(() => createCharacter("Duplicate_01", "Mage")).toThrow(
      "Name already used"
    );
  });

  it("should not allow invalid names", () => {
    expect(() => createCharacter("ab", "Warrior")).toThrow("Invalid name");
  });

  it("should return all characters with alive status", () => {
    const characters = getAllCharacters();
    expect(Array.isArray(characters)).toBe(true);
    expect(characters[0]).toHaveProperty("name");
    expect(characters[0]).toHaveProperty("job");
    expect(characters[0]).toHaveProperty("alive");
  });

  it("should retrieve a character by name", () => {
    const char = getCharacterByName("Warrior_01");
    expect(char).toBeDefined();
    expect(char?.name).toBe("Warrior_01");
  });

  it("should simulate a battle and log events", () => {
    createCharacter("Fighter_1", "Warrior");
    createCharacter("Fighter_2", "Mage");
    const log = simulateBattle("Fighter_1", "Fighter_2");
    expect(Array.isArray(log)).toBe(true);
    expect(log[0]).toMatch(/Battle between/);
    expect(log[log.length - 1]).toMatch(/wins the battle!/);
  });
});
