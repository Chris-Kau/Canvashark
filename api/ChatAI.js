import 'dotenv/config.js'
// const express = require('express');
import express from "express";
console.log(process.env.OpenAI_KEY)
// const { Configuration, OpenAIApi } = require("openai");
import OpenAI from "openai";

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Server listening")
})

const openai = new OpenAI({
    apiKey: process.env.OpenAI_KEY
})