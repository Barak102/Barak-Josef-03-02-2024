export class MockCache {
  private static instance: MockCache | null = null;
  private clients = new Set();

  private constructor() {}

  static getInstance(): MockCache {
    if (!MockCache.instance) {
      MockCache.instance = new MockCache();
    }
    return MockCache.instance;
  }

  get(id: string) {}

  set(id: string, clientId: number) {
    this.clients.add(id);
  }
  delete(id: string) {
    this.clients.delete(id);
  }
}
