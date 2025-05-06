const Pet = require('../models/pet.model');
const Notification = require('../models/notification.model');

exports.getAllPets = async (req, res) => {
    try {
        const { id } = req.user;
        const pets = await Pet.findAll({
            where: {
                user_id: id
            }
        });
        return res.status(200).json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.createPet = async (req, res) => {
    const { id } = req.user;
    const { name, breed, age } = req.body;

    try {
        const newPet = await Pet.create({ 
            user_id: id,
            name,
            type: 'Dog',
            breed,
            age,
            vaccination_status: 'Not vaccinated',
            chip_id: null
        });

        Notification.create({
            user_id: id,
            message: `New pet added: ${name}`,
            type: 'Info',
            is_read: false
        });

        return res.status(201).json(newPet);
    } catch (error) {
        console.error('Error creating pet:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}