export class DefaultError extends Error {
  protected statusCode: number = 500;

  public getStatusCode = () => this.statusCode;

  public getMessageObject = () => ({ message: this.message });

  constructor(public message: string = "Internal Server Error") {
    super();
  }
}
