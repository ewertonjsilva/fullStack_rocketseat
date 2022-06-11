const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { ong_id } = request.body;

        const ong = await connection('ongs')
            .where('ong_id', ong_id)
            .select('ong_nome')
            .first();

        if (!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        return response.json(ong);
    }
}

