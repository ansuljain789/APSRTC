import { connectedCrew, io } from "../../app.js";
import { Crew } from "../../models/Crew.js";
import { Message } from "../../models/Message.js"


export const sendMessageToCrew = async (req, res) => {
  const { recipientId, content } = req.body;

  try {
    const crew = await Crew.findById(recipientId);
    if (!crew) return res.status(404).json({ message: 'Crew not found' });

    const message = new Message({ recipient: crew._id, content });
    await message.save();

    const socketId = connectedCrew.get(recipientId);
    if (socketId) {
      io.to(socketId).emit('newMessage', {
        content,
        recipientId,
        messageId: message._id,
      });
      console.log(`Sent real-time message to crew ${recipientId}`);
    }

    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err });
  }
};

export const getCrewMessages = async (req, res) => {
  const { crewId } = req.params;
  try {
    const messages = await Message.find({ recipient: crewId }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get messages', error: err });
  }
};

export const respondToMessage = async (req, res) => {
  const { id } = req.params;
  const { response } = req.body; // 'accepted' or 'rejected'

  try {
    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    if (!['accepted', 'rejected'].includes(response)) {
      return res.status(400).json({ message: 'Invalid response' });
    }

    message.status = response;
    await message.save();

    res.status(200).json({ message: `Message ${response} successfully`, data: message });
  } catch (err) {
    res.status(500).json({ message: 'Failed to respond', error: err });
  }
};
