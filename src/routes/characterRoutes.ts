import { Router } from "express";
import {
  getCharacterByNameHandler,
  getAllCharactersHandler,
  createCharacterHandler,
  simulateBattleHandler,
} from "../controllers/characterController";

const router = Router();

router.post("/", createCharacterHandler);
router.get("/", getAllCharactersHandler);
router.get("/:name", getCharacterByNameHandler);
router.post("/battle", simulateBattleHandler);

export default router;
