import { ClientData } from "../types/client-data";
import { RegisteredUserDto } from "../types/registered-user.dto";
import { MockDb } from "./mock-db";

export class DatabaseProvider {
  createClient(data: RegisteredUserDto) {
    const { firstName, lastName } = data;
    MockDb.getInstance().setData(data.clientId, { firstName, lastName });
    return data.clientId;
  }

  getAllowedClients(): ClientData[] | undefined {
    return MockDb.getInstance().config?.allowedClients;
  }
}
