const paginator = (itemsPerPage = 100) => (req: any, res, next) => {

    let p = 0;
    let q = itemsPerPage;

    if (req.query.p) p = parseInt(req.query.p) - 1;
    if (req.query.q) q = parseInt(req.query.q)

    req.paginator = {}
    req.paginator.page = p;
    req.paginator.size = q

    delete req.query.p
    delete req.query.q

    next();
}


export default paginator;