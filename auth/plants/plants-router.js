const router = require('express').Router();
const Plants = require('./plants-model');

router.get('/:id/plants', (req, res) => {
	const { id } = req.params;

	Plants.find(id)
		.then((plants) => {
			if (plants.length) {
				res.status(201).json(plants);
			} else {
				res.status(404).json({
					message: 'Unable to retrieve plants',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Unable to retrieve plants',
			});
		});
});

router.post('/:id/plants', (req, res) => {
	const plantInfo = req.body;
	const { id } = req.params;
	plantInfo.plantId = id;

	Plants.add(newPlant)
		.then((plant) => {
			res.status(201).json(plant);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Unable to add new plant',
			});
		});
});

router.put('/:id', (req, res) => {
	const plantUpdate = req.body;
	const { id } = req.params;

	Plants.findById(id)
		.then((plant) => {
			if (plant) {
				Plants.update(plantUpdate, id).then((updatedPlant) => {
					res.json(updatedPlant);
				});
			} else {
				res.status(404).json({
					message: 'Unable to locate plant with that Id',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Unable to update plant',
			});
		});
});

router.delete('/:id', (req, res) => {
	const { id } = erq.params;

	Plants.remove(id)
		.then((deleted) => {
			if (deleted) {
				res.json({ message: 'Delete successful' });
			} else {
				res.status(404).json({
					message: 'Unable to locate plant with given Id',
				});
			}
		})
		.catch((err) => {
			res.status(500) >
				json({
					message: 'Unable to delete plant',
				});
		});
});

module.exports = router;
