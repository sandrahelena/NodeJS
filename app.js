/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
var server = app.listen(80, function(){
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);

/* criando variável global */
app.set('io', io);

 /*criar a conexão por websocket*/
io.on('connection', function(socket){
   console.log('Usuário conectou');

   socket.on('disconnect', function(){
     console.log('Usuário desconectou');
   });

   socket.on('msgParaServidor', function(data){
     /* diálogo */
     /* atualizar relação de participantes de quem clicou em msgParaCliente */
       socket.emit(
         'msgParaCliente',
         {apelido: data.apelido, mensagem: data.mensagem}
       );
       /* atualiza a relação de participantes para todos os restantes que estiverem no mesmo socket */
       socket.broadcast.emit(
         'msgParaCliente',
         {apelido:data.apelido, mensagem: data.mensagem}
       );

     /* Participantes */
      if (parseInt(data.apelido_atualizado_nos_clientes) == 0){
       /* atualizar relação de participantes de quem clicou em participantesParaCliente */
       socket.emit(
         'participantesParaCliente',
         {apelido: data.apelido}
       );
       /* atualiza a relação de participantes para todos os restantes que estiverem no mesmo socket */
       socket.broadcast.emit(
         'participantesParaCliente',
         {apelido:data.apelido}
       );
     }

   });
});
