const getAllLocations = async () => {
    const response = await fetch('/api/locations')
    return response.json()
}

const getLocationById = async (id) => {
    const response = await fetch(`/api/locations/${id}`)
    return response.json()
}

const getEventsByLocation = async (id) => {
    const response = await fetch(`/api/locations/${id}/events`)
    return response.json()
}

export default {
    getAllLocations,
    getLocationById,
    getEventsByLocation
}
