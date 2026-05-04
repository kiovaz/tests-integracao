const axios = require('axios');

const BASE = "https://pokeapi.co/api/v2/pokemon";

test('PokeAPI: GET /pokemon/bulbasaur valida id, base_experience e abilities', async () => {
    const {data,status} = await axios.get(`${BASE}/bulbasaur`);

    expect(status).toBe(200);
    expect(data.id).toBe(1);
    expect(data.base_experience).toBeGreaterThan(0);
    expect(Array.isArray(data.abilities)).toBe(true);
    expect(data.abilities.length).toBeGreaterThanOrEqual(1);
});

