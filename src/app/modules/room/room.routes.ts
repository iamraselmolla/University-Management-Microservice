// src/routes/roomRoutes.ts
import express from 'express';
import * as roomController from './room.services';

const router = express.Router();

// Create Room
router.post('/', roomController.createRoom);

// Get Room by ID
router.get('/:id', roomController.getRoomById);

// Get All Rooms
router.get('/', roomController.getAllRooms);

// Update Room
router.put('/:id', roomController.updateRoom);

// Delete Room
router.delete('/:id', roomController.deleteRoom);

export const RoomRouter = router;
