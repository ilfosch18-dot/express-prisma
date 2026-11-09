function errorServerSide(err, req, res, next) {
    // next non bisogna usarlo perchè non vogliamo che vada avanti
    res.status(500);
    res.json({
        error: err.message,
    });
};


export default errorServerSide;