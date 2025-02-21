import { Socket } from "node:dgram";


export function handleError(socket:Socket, event:string, error:Object) {
  console.error(`[ERROR][${event}]`, error);
  socket.emit('error', {
  event,
  message: 'Ha ocurrido un error en el servidor',
  timestamp: new Date()
  });
}