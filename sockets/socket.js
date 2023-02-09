const { io }  = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) => {    
    
    // Cliente conectado y traemos el uid del cliente
    console.log('Cliente Conectado')    
    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token']);
    
    // Verificar autenticacion
    if ( !valido ) { return client.disconnect();}

    // Cliente autenticado
    usuarioConectado( uid );
    
    // Ingresar al usuario a una sala en particular
    client.join( uid );

    // Escichar del cliente el mensaje-personal
    client.on('mensaje-personal', async( payload ) => {
        await grabarMensaje( payload );
        io.to( payload.para ).emit('mensaje-personal', payload );
    })

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });
   
});