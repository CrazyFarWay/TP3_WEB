require("dotenv").config();
const app = require("../src/app");
const request = require("supertest");

describe("Rest API Empleados", () => {
  it("GET /api/v1/empleados", async () => {
    const response = await request(app).get("/api/v1/empleados");
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    const deptos = response.body;
    expect(deptos.length).toBeGreaterThan(0);
  });

  it("GET /api/v1/empleados/110022/salarios", async () => {
    const response = await request(app).get("/api/v1/empleados/110022/salarios");
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);

    const salaries = response.body;
    expect(salaries).toBeDefined();
    expect(salaries.length).toBeGreaterThan(0);
    salaries.forEach(element => {
      expect(element.emp_no).toBeDefined();
      expect(element.emp_no).toBe(110022);
    });
  });

  it("POST /api/v1/empleados/110022/salarios", async () => {
    const responseGet = await request(app).get("/api/v1/empleados/10018/salarios");
    const salariesBefore = responseGet.body;

    const response = await request(app).post("/api/v1/empleados/10018/salarios")
    .send({"salary": 300});

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);

    const salaries = response.body;
    expect(salaries).toBeDefined();
    expect(salaries.length).toBeGreaterThan(0);
    salaries.forEach(element => {
      expect(element.emp_no).toBeDefined();
      expect(element.emp_no).toBe(10018);
    });

    expect(salaries.length).toBeGreaterThan(salariesBefore.length);

    const lastSalary = salaries.pop();
    const lastSalaryAfter = salaries.pop();

    //expect(lastSalaryAfter.to_date).toBe(new Date().toISOString());
    //expect(lastSalaryAfter.from_date).toBe(new Date().toISOString());
    //expect(lastSalary.to_date).toBe("9999-01-01T03:00:00.000Z");
  });

  it("POST /api/v1/empleados/110022/departamentos", async () => {
    // Comprobar que existe empleado
    // Comprobar que existe departamento destino
    // Compobar que el depto destino sea distinto al depto actual del empleado

    const response = await request(app).post("/api/v1/empleados/10015/departamentos")
    .send({"departmentId": "d006"});

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);


    const departments = response.body;
    expect(departments).toBeDefined();

    //expect(departments.length).toBeGreaterThan(departmentsBefore.length);

    const lastDepartmentAfter = departments.pop();
    const lastDepartmentBefore = departments.pop();

    //expect(lastDepartmentBefore.to_date).toBe(new Date().toISOString());
    //expect(lastDepartmentAfter.from_date).toBe(new Date().toISOString());
    //expect(lastDepartmentAfter.to_date).toBe("9999-01-01T03:00:00.000Z");
  });
});
