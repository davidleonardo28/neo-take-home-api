import { Request, Response } from "express";
import {
  createCharacter,
  getAllCharacters,
  getCharacterByName,
  simulateBattle,
} from "../services/characterService";

export const createCharacterHandler = (req: Request, res: Response) => {
  try {
    const { name, job } = req.body;
    const character = createCharacter(name, job);
    res.status(201).json(character);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllCharactersHandler = (_req: Request, res: Response) => {
  res.json(getAllCharacters());
};

export const getCharacterByNameHandler = (
  req: Request,
  res: Response
): void => {
  const character = getCharacterByName(req.params.name);
  if (!character) {
    res.status(404).json({ error: "Character not found" });
    return;
  }
  res.json(character);
};

export const simulateBattleHandler = (req: Request, res: Response) => {
  try {
    const { name1, name2 } = req.body;
    const result = simulateBattle(name1, name2);
    res.json({ log: result });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
