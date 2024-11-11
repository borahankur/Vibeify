import { Server } from 'socket.io'
import { Message } from '../models/message.model.js'

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            credentials: true
        }
    })


    const userSockets = new Map()
    const userActivities = new Map()

    io.on("connection", (socket) => {
        socket.on("user_connected", (userId) => {
            userSockets.set(userId, socket.id);
            userActivities.set(userId, "Idle")

            //user online
            io.emit("user_connected", userId)

            //send online status to all online users
            socket.emit("users_online", Array.from(userSockets.keys()))

            //get activities of all online users
            io.emit("activities", Array.from(userActivities.entries()))
        })

        //if user starts playing or pausing
        socket.on("update_activity", ({ userId, activity }) => {
            userActivities.set(userId, activity)
            io.emit("activity_updated", { userId, activity })
        })

        //is user sends a message
        socket.on("send_message", async (data) => {
            try {
                const { senderId, receiverId, content } = data
                const message = await Message.create({
                    senderId,
                    receiverId,
                    content
                })

                //send to receiver if they are online
                const receiverSocketId = userSockets.get(receiverId)
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receive_message", message)
                }
                socket.emit("message_sent", message)
            } catch (error) {
                console.log("Message error: ", error)
                socket.emit("message_error", error.message)
            }
        })

        //if user disconnects
        socket.on("disconnect", () => {
            let disconnectedUserId;
            for (const [userId, socketId] of userSockets.entries()) {
                if (socketId === socket.id) {
                    disconnectedUserId = userId;
                    userSockets.delete(userId)
                    userActivities.delete(userId)
                    break;
                }
            }
            if (disconnectedUserId) {
                io.emit("user_disconnected", disconnectedUserId)
            }
        })
    })
}

