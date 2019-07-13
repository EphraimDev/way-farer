
const updateStatus = (req, res, next) => {
    const {
      status
    } = req.body;

    if (status && (status !== 'Active' && status !== "Ended")) {
      return res.status(400).send({ error: 'Status must either be active or ended' });
    }

    return next();
  }

  export {updateStatus};