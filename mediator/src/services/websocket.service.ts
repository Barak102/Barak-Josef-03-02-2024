import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ConfigurationProvider } from "../providers/configuration.provider";
import { MockDb } from "../providers/mock-db";
import { GameConfiguration } from "../types/game-configuration";
import { ScoreRange } from "../types/score-range";
import { getRandomNumber } from "../utils/score-utilities";

export class WebsocketService {
  private configProvider: ConfigurationProvider = new ConfigurationProvider();
  private db: MockDb = MockDb.getInstance();
  private scoreInteval: any;

  constructor(
    private io: Server<
      DefaultEventsMap,
      DefaultEventsMap,
      DefaultEventsMap,
      any
    >
  ) {}

  public async init(): Promise<void> {
    const gameConfig: GameConfiguration = await this.configProvider.get();
    this.db.config = gameConfig;
    const { pollingFrequency, scoreRange } = gameConfig;
    this.startInterval(pollingFrequency, scoreRange);
  }

  private startInterval(pollingFrequency: number, range: ScoreRange) {
    this.scoreInteval = setInterval(() => {
      const score = getRandomNumber(range.min, range.max);
      this.io?.emit("score", { score });
    }, pollingFrequency * 1000);
  }

  websocketConnectHandler = (socket: any) => {
    const { id } = socket;
    const { clientid } = socket.request?._query;
    socket.on("disconnect", this.websocketDisconnectHandler);
    console.log("Websocket Connected", { clientid, id });
  };

  websocketDisconnectHandler = (reason: any) => {
    console.log("Websocket disconnected", { reason });
  };

  public stopInterval() {
    if (this.scoreInteval) {
      clearInterval(this.scoreInteval);
    }
  }
}
