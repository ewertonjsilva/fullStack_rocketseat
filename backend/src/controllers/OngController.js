const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    }, 
    async create(request, response) {
        const { ong_nome, ong_email, ong_whatsapp, ong_cidade, ong_uf } = request.body;
    
        const ong_id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            ong_id, 
            ong_nome, 
            ong_email, 
            ong_whatsapp, 
            ong_cidade, 
            ong_uf 
        });

        return response.json( {ong_id} );
    }
};

