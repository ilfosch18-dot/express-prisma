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

// STORE: creazione di un nuovo record
router.post('/', async (req, res) => {

//destrutturo
    const { title, author, price, quantity, categoryId } = req.body;

    // Verifica categoryId esistente
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId,
        }
    });
    if (!category) {
        return res.status(400).json({
            error:'CategoryId non valido',
        })
    };

    // inserimento nuovo libro
    const newBook = await prisma.book.create({
        data: {
            title,
            author,
            price,
            quantity,
        category: {
        connect: {
            id: categoryId,
        },
    },
},
        select: {
            id: true,
        },
    });
    res.status(201).json(newBook);
});

// UPDATE: userò patch perchè voglio moficare solo parzialmente un elemento specifico
router.patch('/:id', async (req, res) => {
    const id = Number(req.params.id);

    // Validazione del formato dell'id
    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "ID invalido",
        });
    }

    // destrutturo
    const { title, description, author, price, quantity, categoryId } = req.body;

    //////////// validazione se il book esiste
    const bookId = await prisma.book.findUnique({
        where: {
            id
        }
    })
    // controllo se esiste
    if (!bookId) {
        return res.status(404).json({
            error: 'Id non trovato',
        });
    }

    ///////////// validazione se la categoria esiste
    if (categoryId !== undefined) {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });
        if (!category) {
            return res.status(400).json({
                error: 'CategoryId invalida',
            });
        }
    }

    const updatedBook = await prisma.book.update({
        where: {
            id: id
        },
        data: {
            title,
            description,
            author,
            price,
            quantity,
            categoryId
        }
    });
    res.json(updatedBook);
    });

// DESTROY - cancello un libro specifico
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);

    // validazione del formato corretto dell'id
    if (!Number.isInteger(id)) {
        return res.status(400).json({
            error:"Il formato dell'id non è valido",
        })
    }

    // validazione di esistenza di un id
    const findId = await prisma.book.findUnique({
        where: {
            id,
        }
    })
    if (!findId) {
        return res.status(404).json({
            error:'Id non trovato',
        })
    }

    // Query al database
    const deletedBook = await prisma.book.delete({
        where: {
            id: id,
        }
    });

    // Risposta al client
    res.status(204).send();
});
// esporto il router
export default router;