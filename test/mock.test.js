// Mock adalah objek tiruan yg kita buat sendiri, yg tingkah lakunya menyerupai dengan object aslinya
// Mock objek ini cocok untuk membuat unit testing yg berhubungan dgn sistem lain
// seperti dgn db, payment gateway, dll

// jenis mocking yg support di jest untuk saat ini :
// mock function
// mock class
// mock modules

// mock function
function calculate(number, cb){
  let total = 0;
  for (const element of number) {
    total += element
  }

  cb(total)
}

function calculateWithReturn(number, cb){
  let total = 0;
  for (const element of number) {
    total += element
  }

  return cb(total)
}

test("mock function test", () => {
  const mock = jest.fn();

  calculate([10, 10, 10], mock)
  calculate([10, 10, 10, 10, 10], mock)

  console.info(mock.mock.calls) // check pengen liat urutan pemanggilan mock function nya
  expect(mock.mock.calls[0][0]).toBe(30) // check pemanggilan pertama mock function dan expect value nya
  expect(mock.mock.calls[1][0]).toBe(50) // check pemanggilan kedua mock function dan expect value nya
})

test("mock function test with return value", () => {
  const mock = jest.fn()

  // bikin mock return nya
  mock.mockReturnValueOnce(30)
  mock.mockReturnValueOnce(50)

  expect(calculateWithReturn([10, 10, 10], mock)).toBe(30)
  expect(calculateWithReturn([10, 10, 10, 10, 10], mock)).toBe(50)

  expect(mock.mock.results[0].value).toBe(30);
  expect(mock.mock.results[1].value).toBe(50);

  // bisa juga bikin implementasi nya langsung dri mock function
  mock.mockImplementation((total) => {
    return total * 2
  })

  expect(calculateWithReturn([10, 10, 10], mock)).toBe(60)
  expect(calculateWithReturn([10, 10, 10, 10, 10], mock)).toBe(90)
})

// mock function with async
async function getBalance(name, from){
  const balance = await from()
  return { name: name, balance: balance }
}

test("mock async function test", async () => {
  const mock = jest.fn()
  mock.mockResolvedValueOnce(1000) // mock return khusus utk promise

  await expect(getBalance("Abdu", mock)).resolves.toEqual({
    name: "Abdu",
    balance: 1000
  })

  expect(mock.mock.calls.length).toBe(1)
  await expect(mock.mock.results[0].value).resolves.toBe(1000)

  // expect with failure case
  mock.mockRejectedValueOnce("Rejected")
  await expect(getBalance("Abdu", mock)).rejects.toBe("Rejected")
})

test.failing("mock async expect error case", async () => {
  const mock = jest.fn()
  mock.mockRejectedValueOnce(new Error("Error!"))

  await expect(getBalance("Abdu", mock))
})

// mock matchers
test("mock matchers", () => {
  const mock = jest.fn()

  calculate([10, 10, 10], mock)
  calculate([10, 10, 10, 10, 10], mock)

  // expect fungsi mock dia berjalan brp kali, test pemanggilan dgn args, dll
  expect(mock).toHaveBeenCalled()
  expect(mock).toHaveBeenCalledTimes(2)
  expect(mock).toHaveBeenCalledWith(30)
  expect(mock).toHaveBeenCalledWith(50)
})