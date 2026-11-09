// importo express
import express from 'express';
// import prisma from '../libs/prisma.js';

// creo il router
const router = express.Router();

// BASE URL /books

// index - descrive una rotta API che ci da una lista di questa risorsa
router.get('/', (req, res) => {
    console.log(error);
res.send('Lista dei libri');
});

// esporto il router
export default router;