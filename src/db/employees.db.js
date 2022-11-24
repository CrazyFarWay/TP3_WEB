const pool = require("./connection.db");
const TABLE='employees'

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
  e.*,
  s.from_date AS fecha_desde
FROM salaries s
    INNER JOIN employees e ON (e.emp_no = s.emp_no)
WHERE s.emp_no = ? AND s.to_date='9999-01-01'
`;
    const rows = await conn.query(SQL,[departamento.dept_no]);
    return rows[0];
  } catch (err) {
    return Promise.reject(err);
  } finally {
    if (conn) await conn.release();
  }
};
