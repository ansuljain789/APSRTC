import mongoose from "mongoose";
import Route from "../models/Route.js";
import { Bus } from '../models/bus.js';

const getLiveBus = async (req, res) => {
  try {
    const buses = await Bus.find({});
    res.status(200).json(buses);
  } catch (error) {
    console.error('Error fetching live buses:', error);
    res.status(500).json({ error: 'Failed to fetch live bus data' });
  }
}

const busById = async (req, res) => {
  try {
    const bus = await Bus.findOne({ vehicle_id: req.params.vehicle_id });
    if (!bus) return res.status(404).json({ error: 'Bus not found' });

    const route = await Route.findOne({ route_id: bus.route_id });

    res.status(200).json({ bus, route });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bus data' });
  }
}

export { getLiveBus, busById }