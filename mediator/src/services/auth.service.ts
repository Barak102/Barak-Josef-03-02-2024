import { DatabaseProvider } from "../providers/database-provider";
import { RegisteredUserDto } from "../types/registered-user.dto";

export class AuthService {
  private db: DatabaseProvider = new DatabaseProvider();
  constructor() {}

  isClientAllowed = (clientId: number) =>
    this.db.getAllowedClients()?.some((c) => c.id === clientId);

  register = (register: RegisteredUserDto) => {
    const allowedClients = this.db.getAllowedClients();

    if (!this.isClientAllowed(register.clientId)) {
      throw new Error("Client not allowed!!!");
    }
    const result = this.db.createClient(register);
    return result;
  };
}
