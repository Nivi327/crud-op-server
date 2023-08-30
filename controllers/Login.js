const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const connection = require('./../Config');

exports.postLogin = (req, res) => {
    const { email, password } = req.body;
    connection.execute(`SELECT * FROM users WHERE email=?`,
        [email],
        function (err, result, fields) {
            if (err) {
                return res.json({ err });
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password).then((isMatched) => {
                    if (isMatched) {
                        try {
                            const token = jwt.sign({ user_id: result[0].id }, process.env.JWT_SECRET_KEY);
                            req.user = result[0];
                            req.user.password = undefined;
                            return res.json({ result, token });
                        } catch (err) {
                            return res.json({ err: err });
                        }
                    } else {
                        return res.json({ err: "Invalid Email or password" });
                    }
                })
            } else {
                return res.json({ err: "Invalid Email or password" });
            }
        }
    );
};

exports.resetPassword = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.execute(`UPDATE users SET password=? WHERE email=?`,
        [hashedPassword, email],
        function (err, result, fields) {
            if (err) {
                return res.json({ err });
            }
            if (result.affectedRows === 1 && result.changedRows === 1) {
                return res.json({ result: "Passsword Updated!" });
            } else if (result.affectedRows === 0) {
                return res.json({ err: "Invalid Email!" });
            } else {
                return res.json({ err: "Password not updated, please try again!" });
            }
        }
    )
};