exports.logOut = (req, res) => {
    req.headers.authorization = '';
    req.user = {};
    res.json({result: "Logged out successfully"});
};