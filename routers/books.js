// importo express
import express from 'express';
import prisma from '../libs/prisma.js';

// creo il router
const router = express.Router();

// BASE URL /books

// INDEX - descrive una rotta API che ci da una lista di questa risorsa
router.get('/', async (req, res) => {

    // leggo tutti i record della tabella books = SELECT * FROM BOOK
    //const books = await prisma.book.findMany();

    // Se non voglio tutti i record della tabella book posso usare LIMIT
   /*  const books = await prisma.book.findMany({
        take: 5,
    }); */

    // Se non voglio tutti i dati dei singoli record della tabella book posso includere SELECT
    const books = await prisma.book.findMany({
        select: {
            id: true,
            title: true,
            author: true,
            price: true,
        },
        take: 5,
    });
    res.json(books);
});

// esporto il router
export default router;