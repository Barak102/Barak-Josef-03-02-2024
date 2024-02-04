import { DefaultError } from "./default-error.exception";

export class ClientNotAllowedError extends DefaultError {
  protected statusCode: number = 403;
  public getMessageObject = (): any => ({
    clientId: this.clientId,
    message: this.message,
  });

  constructor(public clientId: number) {
    super("Unauthorized client id, client is not allowed to reach this data.");
  }
}
