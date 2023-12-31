const VehiclePersistence = require('../../use_cases/vehiclePersistence');
const NotFoundError = require('../../utils/notFoundError');

class VehicleController {
    constructor() {
        this.vehiclePersistence = new VehiclePersistence();
    }

    async createVehicle(req, res) {
        try {
            const vehicle = await this.vehiclePersistence.create(req.body);
            res.status(201).json(vehicle);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateVehicle(req, res) {
        try {
            const { id } = req.params;
            const updatedVehicle = await this.vehiclePersistence.update(id, req.body);
            res.status(200).json(updatedVehicle);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteVehicle(req, res) {
        try {
            const { id } = req.params;
            await this.vehiclePersistence.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    
    async getById(req, res) {
        try {
            const { id } = req.params;
            const vehicle = await this.vehiclePersistence.getById(id);
            res.status(200).json(vehicle);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(404).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async getByLicensePlate(req, res) {
        try {
            const { licensePlate } = req.params;
            const vehicle = await this.vehiclePersistence.getByLicensePlate(licensePlate);
            res.status(200).json(vehicle);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(404).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async getAllVehicles(req, res) {
        try {
            const vehicles = await this.vehiclePersistence.getAllVehicles();
            res.status(200).json(vehicles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = VehicleController;
