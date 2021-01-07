const router = require('express').Router();
const Users = require('./users-model');

router.get('/users', (req, res) => {
	Users.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.send(err);
		});
});

router.get('/:id/plants', (req, res) => {
	const { id } = req.params;

	Users.findPlants(id)
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
	plantInfo.userId = id;

	Users.addPlant(plantInfo)
		.then((plant) => {
			res.status(201).json(plant);
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				message: 'Failed to add new plant',
			});
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	Users.remove(id)
		.then((deleted) => {
			if (deleted) {
				res.status(200).json({
					message: 'Deleted user',
				});
			} else {
				res.status(404).json({
					message: 'User with that Id not found',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Unable to delete user',
			});
		});
});

module.exports = router;
