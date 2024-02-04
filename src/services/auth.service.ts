import { DatabaseProvider } from "../providers/database-provider";
import { RegisteredUserDto } from "../types/registered-user.dto";

export class AuthService {
  private db: DatabaseProvider = new DatabaseProvider();

  constructor() {}

  register = (register: RegisteredUserDto) => {
    const result = this.db.createClient(register);
    return result;
  };
}
