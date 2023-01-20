import { Router } from "express";


const router = Router();

// To check if the API server is up and running
router.get('/status', (req, res) => {
  console.log(req.url);

  res.json({ message: 'Server is live!' });
});


export default router;