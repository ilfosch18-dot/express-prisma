// Import express
import express from "express";

// Setup
const app = express();
const port = 3000;


// Routing
app.get('/', (req,res) => {
    res.send('Questa è la home della libreria')
})

// Start server
app.listen(port, () => console.log('Il server è partito correttamente su http://localhost:' + port)
);
