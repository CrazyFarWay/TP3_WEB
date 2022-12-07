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

// POST /api/v1/empleados/:id/salarios
router.post('/:id/salarios',checkEmployee,async (req,res)=>{    
    const newSalary = req.body.salary;
    if(!newSalary){
        res.status(400).send('Campo requerido en el body -> "salary"');
        return
    }

    const salaries = await DB.Employees.getSalariosEmpleado(res.locals.employee);
    let lastModifyDate = salaries.pop().to_date.toISOString().substring(0, 10); //.substring(0, 10); to Truncate the GMT format
    let currentDate = new Date().toISOString().substring(0, 10);

    if (lastModifyDate == currentDate) {
        res.status(422).send('No se puede modificar el sueldo de un empleado más de una vez al día');
        return
    }

    const isAddOk = await DB.Employees.addEmployeeSalary(res.locals.employee, newSalary);
    if(isAddOk){
        const salaries = await DB.Employees.getSalariosEmpleado(res.locals.employee);
        res.status(200).json(salaries)
    }else{
        res.status(500).send('Falló al agregar un salario!!!')
    }
});

// GET /api/v1/empleados/:id/salarios
router.get('/:id/salarios',checkEmployee,async (req,res)=>{    
    const salaries = await DB.Employees.getSalariosEmpleado(res.locals.employee);
    res.status(200).json(salaries)
});

// POST /api/v1/empleados/:id/departamentos
router.post('/:id/departamentos',checkEmployee,async (req,res)=>{    
    const newDepartmentId = req.body.departmentId;
    if(!newDepartmentId){
        res.status(400).send('Campo requerido en el body -> "departmentId"');
        return
    }

    const departments = await DB.Departments.getEmployeeDepartments(res.locals.employee);
    let lastDepartment = departments.pop().dept_no;

    if (lastDepartment == newDepartmentId) {
        res.status(422).send('No se puede mover a un empleado más de una vez al día');
        return
    }

    const isAddOk = await DB.Employees.addEmployeeDepartment(res.locals.employee, newDepartmentId);
    if(isAddOk){
        const departments = await DB.Departments.getEmployeeDepartments(res.locals.employee);
        res.status(200).json(departments)
    }else{
        res.status(500).send('Falló al agregar un departamento!!!')
    }
});

module.exports=router