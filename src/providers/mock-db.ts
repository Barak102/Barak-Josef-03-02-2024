import { GameConfiguration } from "../types/game-configuration";

export class MockDb {
  private static instance: MockDb | null = null;

  private clientMaps = new Map<number, any>();
  public config: GameConfiguration | null = null;
  private constructor() {}

  static getInstance(): MockDb {
    if (!MockDb.instance) {
      MockDb.instance = new MockDb();
    }
    return MockDb.instance;
  }

  getData(key: number): any {
    return this.clientMaps.get(key);
  }

  setData(key: number, value: any): void {
    this.clientMaps.set(key, value);
  }
}
