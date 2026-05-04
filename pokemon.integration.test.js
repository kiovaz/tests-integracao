const axios = require('axios');

const BASE = 'https://pokeapi.co/api/v2';

test('GET /pokemon/pikachu retorna dados válidos', async () => {
  const { data, status } = await axios.get(`${BASE}/pokemon/pikachu`);

  expect(status).toBe(200);
  expect(data.name).toBe('pikachu');
  expect(data.types).toBeInstanceOf(Array);
  expect(data.types.length).toBeGreaterThan(0);
});

test('Paginação de /pokemon retorna next e results', async () => {
  const { data } = await axios.get(`${BASE}/pokemon?limit=10&offset=0`);

  expect(data.results).toHaveLength(10);
  expect(data.next).toMatch(/offset=10/);
});

test('Pokémon inexistente retorna 404', async () => {
  await expect(axios.get(`${BASE}/pokemon/fakemon999`))
    .rejects.toMatchObject({ response: { status: 404 } });
});
