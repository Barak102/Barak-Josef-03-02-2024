import WebSocket from "ws";

export function handleClientRegisterConnection(
  ws: WebSocket,
  wss: WebSocket.Server
): void {
  console.log("WebSocket connected");

  //   ws.on("message", (message: string) => {
  //     console.log(`Received message: ${message}`);

  //     // Broadcast the message to all connected clients
  //     wss.clients.forEach((client) => {
  //       if (client !== ws && client.readyState === WebSocket.OPEN) {
  //         client.send(`Broadcast: ${message}`);
  //       }
  //     });
  //   });
  //
  ws.on("close", () => {
    console.log("WebSocket disconnected");
  });
}
