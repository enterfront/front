const delay = (ms = 1000) => (req, res, next) => {
    setTimeout(next, ms)
}

module.exports = delay
