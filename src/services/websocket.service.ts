import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ConfigurationProvider } from "../providers/configuration.provider";
import { GameConfiguration } from "../types/game-configuration";
import { ScoreRange } from "../types/score-range";
import { MockDb } from "../providers/mock-db";
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
    // get config
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

  private subscribeClient = (clientId: string) => {};

  private unsubscribeClient = () => {};

  websocketConnectHandler = (socket: any) => {
    const { id } = socket;
    const { clientid } = socket.request?._query;
    console.log("Connecting", socket.request._query);
  };

  websocketDisconnectHandler = (socket: any) => {
    const { id } = socket;
    console.log("Disconnecting", socket.request._query);
  };

  public stopInterval() {
    if (this.scoreInteval) {
      clearInterval(this.scoreInteval);
    }
  }
}
