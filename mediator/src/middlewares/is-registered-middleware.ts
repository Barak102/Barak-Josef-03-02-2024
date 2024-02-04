import { AuthService } from "../services/auth.service";

export const isRegisteredWsMiddleware = (socket: any, next: any): void => {
  const { clientid } = socket.request?._query || null;
  const authService: AuthService = new AuthService();
  if (clientid && authService.isClientAllowed(+clientid)) {
    next();
  }
};
