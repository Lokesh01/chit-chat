const Message = require("../models/messageModel");

const addMessage = async (req, res, next) => {
  try {
    const { sender, receiver, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [sender, receiver],
      sender,
    });

    if (data) res.status(200).json({ mssg: "Message added successfully" });
    else res.json({ mssg: "Failed to add message to database" });
  } catch (error) {
    next(error);
  }
};

const getMessage = async (req, res, next) => {
  try {
    const { sender, receiver } = req.body;
    const messages = await Message.find({
      users: {
        $all: [sender, receiver],
      },
    }).sort({ updatedAt: 1 });

    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === sender,
        message: msg.message.text,
      };
    });

    res.json(projectMessages);
  } catch (error) {
    next(error);
  }
};

module.exports = { addMessage, getMessage };
