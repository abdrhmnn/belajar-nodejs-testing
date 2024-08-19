import { sum } from "../src/sum";

// untuk melakukan test secara terpisah maka `npx jest --runTestsByPath <pathFileTest.js>
// jika ingin test terpisah berdasarkan string di fungsi test nya maka `npx jest --testNamePattern "stringName"
// atau ingin lihat full dokumentasinya bisa `npx jest --help`

test('test function sum', () => {
  const result = sum(1, 2)
  expect(result).toBe(3)
})

test('test function sum 2', () => {
  const result = sum(1, 9)
  expect(result).toBe(10)
})

test('test function sum 3', () => {
  const result = sum(1, 2)
  expect(result).toBe(3)
})

test('test objek 1', () => {
  const result = {
    nama: 'abdu',
    city: 'jkt'
  }
  Object.assign(result, { hobby: 'tidu' })

  expect(result.city).toBe("jkt")

  // ini sama seperti `==`
  // atau seperti pengecekan objek
  expect(result).toEqual({ nama: 'abdu', city: 'jkt', hobby: 'tidur' })
})

// truthiness matcher testing
test("test null", () => {
  const result = null;

  expect(result).toBeNull()
  expect(result).toBeFalsy()
  expect(result).toBeDefined()
})

// number matcher testing
test("test number", () => {
  const result = 2 + 2;

  expect(result).toBeGreaterThan(3);
  expect(result).toBeGreaterThanOrEqual(4);
  expect(result).toBeLessThan(5);
  expect(result).toBeLessThanOrEqual(4.5);
})

// string matcher testing
test("test string", () => {
  const result = "test_string";

  expect(result).toBe("test_string")
  // expect(result).toMatch(/stop/) // check by regex
})

// array matcher testing
test("test array", () => {
  const result = ["20", true, 100, ["abdu"], {nama: "abdu"}];

  expect(result).toContain(true);
  // untuk pengecekan contain data tipe array
  expect(result).toContainEqual(["abdu"]);
  expect(result).toContainEqual({ nama: "abdu" });
})

// exception matcher testing
function compileAndroidCode(name) {
  if(name == "Abdu"){
    throw new Error('Exception is happening! :)');
  }else{
    return {
      msg: "OK"
    }
  }
}

test("test exception", () => {
  expect(() => compileAndroidCode("Abdu")).toThrow()
  expect(() => compileAndroidCode("Eunha")).toThrow("Hallow")
})

// not matcher testing
test("test not string", () => {
  const result = "abdu"

  // kebalikan kondisi testing
  expect(result).not.toBe("eunha")
  expect(result).not.toBeNull()
})

// async flow testing
function sayHello(name){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(name){
        resolve(`Hello ${name}`)
      }else{
        reject("Name is empty!")
      }
    }, 1000)
  })
}

test("test async", async () => {
  const response = await sayHello("abdu")

  // jadi jest ini akan menunggu proses testing async nya selesai
  expect(response).toBe("Hello abdu")

  // bisa disatukan kondisi resolve atau reject dengan fungsi expect (async matchers)
  await expect(sayHello("abdu")).resolves.toBe('Hello abdu');
  await expect(sayHello()).rejects.toBe('Name is empty!');
})

// setup function
// fungsi ini akan execute sebelum unit test dijalankan
// jika ada 5 unit test maka fungsi ini juga akan dijalankan sebanyak 5 kali
beforeEach(() => {
  console.info("Before Each berjalan!")
});

// implementasi nya sama seperti beforeEach, hanya saja dijalankan setelah testing
afterEach(() => {
  console.info("After Each berjalan!")
});

// kalo pengen kondisi fungsi nya hanya di execute sekali di sebelum dan sesudah semua unit test berjalan
// kalo ada case async maka tinggal tambahkan keyword `async`
beforeAll(() => {
  console.info("Before All berjalan tapi hanya sekali!")
});

afterAll(() => {
  console.info("After All berjalan tapi hanya sekali!")
});