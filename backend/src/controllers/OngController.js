const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response, nest) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(req, res, next) {
        const { name, email, whatsapp, city, uf } = req.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return res.json({ id });
    }
}