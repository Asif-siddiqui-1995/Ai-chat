const express = require("express");
const axios = require("axios");
const Chat = require("../models/chat");

const router = express.Router();

router.post("/ask-ai", async (req, res) => {
    try {
        const {prompt} = req.body;

        if (!prompt) {
            return res.status(400).json({message: "Prompt is required"});
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "mistralai/mistral-7b-instruct:free",
                messages: [{role: "user", content: prompt}],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const aiAnswer = response.data.choices[0].message.content;

        res.json({answer: aiAnswer});
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(429).json({answer: "AI request failed"});
    }
});

router.post("/save-chat", async (req, res) => {
    try {
        const {prompt, response} = req.body;

        if (!prompt || !response) {
            return res
                .status(400)
                .json({message: "Prompt & response required"});
        }

        const chat = await Chat.create({prompt, response});

        res.json({
            message: "Chat saved successfully",
            chat,
        });
    } catch (error) {
        res.status(500).json({message: "Failed to save chat"});
    }
});

module.exports = router;
