import { ClientData } from "./client-data";
import { ScoreRange } from "./score-range";

export type GameConfiguration = {
  pollingFrequency: number;
  scoreRange: ScoreRange;
  allowedClients: ClientData[];
};
