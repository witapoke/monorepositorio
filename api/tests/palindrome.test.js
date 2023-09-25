const { palindrome } = require('../testingFunctions')

test.skip('palindromo de Nacho', () => {
  const result = palindrome('midudev')
  expect(result).toBe('vedudim')
})

test.skip('palindromo de string vacio', () => {
  const result = palindrome('')
  expect(result).toBe('')
})

test.skip('palindromo de undefined', () => {
  const result = palindrome()
  expect(result).toBeUndefined()
})
