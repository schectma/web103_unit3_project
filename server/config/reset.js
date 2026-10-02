import './dotenv.js'
import { pool } from './database.js'

const locations = [
    { name: 'Echo Lounge', address: '323 Singleton Blvd', city: 'Dallas', state: 'TX', zip: '75212', image: 'https://picsum.photos/seed/echolounge/800/600' },
    { name: 'House of Blues', address: '2200 N Lamar St', city: 'Dallas', state: 'TX', zip: '75202', image: 'https://picsum.photos/seed/houseofblues/800/600' },
    { name: 'The Pavilion', address: '1818 First Ave', city: 'Dallas', state: 'TX', zip: '75210', image: 'https://picsum.photos/seed/pavilion/800/600' },
    { name: 'American Airlines Center', address: '2500 Victory Ave', city: 'Dallas', state: 'TX', zip: '75219', image: 'https://picsum.photos/seed/americanairlines/800/600' }
]

const events = [
    { title: 'Indie Night', date: '2026-10-09', time: '20:00', image: 'https://picsum.photos/seed/indienight/600/600', location_id: 1 },
    { title: 'Synthwave Sundays', date: '2026-10-18', time: '19:30', image: 'https://picsum.photos/seed/synthwave/600/600', location_id: 1 },
    { title: 'Blues Brunch', date: '2026-10-11', time: '11:00', image: 'https://picsum.photos/seed/bluesbrunch/600/600', location_id: 2 },
    { title: 'Soul Revue', date: '2026-10-24', time: '21:00', image: 'https://picsum.photos/seed/soulrevue/600/600', location_id: 2 },
    { title: 'Summer Send-Off Festival', date: '2026-09-12', time: '16:00', image: 'https://picsum.photos/seed/sendoff/600/600', location_id: 3 },
    { title: 'Country Under the Stars', date: '2026-10-17', time: '19:00', image: 'https://picsum.photos/seed/country/600/600', location_id: 3 },
    { title: 'Arena Rock Revival', date: '2026-10-31', time: '20:00', image: 'https://picsum.photos/seed/arenarock/600/600', location_id: 4 },
    { title: 'Pop Spectacular', date: '2026-11-14', time: '19:30', image: 'https://picsum.photos/seed/popspectacular/600/600', location_id: 4 }
]

const createTables = async () => {
    const createTablesQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(2) NOT NULL,
            zip VARCHAR(10) NOT NULL,
            image VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            image VARCHAR(255) NOT NULL,
            location_id INTEGER NOT NULL REFERENCES locations(id)
        );
    `

    try {
        await pool.query(createTablesQuery)
        console.log('🎉 locations and events tables created successfully')
    }
    catch (err) {
        console.error('⚠️ error creating tables', err)
    }
}

const seedTables = async () => {
    await createTables()

    // sequential so the serial ids line up with the order above
    for (const location of locations) {
        try {
            await pool.query(
                'INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)',
                [location.name, location.address, location.city, location.state, location.zip, location.image]
            )
            console.log(`✅ ${location.name} added successfully`)
        }
        catch (err) {
            console.error('⚠️ error inserting location', err)
        }
    }

    for (const event of events) {
        try {
            await pool.query(
                'INSERT INTO events (title, date, time, image, location_id) VALUES ($1, $2, $3, $4, $5)',
                [event.title, event.date, event.time, event.image, event.location_id]
            )
            console.log(`✅ ${event.title} added successfully`)
        }
        catch (err) {
            console.error('⚠️ error inserting event', err)
        }
    }

    await pool.end()
}

seedTables()
