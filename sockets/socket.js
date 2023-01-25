const { io }  = require('../index');

// Mensajes de Sockets
io.on('connection', client => {    
    console.log('Cliente Conectado')

    client.on('disconnect', () => {
        console.log('Cliente Desconectado')
    });
   
});