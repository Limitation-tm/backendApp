import ProductModel from "../models/Product.js";
export const createProductController = async (req, res) => {
  try {
    const doc = new ProductModel({
      title: req.body.title,
      // text: req.body.text,
      typeListId: req.body.typeListId,
      sizeList: req.body.sizeList,
      price: req.body.price,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
      // tags: req.body.tags,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    ProductModel.findOneAndDelete({
      _id: productId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        res.json(doc);
      })
      .catch((err) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Error return article",
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get products ",
    });
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 12;
    const search = req.query.search || "";
    let sort = req.query.sort || "price";
    let category = req.query.category || 0;
    const categoryOptions = [1, 2, 3, 4, 5, 6, 7];
    category === 0
      ? (category = [...categoryOptions])
      : (category = req.query.category);
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    const products = await ProductModel.find({
      title: { $regex: search, $options: "i" },
    })
      .where("category")
      .in([...category])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);
    // .populate({ path: "user", select: ["fullName", "avatarUrl"] })
    // .exec();
    const total = await ProductModel.countDocuments({
      category: { $in: [...category] },
      title: { $regex: search, $options: "i" },
    });
    const responce = {
      error: false,
      total,
      page: page + 1,
      limit,
      categories: categoryOptions,
      products,
    };
    res.json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get products ",
    });
  }
};

export const getOneProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    ProductModel.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    )
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        res.json(doc);
      })
      .catch((err) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Error return article",
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get products ",
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    ProductModel.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        title: req.body.title,
        // text: req.body.text,
        typeListId: req.body.typeListId,
        sizeList: req.body.sizeList,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        // tags: req.body.tags,
        user: req.userId,
      }
    )
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        res.json({ success: true });
      })
      .catch((err) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Error return article",
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get posts ",
    });
  }
};

// export const getOnePostController = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     PostModel.findOneAndUpdate(
//       {
//         _id: postId,
//       },
//       {
//         $inc: { viewsCount: 1 },
//       },
//       {
//         returnDocument: "after",
//       }
//     )
//       .then((doc) => {
//         if (!doc) {
//           return res.status(404).json({
//             message: "Article not found",
//           });
//         }

//         res.json(doc);
//       })
//       .catch((err) => {
//         if (err) {
//           console.log(err);

//           return res.status(500).json({
//             message: "Error return article",
//           });
//         }
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Failed to get posts ",
//     });
//   }
// };

// export const deletePostController = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     PostModel.findOneAndDelete({
//       _id: postId,
//     })
//       .then((doc) => {
//         if (!doc) {
//           return res.status(404).json({
//             message: "Article not found",
//           });
//         }

//         res.json(doc);
//       })
//       .catch((err) => {
//         if (err) {
//           console.log(err);

//           return res.status(500).json({
//             message: "Error return article",
//           });
//         }
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Failed to get posts ",
//     });
//   }
// };

// export const updatePostController = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     PostModel.findOneAndUpdate(
//       {
//         _id: postId,
//       },
//       {
//         title: req.body.title,
//         text: req.body.title,
//         imageUrl: req.body.imageUrl,
//         tags: req.body.tags,
//         user: req.userId,
//       }
//     )
//       .then((doc) => {
//         if (!doc) {
//           return res.status(404).json({
//             message: "Article not found",
//           });
//         }

//         res.json({ success: true });
//       })
//       .catch((err) => {
//         if (err) {
//           console.log(err);

//           return res.status(500).json({
//             message: "Error return article",
//           });
//         }
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Failed to get posts ",
//     });
//   }
// };

//   PostModel.findOneAndUpdate(
//     { _id: postId },
//     { $inc: { viewsCount: 1 } },
//     { returnDocument: "after" },
//     (error, doc) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({
//           message: "Failed to get posts ",
//         });
//       }
//       if (!doc) {
//         return res.status(404).json({
//           message: "Post is not found",
//         });
//       }
//       res.json(doc);
//     }
//   );
// } catch (error) {
//   console.log(error);
//   res.status(500).json({
//     message: "Failed to get posts ",
//   });
// }
