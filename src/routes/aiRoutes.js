const r=require('express').Router(),c=require('../controllers/aiController'),{protect}=require('../middleware/authMiddleware');r.post('/generate-faq',protect,c.generate);module.exports=r;
