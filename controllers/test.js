function test(req, res) {
    return res.status(200).json('Test route is working');
}

module.exports = {
    test
};