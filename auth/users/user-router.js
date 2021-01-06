const router = require('express').Router();
const db = require('../users/users-model');

const idCheck = require('../../api/id-check-middleware');
const validateUser = require('../../api/validateUser-middleware');

router.use(require('../restricted-middleware'));

router.use('/:id', idCheck('id', 'user', 'users', 'id'));
router.use('/:id/plants/:pId', idCheck('pId', 'plant', 'plants', 'id'));

/* GET /api/ */

router.get('/:id', async (req, res, next) => {
	const { password, ...user } = req.user;
	res.status(200).json(user);
});

router.get('/:id/plants', async (req, res, next) => {
	const { id } = req.params;
	try {
		const plants = await db.getPlants(id);
		res.status(200).json(plants);
	} catch (err) {
		next(err);
	}
});

router.post('/:id/plants', validateUser, async (req, res, next) => {
	const { id } = req.params;
	let { id, nickname, species, h20Frequency, plantId, ...rest } = req.body;

	if (!isEmpty(rest)) {
		res.status(400).json({
			message: 'Unable to add new plant',
		});
	} else if (nickname && species && plantId !== undefined) {
		try {
			req.body = {
				nickname,
				species,
				plantId,
			};
			const plants = await db.addPlant({ ...req.body, plantId: id });
			res.status(201).json(plants);
		} catch (err) {
			next(err);
		}
	} else {
		res.status(400).json({
			message: 'Missing required field',
		});
	}
});

router.put('/:id/plants/:pId', validateUser, async (req, res, next) => {
	const { pId } = req.params;
	const plant = { ...req.plant, ...req.body };
	const { id, nickname, species, plantId, h20Frequency, ...rest } = plant;

	if (!isEmpty(rest)) {
		res.status(400).json({
			message: 'Unable to edit plant',
		});
	} else {
		try {
			const edited = await db.editPlant(pId, plant);
			res.status(200).json(edited);
		} catch (err) {
			next(err);
		}
	}
});

router.delete('/:id/plants/pId', validateUser, async (req, res, next) => {
	const { pId } = req.params;
	try {
		const count = await db.removePlant(pId);
		if (count > 0) {
			res.status(204).end();
		} else {
			next(`Failed to delete plant ${tId}`);
		}
	} catch (err) {
		next(err);
	}
});

module.exports = router;
