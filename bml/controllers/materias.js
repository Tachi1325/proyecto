const { query, querySingle, execute } = require('../../dal/data-access');

const getMaterias = async(req, res) => {
    let materias = await query('stp_materias_getall');
    if (materias) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: materias
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error',
            data: null
        });
    }
}

const getMateria = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idMateria',
        'value': id
    }];

    let materia = await querySingle('stp_materias_getbyid', sqlParams);
    if (materia) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: materia
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error',
            data: null
        });
    }
}

const addMateria = async(req, res) => {
    const { nombre, horas, creditos, horasP, horasT } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'horas',
            'value': horas
        },
        {
            'name': 'horasP',
            'value': horasP
        },
        {
            'name': 'horasT',
            'value': horasT
        },
        {
            'name': 'creditos',
            'value': creditos
        }
    ];

    let rowsAffected = await execute('stp_materias_add', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Materia agregada',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error',
            data: 0
        });
    }
}

const updateMateria = async(req, res) => {
    const { id } = req.params;
    const { nombre, horas, creditos, horasP, horasT } = req.body;
    const sqlParams = [{
            'name': 'idMateria',
            'value': id
        },
        {
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'horas',
            'value': horas
        },
        {
            'name': 'horasP',
            'value': horasP
        },
        {
            'name': 'horasT',
            'value': horasT
        }, ,
        {
            'name': 'creditos',
            'value': creditos
        }
    ];

    let rowsAffected = await execute('stp_materias_update', sqlParams);

    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Materia actualizada',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error',
            data: 0
        });
    }
}

//Borrar materia
const deleteMateria = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idMateria',
        'value': id
    }];

    let rowsAffected = await execute('stp_materias_delete', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Materia eliminada',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error',
            data: 0
        });
    }
}

module.exports = {
    getMaterias,
    getMateria,
    addMateria,
    updateMateria,
    deleteMateria
}