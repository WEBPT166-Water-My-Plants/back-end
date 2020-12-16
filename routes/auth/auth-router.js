const router = require('express').Router()
const bcrypt = require('bcryptjs')

const db = require('./auth-model')

router.use('/api/auth', getUser)

router.post('/login', async (req, res, next) => {
    const { user } = req
    if (!user) {
        res.status(404).json({
            message: 'Invalid username'
        })
    } else {
        const { password } = req.body
        if (password) {
            try {
                if (bcrypt.compareSync(password, req.password)) {
                    res.status(200).json(user)
                } else {
                    res.status(400).json({
                        message: 'Invalid password'
                    })
                }
            } catch (err) {
                next(err)
            }
        } else {
            res.status(400).json({
                message: 'Missing password'
            })
        }
    }
})

router.post('/register', async (req, res, next) => {
    if (req.user) {
        res.status(400).json({
            message: 'Username already exists'
        })
    } else {
        const user = req.body
        if (!user.username || !user.password) {
            res.status(400).json({
                message: 'Missing username or password'
            })
        } else {
            try {
                const hashed = bcrypt.hashSync(user.password, 12)
                user.password = hashed
                const { password, ...newUser } = await db.registerUser(user)
                res.status(201).json(newUser)
            } catch (err) {
                next(err)
            }
        }
    }
})

async function getUser(req, res, next) {
    const { username } = req.body;
    if (username) {
        try {
            const result = await db.getUserByUsername(req.body.username)
            if (!result)
                next()
            else {
                const { password, ...user } = result
                req.password = password
                req.user = user
                next()
            }
        } catch (err) {
            next(err)
        }
    } else {
        res.status(400).json({
            message: 'Missing username'
        })
    }
}

module.exports = router;