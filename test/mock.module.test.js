import { DatabaseService } from "../service/database-service"
import { getAllProduct, getProductById } from "../src/database"

jest.mock("../src/database.js") // mock module database

// ketika menjalankan kode diatas itu akan melakukan mock satu modul sekaligus
// kalo mau partial, maka :
// jest.mock("../src/database.js", () => {
//   // mock temp actual module nya
//   const origialModule = jest.requireActual("../src/database.js")

//   return {
//     __esModule: true, // biar bs terapin es module
//     ...origialModule,
//     getAllProduct: jest.fn() // ini akan mock getAllProduct doang
//   }
// })

test("mock modules getProductById", () => {
  getProductById.mockImplementation((id) => {
    return{
      id: id,
      name: "Database Mock"
    }
  })

  const product = DatabaseService.findById(1)
  expect(product).toEqual({
    id: 1,
    name: "Database Mock"
  })
})

test("mock modules getAllProduct", () => {
  const products = [
    {
      id: 1,
      name: "Database Mock 1"
    },
    {
      id: 2,
      name: "Database Mock 2"
    }
  ]

  getAllProduct.mockImplementation(() => {
    return products
  })

  expect(DatabaseService.findAll()).toEqual(products)
})