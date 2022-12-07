require("dotenv").config();
const app = require("../src/app");
const request = require("supertest");

describe("Rest API Empleados", () => {
  it("GET /api/v1/empleados", async () => {
    const response = await request(app).get("/api/v1/empleados");
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    const employees = response.body;
    expect(employees.length).toBeGreaterThan(0);
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

  it("GET /api/v1/empleados/110022/salarios", async () => {
    const response = await request(app).get("/api/v1/empleados/adfd/salarios");
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(400);
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

    const lastSalaryAfter = salaries.pop();
    const lastSalaryBefore = salariesBefore.pop();

    expect(lastSalaryBefore.to_date).toBe(new Date().toISOString());
    expect(lastSalaryAfter.from_date).toBe(new Date().toISOString());
    expect(lastSalaryAfter.to_date).toBe("9999-01-01T03:00:00.000Z");
  });

  it("POST /api/v1/empleados/110022/salarios", async () => {
    const response = await request(app).post("/api/v1/empleados/asvc/salarios")
    .send({"salary": 300});

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(400);
  });

  it("POST /api/v1/empleados/110022/departamentos", async () => {
    const responseGet = await request(app).get("/api/v1/empleados/10018/departamentos");
    const departmentsBefore = responseGet.body;
    expect(departmentsBefore).toBeDefined();

    const response = await request(app).post("/api/v1/empleados/10018/departamentos").send({"departmentId": "d002"});

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);

    const departments = response.body;
    expect(departments).toBeDefined();

    console.log("CANTIDAD DE REGISTROS");
    console.log(departments.length, departmentsBefore.length);
    expect(departments.length).toBeGreaterThan(departmentsBefore.length);

    const lastDepartmentAfter = departments.pop();
    const lastDepartmentBefore = departmentsBefore.pop();
    const currentDate = new Date().toISOString().substring(0, 10);

    expect(lastDepartmentBefore.to_date.toISOString().substring(0, 10)).toBe(currentDate);
    expect(lastDepartmentAfter.from_date.toISOString().substring(0, 10)).toBe(currentDate);
    expect(lastDepartmentAfter.to_date.toISOString().substring(0, 10)).toBe("9999-01-01");
  });

  it("POST /api/v1/empleados/0000/departamentos", async () => {
    const response = await request(app).post("/api/v1/empleados/0000/departamentos").send({"departmentId": "d002"});
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(404);
  });

  it("POST /api/v1/empleados/10018/departamentos", async () => {
    const response = await request(app).post("/api/v1/empleados/10018/departamentos").send({"departmentId": "d002"});
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(422);
  });
});
