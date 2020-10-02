//const { Movie } = require('../models/index');

const get = (req) => {
    const { _id } = req.params;
    const options = _id ? _id : req.query;
    
    const method = _id ? 'findById' : 'find';
    return 'Filme encontrado';
};

const create = (req) => {
    const { body } = req;
    return 'Filme criado';
}

module.exports = {
    create,
    get,
};
