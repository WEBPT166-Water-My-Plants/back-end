const router = require('express').Router();

let currentTime = new Date().toLocaleString();
router.get('/test', (req, res) => {
	res.status(200).json({
		status: 200,
		message: 'GET /test is working',
		time: currentTime,
		author: 'GH PLisak777',
	});
});

module.exports = router;
