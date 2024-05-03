import PostModel from "../models/Post.js";
export const createPostController = async (req, res) => {
  try {
    // const productId = req.params.id;
    const doc = new PostModel({
      // adress: req.body.adress,
      user: req.userId,

      products: req.body.products,
    });
    const post = await doc.save();
    console.log(req);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create post",
    });
  }
};

export const getAllPostController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    var sortBy = { _id: -1 };
    const items = await PostModel.find()
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit)
      .populate({ path: "user", select: ["fullName", "avatarUrl"] })
      .populate({
        path: "delivery",
        select: ["fullName", "avatarUrl"],
      })
      .exec();
    const total = await PostModel.countDocuments({});
    const responce = {
      error: false,
      total,
      page: page + 1,
      limit,
      items,
    };
    res.json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get posts ",
    });
  }
};

export const getUserPostController = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    var sortBy = { _id: -1 };
    const items = await PostModel.find({
      user: userId,
    })
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit)
      .populate({ path: "user", select: ["fullName", "avatarUrl"] })
      .populate({
        path: "delivery",
        select: ["fullName", "avatarUrl"],
      })
      .exec();
    const total = await PostModel.countDocuments({
      user: userId,
    });
    const responce = {
      error: false,
      total,
      page: page + 1,
      limit,
      items,
    };
    res.json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get posts ",
    });
  }
};

export const getOnePostController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const deliveryId = req.params.id;
    var sortBy = { _id: -1 };
    const items = await PostModel.find({
      delivery: deliveryId,
    })
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit)
      .populate({
        path: "user",
        select: ["fullName", "avatarUrl"],
      })
      .populate({
        path: "delivery",
        select: ["fullName", "avatarUrl"],
      })
      .exec();
    const total = await PostModel.countDocuments({
      delivery: deliveryId,
    });
    const responce = {
      error: false,
      total,
      page: page + 1,
      limit,
      items,
    };
    res.json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get posts ",
    });
  }
};

// export const getOnePostController = async (req, res) => {
//   try {
//     const deliveryId = req.params.id;
//     var sortBy = { _id: -1 };
//     PostModel.find(
//       {
//         delivery: deliveryId,
//       }
//     )
//       .sort(sortBy)
//       .populate({
//         path: "user",
//         select: ["fullName", "avatarUrl"],
//       })
//       .populate({
//         path: "delivery",
//         select: ["fullName", "avatarUrl"],
//       })
//       .exec()
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

export const deletePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete({
      _id: postId,
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
      message: "Failed to get posts ",
    });
  }
};

export const updatePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        status: req.body.status,
        delivery: req.userId,
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
