// importo express
import express from 'express';

// creo il router
const router = express.Router();

// BASE URL /books

// index - descrive una rotta API che ci da una lista di questa risorsa
router.get('/', (req,res) => {
res.send('Lista dei libri');
});

// esporto il router
export default router;