const axios = require('axios')

module.exports = async (numbers) => {
    const result = await axios.post(`http://localhost:8081/sum`, numbers)
    return result.data.sum
}