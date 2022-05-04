const db = require('../model/model');
const { aggregate } = require('../services/_helper')


exports.createBlog = async (req, res) => {
    try {

        const payload = req.body;
        let options = {
            userId: req.userId,
            title: payload.title,
            description: payload.description
        };
        await db.blogModel.create(options)
      return res.status(200).json({message: `successfully created!`})
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}


exports.listBlog = async (req, res) => {
    try {
        var filter = [
            {
                $lookup: {
                    from: "users",
                    foreignField: "_id",
                    localField: "userId",
                    as: "user"
                },
               
            },

            {
                $unwind:"$user"
            }
            ,
            {
                $addFields: {
                    createBy:"$user.username"
                }
            },
            {
                $project:{
                    user:0
                }
            }
           

        ];
        const data = await aggregate(db.blogModel, filter);
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


exports.detailsBlog = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await db.blogModel.findOne({_id})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const _id = req.params.id;
        await db.blogModel.deleteOne({ _id });
        return res.status(200).json({ message: `${_id} deleted successfully` })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const _id = req.params.id;
        const payload = req.body;
        await db.blogModel.updateOne({ _id }, payload)
        return res.status(200).json({ message: `${_id} updated successfully` })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}