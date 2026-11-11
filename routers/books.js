// importo express
import express from 'express';

// Qui prisma non viene più usato quindi posso cancellarlo
// import prisma from "../libs/prisma.js";


// importo il controller
import {index,show,store,patch,destroy} from '../controllers/bookController.js';

// creo il router
const router = express.Router();

// BASE URL /books

// INDEX - descrive una rotta API che ci da una lista di questa risorsa
router.get('/', index);

// SHOW - descrive una rotta API che ci permette di leggere uno specifico record di una tabella
router.get('/:id', show);

// STORE: creazione di un nuovo record
router.post('/', store);

// UPDATE: userò patch perchè voglio moficare solo parzialmente un elemento specifico
router.patch('/:id', patch);

// DESTROY - cancello un libro specifico
router.delete('/:id', destroy);
    

// esporto il router
export default router;