export class WsMockCache {
  private static instance: WsMockCache | null = null;
  private clients = new Set();

  private constructor() {}

  static getInstance(): WsMockCache {
    if (!WsMockCache.instance) {
      WsMockCache.instance = new WsMockCache();
    }
    return WsMockCache.instance;
  }

  get(id: string) {}

  set(id: string, clientId: number) {
    this.clients.add(id);
  }
  delete(id: string) {
    this.clients.delete(id);
  }
}
