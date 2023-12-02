const WebSocket = require('ws');
const pessoasConectadas = []
const server = new WebSocket.Server({ port: 3000 });

const notificacao = {
  mensagem: 'ola, tudo bem?',
  quemEnviou: 'Eduardo Lacava',
  dataEnvio: new Date()
}

server.on('connection', (socket) => {
  console.log('Cliente conectado.');
  pessoasConectadas.push(socket)
  // Enviar uma mensagem para o cliente quando ele se conectar
  socket.send('Olá, sou o WebSocket Techers :)!');

  // Lidar com mensagens do cliente
  socket.on('message', (message) => {
    console.log(`Mensagem recebida: ${message}`);

    // Enviar uma resposta de volta para o cliente
    socket.send(`Você disse: ${message}`);
  });

  // Lidar com o evento de fechamento da conexão
  socket.on('close', () => {
    console.log('Cliente desconectado.');
  });
});

setInterval(() => {
  pessoasConectadas.forEach((pessoa) => {
    pessoa.send(JSON.stringify(notificacao))
  })
}, 1000);