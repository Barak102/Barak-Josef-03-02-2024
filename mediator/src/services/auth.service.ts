import { DatabaseProvider } from "../providers/database-provider";
import { ClientNotAllowedError } from "../types/exceptions/client-not-allowed.exception";
import { RegisteredUserDto } from "../types/registered-user.dto";

export class AuthService {
  private db: DatabaseProvider = new DatabaseProvider();
  constructor() {}

  isClientAllowed = (clientId: number) =>
    this.db.getAllowedClients()?.some((c) => c.id === clientId);

  register = (register: RegisteredUserDto) => {
    if (!this.isClientAllowed(register.clientId)) {
      throw new ClientNotAllowedError(register.clientId);
    }
    const result = this.db.createClient(register);
    return result;
  };
}
