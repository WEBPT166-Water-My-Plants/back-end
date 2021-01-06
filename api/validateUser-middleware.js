module.exports = async function (req, res, next) {
    const id = parseInt(req.params.id)
    if (id === req.decoded.subject) {
        next()
    } else {
        res.status(403).json({
            message: 'You are not authorized to view this content'
        })
    }
}