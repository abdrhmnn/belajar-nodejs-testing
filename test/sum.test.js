import { sum } from "../src/sum";

// untuk melakukan test secara terpisah maka `npx jest --runTestsByPath <pathFileTest.js>
// jika ingin test terpisah berdasarkan string di fungsi test nya maka `npx jest --testNamePattern "stringName"
// atau ingin lihat full dokumentasinya bisa `npx jest --help`

test('test function sum', () => {
  const result = sum(1, 2)
  expect(result).toBe(3)
})

test('test function sum 2', () => {
  const result = sum(1, 2)
  expect(result).toBe(3)
})

test('test function sum 3', () => {
  const result = sum(1, 2)
  expect(result).toBe(3)
})