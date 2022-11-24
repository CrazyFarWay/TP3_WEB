const pool = require("./connection.db");
const TABLE='employees'

/**
 * Retorna todos los empleados
 * @returns 
 */
module.exports.getAll = async function () {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`SELECT * FROM ${TABLE} e `);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  } finally {
    if (conn) await conn.release();
  }
};

/**
 * Retorna un departamento por su clave primaria
 * @returns 
 */
module.exports.getById = async function (id) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`SELECT * FROM ${TABLE} d WHERE emp_no=?`,[id]);
    return rows[0];
  } catch (err) {
    return Promise.reject(err);
  } finally {
    if (conn) await conn.release();
  }
};

/**
 * Retorna el listado de salarios de un empleado
 * @param {Object} empleado 
 * @returns 
 */
 module.exports.getSalariosEmpleado = async function (empleado) {
  let conn;
  try {
    conn = await pool.getConnection();
    const SQL=`
SELECT 
  *
FROM salaries s
WHERE s.emp_no = ? 
`;
    const rows = await conn.query(SQL,[empleado.emp_no]);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  } finally {
    if (conn) await conn.release();
  }
};
