const express = require('express');
const auth = require('../modules/auth');
const admin = require('../modules/admin');
var ObjectId = require('mongodb').ObjectID;
const { Event, validateEvents } = require('../model/Events');
const Catagory = require('../model/Category');

const router = express.Router();
// [auth, admin],
//Create Event
router.post('/', async (req, res) => {
	console.log(req.body);
	const { error } = validateEvents(req.body);
	console.log(error);
	if (error) return res.status(400).json(error);
	try {
		const {
			event_Name,
			event_Description,
			event_Location,
			adult_Ticket_Price_number,
			child_Ticket_Price_number,
			active,
		} = req.body;
		let event_category = new ObjectId(req.body.event_category);
		console.log(event_category);
		const event = new Event({
			event_Name,
			event_Description,
			event_Location,
			adult_Ticket_Price_number,
			child_Ticket_Price_number,
			active,
			event_category,
		});
		const response = await event.save();

		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
});
//auth,
// //Get Events
router.get('/', async (req, res) => {
	const events = await Event.find().sort('active');
	res.status(200).json(events);
});
router.get('/:id', async (req, res) => {
	const events = await Event.findById(req.params.id);
	res.status(200).json(events);
});

//Delete Customer
router.delete('/:id', [auth, admin], async (req, res) => {
	const event = await Event.findByIdAndDelete(req.params.id);
	res.status(200).json({ msg: 'Event Deleted' });
});

// //Update Event

router.put('/:id', [auth, admin], async (req, res) => {
	const {
		eventName,
		eventDescription,
		eventLocation,
		active,
		adultTicketPrice,
		childTicketPrice,
		catagoryId,
	} = req.body;
	const event = await Event.findById(req.params.id);

	const updateEvent = {
		eventName: eventName ? eventName : event.eventName,
		eventDescription: eventDescription
			? eventDescription
			: event.eventDescription,
		eventLocation: eventLocation ? eventLocation : event.eventLocation,
		active: active ? active : event.active,
		adultTicketPrice: adultTicketPrice
			? adultTicketPrice
			: event.adultTicketPrice,
		childTicketPrice: childTicketPrice
			? childTicketPrice
			: event.childTicketPrice,
		catagoryId: catagoryId ? catagoryId : event.catagoryId,
	};

	const updatedevent = await Event.findByIdAndUpdate(
		req.params.id,
		{
			$set: {
				eventName: updateEvent.eventName,
				eventDescription: updateEvent.eventDescription,
				eventLocation: updateEvent.eventLocation,
				active: updateEvent.active,
				adultTicketPrice: updateEvent.adultTicketPrice,
				childTicketPrice: updateEvent.childTicketPrice,
				catagoryId: updateEvent.catagoryId,
			},
		},
		{ new: true },
	);

	res.status(200).json(updatedevent);
});
module.exports = router;
