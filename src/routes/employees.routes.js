const express = require('express');
const router = express.Router();
const DB = require('../db');

/**
 * Middleware para verificar que existe el departamento con parámetro id
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 * @returns 
 */
async function checkEmployee(req,res,next){
    const employee = await DB.Employees.getById(req.params.id);
    if(!employee){        
        return res.status(404).send('Empleado no encontrado!!!')
    }
    // se guarda el objeto encontrado en la propiedad locals
    // para que pueda ser usado en los siguientes eslabones de la cadena
    res.locals.employee=employee;
    next();
}

// GET /api/v1/empleados
router.get('/',async (req,res)=>{
    const employees = await DB.Employees.getAll();    
    res.status(200).json(employees)
});

// GET /api/v1/empleados/:id/salarios
router.get('/:id/salarios',checkEmployee,async (req,res)=>{    
    const salaries = await DB.Employees.getSalariosEmpleado(res.locals.employee);
    res.status(200).json(salaries)
});

module.exports=router