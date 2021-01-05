const router = require('express').Router();
const Plants = require('./plants-model');

router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const plant = await Plants.findById(id);
		if (plant) {
			res.json(plant);
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

router.get('/:id/plants', async (req, res) => {
	const { id } = req.params;

	try {
		const content = await Plants.findPlants(id);
		res.json(content);
	} catch (err) {
		console.log(500).json({
			message: 'Error retrieving plants',
		});
	}
});

router.post('/:id/plants', async (req, res) => {
	const plant = req.body;

	try {
		const saved = await Plants.add(plant);
		res.status(201).json(saved);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id/plants/', async (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const updatedPlant = await Plants.update(id, changes);
		if (updatedPlant) {
			res.json(updatedPlant);
		} else {
			res.status(404).json({
				message: 'Invalid Id',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Unable to update plant',
		});
	}
});

router.delete('/:id/plants/', async (req, res) => {
	const { id } = req.params;

	try {
		const count = await Plants.remove(id);
		if (count) {
			res.json({
				message: `Deleted ${count} records`,
			});
		} else {
			res.status(404).json({
				message: 'Invalid Id',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Unable to delete plant',
		});
	}
});

module.exports = router;
