const request = require("supertest");
const app = require("../app");
const { usersModel } = require("../models");
const { testAuthLogin, testAuthRegister } = require("./helper/helperData");
const mongoose = require("mongoose");

describe("[APP] Esta es la prueba general", ()=>{
  test("Esto deberia retornar", ()=>{
      const a = 4 
      const b = 4
      const total = a + b
      expect(total).toEqual(8) 
  })
})
/*se va a ejecutar antes de las pruebas */
/*
beforeAll(async () => {
   await usersModel.deleteMany({});
});

afterAll(()=>{
  mongoose.connection.close();
})

test("esto deberia de retornar 404", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send(testAuthLogin);
  expect(response.statusCode).toEqual(404);
});

test("esto deberia de retornar 201", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send(testAuthRegister);

  expect(response.statusCode).toEqual(201);
  expect(response.body).toHaveProperty("data");
  expect(response.body).toHaveProperty("data.token");
  expect(response.body).toHaveProperty("data.user");
});

/*
test("esto deberia de retornar password no valido 401", async () => {
  const newTestAuthLogin = {...testAuthLogin, password:"22222222"}
  const response = await request(app)
    .post("/api/auth/login")
    .send(newTestAuthLogin);
  expect(response.statusCode).toEqual(200);
});

test("esto deberia de retornar 200 login exitoso", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send(testAuthRegister);

  expect(response.statusCode).toEqual(200);
});*/
