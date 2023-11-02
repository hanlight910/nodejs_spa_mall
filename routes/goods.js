const express = require("express"); //require 
const router = express.Router();

const Goods = require("../schemas/goods");

router.get("/goods/:goodsId", (req, res) => {
    res.json({ goods: goods});
});

router.get('/goods/:goodsId', (req, res) => {
  const {goodsId} = req.params;
  const [detail] = goods.filter((goods) => goods.goodsId === Number(goodsId));
  res.json({detail});   
});

router.get("/goods", async (req, res) => {
  const goods = await Goods.find({});
  res.json({ goods: goods });
});


router.post("/goods", async (req, res) => {
	const { goodsId, name, thumbnailUrl, category, price } = req.body;
    res.json({message: "새로운 상품 정보가 생성되었습니다."});
  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods: createdGoods });
});
module.exports = router;


