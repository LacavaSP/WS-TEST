const WebSocket = require('ws')
const pessoasConectadas = []
const webSocketServidor = new WebSocket.Server({ port: 3000 })

const express = require('express')
const servidor = express()
const porta = 5000
servidor.use(express.json())
servidor.use(express.static('public'))

const notificacao = (mensagem, pessoa) => ({
    mensagem: mensagem,
    quemEnviou: pessoa,
    dataEnvio: new Date()
  })

servidor.listen(5000, '195.35.37.40',() => {
    console.log(`SERVIDOR INICIADO EM HTTP://LOCALHOST:${porta}`)
})

servidor.get('/api/frutas', async (req, res) => {
    return res.status(200).json(['banana', 'uva', 'melao', 'abacaxi', 'pitaia'])
})


webSocketServidor.on('connection', (socket) => {
    console.log('Cliente conectado.');
    pessoasConectadas.push(socket)
    // Enviar uma mensagem para o cliente quando ele se conectar
    socket.send(JSON.stringify(notificacao('Olá, sou o WebSocket Techers :)!')));

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

servidor.post('/api/envia-mensagem-ws', async (req, res) => {
    pessoasConectadas.forEach((pessoa) => pessoa.send(JSON.stringify(notificacao(req.body.mensagem, req.body.pessoa))))
    return res.status(200).json()
})

/*setInterval(() => {
    pessoasConectadas.forEach((pessoa) => pessoa.send(JSON.stringify(notificacao("MENSAGEM"))))
}, 1500)*/