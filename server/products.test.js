import add from "./products.mjs"



test('2 melons ajoutés', () => {
  expect(add("melon", 2)).toBe(3);
});