import express from 'express';
import cors from 'cors';

export const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(cors());

