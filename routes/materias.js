const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { getMaterias, getMateria, addMateria, updateMateria, deleteMateria } = require('../bml/controllers/materias');
const { validarJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getMaterias);

router.get('/:id', validarJWT, getMateria);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('horas', 'Las horas son requeridas').not().isEmpty(),
        check('horasP', 'Las horasP son requeridas').not().isEmpty(),
        check('horasT', 'Las horasT son requeridas').not().isEmpty(),
        check('creditos', 'Los credito  son requeridos').not().isEmpty(),
        validarCampos
    ],
    addMateria);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('horas', 'Las horas son requeridas').not().isEmpty(),
        check('horasP', 'Las horasP son requeridas').not().isEmpty(),
        check('horasT', 'Las horasT son requeridas').not().isEmpty(),
        check('creditos', 'Los credito  son requeridos').not().isEmpty(),
        validarCampos
    ],
    updateMateria);

router.delete('/:id', validarJWT, deleteMateria);

module.exports = router;