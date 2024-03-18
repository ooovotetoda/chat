import { Server, type ServerOptions, type Socket } from 'socket.io'
import type { H3Event } from 'h3'
import type {Message} from "~/types/message";
const options: Partial<ServerOptions> = {
    path: '/api/socket.io',
    serveClient: false
}

export const io = new Server(options);

export function initSocket(event: H3Event) {
    // @ts-ignore
    io.attach(event.node.res.socket?.server);

    io.on('connection', (socket: Socket) => {
        console.log("CONNECTION")

        socket.on('chatMessage', (message: Message) => {
            socket.emit("message", {
                username: message.username,
                text: message.text,
            })
            socket.broadcast.emit("message",{
                username: message.username,
                text: message.text,
            })
        })


        // socket.on('disconnect', () => {
        //
        // })
    })


}
