const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const products = require("../../static/product");

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const found = products.some(
    (product) => product.id === parseInt(req.params.id)
  );
  if (found) {
    res.json(
      products.filter((product) => product.id === parseInt(req.params.id))
    );
  } else {
    res.status(400);
    res.json({
      msg: `No Product with ID of ${parseInt(req.params.id)}`,
    });
  }
});

router.post("/", (req, res) => {
  const new_product = {
    id: uuid.v4(),
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    qtyAvailable: req.body.qtyAvailable,
    dataCreate: products.length,
  };

  if (
    !new_product.title ||
    !new_product.description ||
    !new_product.category ||
    !new_product.price ||
    !new_product.qtyAvailable
  ) {
    return res
      .status(400)
      .json({ msg: "include a p_name, p_price, p_instock and a p_desc" });
  }

  products.push(new_product);
  res.json(products);
  //   res.send(req.body);
});

router.put("/:id", (req, res) => {
  const found = products.some(
    (product) => product.id === parseInt(req.params.id)
  );
  if (found) {
    const upProduct = req.body;
    const upProduct2 = req.body.dataCreate;
    console.log(upProduct2);
    products.forEach((product) => {
      if (product.id === parseInt(req.params.id)) {
        product.title = upProduct.title ? upProduct.title : product.title;
        product.description = upProduct.description
          ? upProduct.description
          : product.description;
        product.category = upProduct.category
          ? upProduct.category
          : product.category;
        product.price = upProduct.price ? upProduct.price : product.price;
        product.updated = upProduct.updated
          ? (upProduct.updated = true)
          : (product.updated = true);
        // product.updated = true;

        res.json({ msg: "The Product Update ", product });
      } else {
        res
          .status(400)
          .json({ msg: "No member with the id of " + parseInt(req.params.id) });
      }
    });
  } else {
    res.status(400);
    res.json({
      msg: `No Product with ID of ${parseInt(req.params.id)}`,
    });
  }
});

router.delete("/:id", (req, res) => {
  const found = products.some(
    (product) => product.id === parseInt(req.params.id)
  );
  if (found) {
    res.json({
      msg: "Product Deleted",
      products: products.filter(
        (product) => product.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400);
    res.json({
      msg: `No Product with ID of ${parseInt(req.params.id)}`,
    });
  }
});

module.exports = router;
