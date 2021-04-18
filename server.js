const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
});

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const rooms = { name: {} };

app.get("/", (req, res) => {
	res.render("index", { rooms: rooms });
});
const users = {};

app.get("/:room", (res, req) => {
	res.render("room", { roomName: req.params.room });
});

server.listen(3000);

io.on("connection", (socket) => {
	socket.on("new-user", (username) => {
		users[socket.id] = username;
		socket.broadcast.emit("user-connected", username);
	});
	socket.on("send-chat-message", (message) => {
		socket.broadcast.emit("chat-message", {
			message: message,
			username: users[socket.id],
		});
	});
	socket.on("disconnect", () => {
		socket.broadcast.emit("user-disconnected", users[socket.id]);
		delete users[socket.id];
	});
});
