const axios = require('axios');

const BASE = "https://api.open-meteo.com/v1/forecast";

test('Open-Meteo API returns weather data for Belém/PA', async () => {
    const { data, status } =
        await axios.get(`${BASE}?latitude=-1.45&longitude=-48.5&hourly=temperature_2m`);

    expect(status).toBe(200);

    expect(data).toHaveProperty('hourly');
    expect(data).toHaveProperty('hourly_units');
    expect(data).toHaveProperty('latitude');
    expect(data).toHaveProperty('longitude');
    expect(data).toHaveProperty('timezone');


    expect(typeof data.latitude).toBe('number');
    expect(typeof data.longitude).toBe('number');
    expect(typeof data.timezone).toBe('string');

})

test('Open-Meteo: sem hourly não retorna bloco hourly', async () => {
    const { data, status } =
        await axios.get(`${BASE}?latitude=-1.45&longitude=-48.5`);

    expect(status).toBe(200);

    expect(data).not.toHaveProperty('hourly');
    expect(data).not.toHaveProperty('hourly_units');
})



test('Open-Meteo: hourly.temperature_2m tem 168 itens e são números ou null', async () => {
    const { data, status } =
        await axios.get(`${BASE}?latitude=-1.45&longitude=-48.5&hourly=temperature_2m`);

    expect(status).toBe(200);

    expect(data).toHaveProperty('hourly');
    expect(data.hourly).toHaveProperty('temperature_2m');
    expect(Array.isArray(data.hourly.temperature_2m)).toBe(true);
    expect(data.hourly.temperature_2m.length).toBe(168);

    data.hourly.temperature_2m.forEach(value => {
        expect(typeof value === 'number' || value === null).toBe(true);
    });
})


test('Open Meteo: Teste de unidades de medida para temperature_2m, precipitation e windspeed_10m', async () => {
    const { data, status } = await axios.get(`${BASE}?latitude=-1.45&longitude=-48.5&hourly=temperature_2m,precipitation,windspeed_10m`);

    expect(status).toBe(200);

    expect(data).toHaveProperty('hourly_units');

    ['temperature_2m', 'precipitation', 'windspeed_10m'].forEach((key) => {
        expect(data.hourly_units).toHaveProperty(key);
        expect(data.hourly_units[key]).toEqual(expect.any(String));
        expect(data.hourly_units[key].length).toBeGreaterThan(0);
    });
})

test('Open Meteo: Teste de cache/performance', async () => {
    const start1 = Date.now();
    await axios.get(`${BASE}?latitude=-1.45&longitude=-48.5&hourly=temperature_2m,precipitation,windspeed_10m`);
    const end1 = Date.now();
    const duration1 = end1 - start1;

    const start2 = Date.now();
    await axios.get(`${BASE}?latitude=-1.45&longitude=-48.5&hourly=temperature_2m,precipitation,windspeed_10m`);
    const end2 = Date.now();
    const duration2 = end2 - start2;

    expect(duration2).toBeLessThanOrEqual(duration1 * 2);
})


