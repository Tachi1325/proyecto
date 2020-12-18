const { query, querySingle, execute } = require('../../dal/data-access');

const getDocentes = async(req, res) => {
    let docentes = await query('stp_docentes_getall');
    if (docentes) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: docentes
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error',
            data: null
        });
    }
}

const getDocente = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idDocente',
        'value': id
    }];

    let docente = await querySingle('stp_docentes_getbyid', sqlParams);
    if (docente) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: docente
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error',
            data: null
        });
    }
}

const addDocente = async(req, res) => {
    const { nombre, edad, titulo, tipo } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        }
    ];

    let Affected = await execute('stp_docentes_add', sqlParams);
    if (Affected != 0) {
        res.json({
            status: true,
            message: 'Docente agregado',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error',
            data: 1
        });
    }
}

const updateDocente = async(req, res) => {
    const { id } = req.params;
    const { nombre, edad, titulo, tipo } = req.body;
    const sqlParams = [{
            'name': 'idDocente',
            'value': id
        },
        {
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        }
    ];

    let Affected = await execute('stp_docentes_update', sqlParams);

    if (Affected != 0) {
        res.json({
            status: true,
            message: 'Docente actualizado',
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

const deleteDocente = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idDocente',
        'value': id
    }];

    let Affected = await execute('stp_docentes_delete', sqlParams);
    if (Affected != 0) {
        res.json({
            status: true,
            message: 'Docente eliminado',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error',
            dato: 0
        });
    }
}

module.exports = {
    getDocentes,
    getDocente,
    addDocente,
    updateDocente,
    deleteDocente
}