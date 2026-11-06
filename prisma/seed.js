import 'dotenv/config';
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/index.js";

// creo il setup del client
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Avvio seeding');
    // rimuovo i dati precedenti
    await prisma.category.deleteMany();
    // genero le categorie
    const categoriesName = ['Avventura', 'Azione', 'Anime', 'Sport', 'Storia', 'Fantascienza'];

    await prisma.category.createMany({
        data: categoriesName.map((cat) => ({
            name: cat,
        }))
    });

    // SELECT * FROM category
    const categories = await prisma.category.findMany();
    console.log(categories);

    // genero dei prodotti
}

main().catch(e => {
    console.log(e);
    process.exit(1); // 1 sta per indicare: chiudi il processo con un errore
}).finally(() => prisma.$disconnect()); // chiude la connessione al database
