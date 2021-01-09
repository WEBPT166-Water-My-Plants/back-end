const router = require('express').Router();
const Plants = require('./plants-model');

router.get('/', (req, res) => {
	const { id } = req.params;

	Plants.getPlants(id)
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

router.post('/plants', (req, res) => {
	const plantInfo = req.body;
	const { id } = req.params;
	plantInfo.userId = id;

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

router.put('/:userId/plants/:id', (req, res) => {
	const plantUpdate = req.body;
	const { userId, id } = req.params;
	console.log(userId, 'This is the user ID')
	console.log(id, 'Plant ID')

	Plants.findById(id)	
		.then((plant) => {
			if (plant) {
				Plants.editPlant(plantUpdate, id, userId).then((updatedPlant) => {
					res.json(updatedPlant);
				})
				.catch(err => {
					console.log(err)
				})
			} else {
				res.status(404).json({
					message: 'Unable to locate plant with that Id',
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: 'Unable to update plant',
			});
		});
});

router.delete('/plants/:id', (req, res) => {
	const { id } = req.params;

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
