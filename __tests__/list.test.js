process.env.NODE_ENV = "test";
const request = require("supertest");
let list = require("../fakeDb");


const app = require("../app");

let product = { name: "cheese", price:"50" };

beforeEach(function () {
  list.push(product);
});

afterEach(function () {
  list = [];
});


describe("GET all items in list", () => {
  test("list all items", async function () {
    const response = await request(app).get(`/list`);
    expect(response.statusCode).toBe(200);
    expect(list).toHaveLength(1);
  });
});

describe("GET a name from list", () => {
  test("Get name of item", async function () {
    const response = await request(app).get(`/list/get/${product.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item.name).toEqual("cheese");
  });
});

describe("POST items to list", () => {
  test("Adds a new item", async function () {
    const response = await request(app).post(`/list/post`).send({name: "Ham", price: 10});
    expect(response.statusCode).toBe(201);
    expect(response.body.list[1].name).toEqual("Ham");
    expect(response.body.list[1].price).toEqual(10);
  });
});

describe("PATCH updating a name in list", () => {
  test("Updates a single item", async function () {
    const response = await request(app).patch(`/list/update/${product.name}`).send({name: "Bread"});
    expect(response.statusCode).toBe(200);
    expect(response.body.item.name).toEqual("Bread");
  });
});

describe("PATCH updating a price in list", () => {
  test("Updates a single item", async function () {
    const response = await request(app).patch(`/list/update/price/${product.price}`).send({price: 10});
    expect(response.statusCode).toBe(200);
    expect(response.body.item.price).toEqual(10);
  });
});

describe("DELETE a item from list", () => {
  test("Deletes a single a item", async function () {
    const response = await request(app).delete(`/list/delete/${product.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});