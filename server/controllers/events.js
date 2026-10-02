import { pool } from '../config/database.js'

// date and time are formatted by Postgres so the client gets display-ready strings
const eventColumns = `
    id,
    title,
    TO_CHAR(date, 'Mon DD, YYYY') AS date,
    TO_CHAR(time, 'HH12:MI AM') AS time,
    image,
    location_id
`

const getEvents = async (req, res) => {
    try {
        const results = await pool.query(`SELECT ${eventColumns} FROM events ORDER BY events.date, events.time`)
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const results = await pool.query(`SELECT ${eventColumns} FROM events WHERE id = $1`, [req.params.eventId])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }

        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const results = await pool.query(
            `SELECT ${eventColumns} FROM events WHERE location_id = $1 ORDER BY events.date, events.time`,
            [req.params.locationId]
        )
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getEvents,
    getEventById,
    getEventsByLocation
}
