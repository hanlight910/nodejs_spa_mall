const express = require("express"); //require 
const router = express.Router();

const Goods = require("../schemas/goods");

router.get('/goods/:goodsId', (req, res) => {
  const {goodsId} = req.params;
  const goods = Goods.find({}) 
  const [detail] = goods.filter((goods) => goods.goodsId === Number(goodsId));
  res.json({detail});   
});

router.get("/goods", async (req, res) => {
  const goods = await Goods.find({});
  res.json({ goods: goods });
});

const Cart = require("../schemas/cart.js");
router.post("/goods/:goodsId/cart", async(req,res) => {
  const {goodsId} = req.params;
  const {quantity} = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    return res.status(400).json({ 
      success: false, 
      errorMessage: "이미 장바구니에 존재하는 상품입니다." 
    });
  }


  await Cart.create({ goodsId: Number(goodsId), quantity: quantity });

  res.json({ result: "success" });
} )

router.put("/goods/:goodsId/cart", async(req,res) => {
  const {goodsId} = req.params;
  const {quantity} = req.body;

  const existsCarts = await Cart.find({ goodsId});
  if (existsCarts.length) {
    await Cart.updateOne(
      {goodsId: goodsId},
      {$set: {quantity:quantity}}
      )
  }
  res.status(200).json({success:true});
})
router.delete("/goods/:goodsId/cart", async(req, res) => {
  const {goodsId} = req.params;

  const existsCarts = await Cart.find({goodsId});
  if(existsCarts.length){
    await Cart.deleteOne({goodsId});
  }
  res.json({result:"success"});
})

router.post("/goods", async (req, res) => {
	const { goodsId, name, thumbnailUrl, category, price } = req.body;
  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ 
      success: false,
      errorMessage: "이미 있는 데이터입니다." 
    });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods: createdGoods });
});
module.exports = router;


