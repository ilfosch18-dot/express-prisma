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

// SHOW - descrive una rotta API che ci permette di leggere uno specifico record di una tabella
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    /* const book = await prisma.book.findUnique({
        where: {
            id,
        }
    }); */

    // includo dati correlati usando INCLUDE
/*     const book = await prisma.book.findUnique({
        where: {
            id,
    },
    include: {
        category:true,
    }
    });
    res.json(book);
}) */
    
    // Validazione sul formato dell'ID che deve essere un intero
    // si legge se non è un intero restituisci:
    if (!Number.isInteger(id)) {
        // errore 400 bed request
        res.status(400);
        res.json({
        message: "ID invalido",
        });
          return;
    }

// includo colonne specifiche di dati usando SELECT
    const book = await prisma.book.findUnique({
        where: {
            id,
        },
        include: {
    category: {
        select: {
            id: true,
            name: true,
            },
        },
        },
    });


    // Validazione se non trova un ID nella tabella
    if (!book) {
        res.status(404)
        res.json({
        message: "ID non trovato",
        });
        return;
    }
    res.json(book);
})

// esporto il router
export default router;