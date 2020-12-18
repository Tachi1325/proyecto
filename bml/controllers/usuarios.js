const bcrypt = require('bcryptjs');
const { query, querySingle, execute } = require('../../dal/data-access');

const getUsuarios = async(req, res) => {
    let usuarios = await query('stp_usuarios_getall');
    if (usuarios) {
        res.json({
            status: true,
            message: 'Consulta exitoso',
            data: usuarios
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error',
            data: null
        });
    }
}

const getUsuario = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': id
    }];

    let usuario = await querySingle('stp_usuarios_getbyid', sqlParams);
    if (usuario) {
        res.json({
            status: true,
            message: 'Consulta exitoso',
            data: usuario
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error',
            data: null
        });
    }
}

const addUsuario = async(req, res) => {
    const { nombre, email, password } = req.body;
    const sqlParams1 = [{
        'name': 'email',
        'value': email
    }]

    let usuario = await querySingle('stp_usuarios_validaremail', sqlParams1);
    if (!usuario) {
        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(password, salt);
        const sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': newPassword
            },
            {
                'name': 'google',
                'value': 0
            },
            {
                'name': 'facebook',
                'value': 0
            },
            {
                'name': 'nativo',
                'value': 1
            },
            {
                'name': 'imagen',
                'value': ''
            }
        ];
        usuario = await querySingle('stp_usuarios_add', sqlParams);
        if (usuario) {
            res.json({
                status: true,
                message: 'Usuario agregado',
                data: usuario
            });
        } else {
            res.json({
                status: false,
                message: 'A ocurrido un error',
                data: null
            });
        }
    } else {
        res.json({
            status: false,
            message: 'Ya existe este email en la base de datos',
            data: null
        })
    }
}

const updateUsuario = async(req, res) => {
    const { nombre, email, password, picture } = req.body;
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'email',
            'value': email
        },
        {
            'name': 'password',
            'value': newPassword
        },
        {
            'name': 'google',
            'value': 0
        },
        {
            'name': 'facebook',
            'value': 0
        },
        {
            'name': 'nativo',
            'value': 1
        },
        {
            'name': 'imagen',
            'value': picture
        }
    ];

    let Affected = await execute('stp_usuarios_update', sqlParams);

    if (Affected != 0) {
        res.json({
            status: true,
            message: 'Usuario actualizado',
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

const deleteUsuario = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': id
    }];

    let Affected = await execute('stp_usuarios_delete', sqlParams);
    if (Affected != 0) {
        res.json({
            status: true,
            message: 'Usuario Eliminado',
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

const updatePassword = async(req, res) => {
    const { email, password } = req.body;
    const sqlParam = [{
        'name': 'email',
        'value': email
    }]
    let usuario = await querySingle('stp_usuarios_validaremail', sqlParam)
    if (usuario) {
        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(password, salt);
        const sqlParams = [{
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': newPassword
            }
        ]

        let Affected = await execute('stp_usuarios_updatepassword', sqlParams);
        if (Affected != 0) {
            res.json({
                status: true,
                message: 'Contraseña actualizada',
                data: 1
            });
        } else {
            res.json({
                status: false,
                message: 'A ocurrido un error',
                data: 0
            });
        }
    } else {
        res.json({
            status: false,
            message: 'Ya existe este email en la base de datos',
            data: null
        })
    }

}

module.exports = {
    getUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario,
    updatePassword
}