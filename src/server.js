const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

var users = ['John', 'Betty', 'Hal'];

app.get('/api/users', function (req, res) {
  res.json(users);
});


app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
	socket.on('connectRoom', box => {
		socket.join(box);
	})
});

mongoose.connect(
	"mongodb+srv://leandro:passLeandro@cluster0-6xzmn.mongodb.net/nodeTeste?retryWrites=true", 
	{
		useNewUrlParser: true
	}
);

app.use((req, res, next) => {
	req.io = io;
	return next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));
//app.use(require('./routes'));

if(require.main === module){
		server.listen(process.env.PORT || 3333);
}

module.exports == app;
