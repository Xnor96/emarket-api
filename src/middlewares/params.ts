const { Validator } = require('jsonschema');
const v = new Validator();

const validateParams = (schema) => (req, res, next) => {

    let params = {};

    if (req.method == "GET") params = req.query;
    else if (req.method == "POST") params = req.body;
    else if (req.method == "PUT") params = req.body;

    if (Object.keys(params).length == 0){
        res.status(400).send({error: 1, message: 'ERROR: Sin datos para procesar'});
        return;
    } 

    const d = v.validate(params, schema);

    if (d.valid == false) {

        res.status(400).send({ error: 1, message: d.errors.map(e => e.stack).join(', ') });
        return;
    }

    next();
}

export default validateParams;