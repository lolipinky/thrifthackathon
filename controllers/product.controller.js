import Product from "../models/product.model.js";


// create product
export const createProduct = async(req, res, next) =>{
    try{
        const { name, description, price, category,images, stock } = req.body;
        
        const productDoc = await Product.create({
            name,
            description,
            price,
            category,
            images,
            stock
        })
         res.status(201).json({success: true, product: productDoc});

    }catch(error){
        next(error)
    }
}

// get  all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product
      .find()
      .populate("category");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//get one product

export const getProduct = async (req, res) => {
  try {
    const singleProduct = await Product
      .findById(req.params.id)
      .populate("category")

    if (!singleProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(singleProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//update product

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//delete product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
