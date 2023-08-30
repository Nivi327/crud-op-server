const bcrypt = require('bcrypt');
const connection = require('./../Config');

exports.signUp = (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10).then((hashedPassword) => {
        connection.execute(`SELECT * FROM users WHERE email=?`, [email], (er, rslt, flds) => {
            if(er) return res.json({err: "An Error Occured, Plase Try Again!"});
            if(rslt.length > 0) {
                return res.json({err: "Email Already Exists"});
            }
            connection.execute(`INSERT INTO users (email, password) VALUES (?, ?)`,
                [email, hashedPassword],
                function (err, result, fields) {
                    if (err) {
                        res.json({ err });
                    }
                    res.json({ result });
                }
            );
        });
    }).catch(err => {
        res.json({err: err.message});
    })
};