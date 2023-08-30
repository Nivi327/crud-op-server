const path = require('path');
const fs = require('fs');

const connection = require('../Config');

exports.getAllPosts = (req, res) => {
    const user_id = req.user.user_id;
    connection.execute(`SELECT * from posts WHERE user_id=?`, [user_id], (err, result, fields) => {
        if (err) {
            return res.json({ err });
        }
        res.json({ result });
    });
};

exports.getUserPost = (req, res) => {
    const id = req.params.id;
    connection.execute(`SELECT * from posts WHERE id=?`, [id], (err, result, fields) => {
        if (err) {
            return res.json({ err });
        }
        res.json({ result });
    })
};

exports.addUserPost = (req, res) => {
    if (!(req.file && req.file.filename)) {
        return res.json({ err: "File is required!" });
    }
    const filename = req.file.filename;
    const user_id = req.user.user_id;
    const { content } = req.body;
    connection.execute(`INSERT INTO posts (user_id, image, content) VALUES (?, ?, ?)`, [user_id, filename, content], (err, result, fields) => {
        if (err) {
            return res.json({ err });
        }
        res.json({
            result: "Data inserted"
        });
    })
};

exports.updateUserPost = (req, res) => {
    if (!(req.file && req.file.filename)) {
        return res.json({ err: "File is Required!" });
    }
    const filename = req.file.filename;
    const id = req.params.id;
    const { content } = req.body;
    connection.execute(`UPDATE posts SET content=?, image=? WHERE id=?`, [content, filename, id], (err, result, fields) => {
        if (err) {
            return res.json({ err });
        }
        res.json({
            result: "Rows updated"
        });
    })
};

exports.deleteUserPost = (req, res) => {
    const id = req.params.id;
    connection.execute(`SELECT image from posts WHERE id=?`, [id], (err, rslt, flds) => {
        const image = rslt[0].image;
        const cur_path = path.join(__dirname, '../', 'images', image);
        fs.unlink(cur_path, (error) => {
            if (error) return res.json({ err: "Some Error Occured, Please Try again!" })
            connection.execute(`DELETE from posts WHERE id=?`, [id], (err, result, fields) => {
                if (err) {
                    return res.json({ err });
                }
                res.json({
                    result: "Data Deleted"
                });
            })
        })
    })
};