const router = require('express').Router();
const Users = require('./users-model');

router.get('/', async (req, res) => {
	try {
		const user = await Users.find();
		res.json(user);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Unable to retrieve users',
		});
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const user = await Users.findById(id);
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({
				message: `User with ID ${id} does not exist`,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).sjon({
			message: 'Unable to retieve the specified user',
		});
	}
});

router.get('/:id/plants', async (req, res) => {
	const { id } = req.params;
	try {
		const plant = await Users.findPlants(id);
		res.json(plant);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: `Plant with ID ${id} is missing`,
		});
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const update = await Users.update(id, changes);
		if (update) {
			res.json(update);
		} else {
			res.status(404).json({
				message: 'Invalid Id',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Unable to retrieve plants',
		});
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const count = await Users.remove(id);
		if (count) {
			res.json({
				message: `Deleted ${count} records from db`,
			});
		} else {
			res.status(404).json({
				message: 'invalid id',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Unable to retrieve plants',
		});
	}
});

module.exports = router;
