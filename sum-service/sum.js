module.exports = (numbers) => {
    return numbers ? numbers.reduce((a, b) => a + b, 0) : 0
}