import * as fs from "fs";
import path from "path";

import { GameConfiguration } from "../types/game-configuration";
export class ConfigurationProvider {
  async get(): Promise<GameConfiguration> {
    const filePath: string = path.join(
      __dirname,
      "../../mock-config/MockConfiguration.json"
    );
    const data: any = await fs.readFileSync(filePath, "utf-8");
    let jsonData: GameConfiguration = JSON.parse(data);
    return jsonData;
  }
}
