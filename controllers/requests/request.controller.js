const db = require('../../_helpers/db');
const Requests = db.Requests;

// creating user schema
function create(req, res) {
    new Requests({
        user: req.user.id,
        address: req.body.address,
        status: req.body.status,
        request: req.body.request,
        feedback: {
            rating: req.body.rating,
            text: req.body.text
        }
    })
        .save()
        .then(request => res.json(request))
        .catch(err => res.status(404).json(err))
}

function getAllRequests(req, res) {
    Requests.findOne({ user: req.user.id })
        .then(user => {
            if (user) {
                return res.json(user)
            } else {
                return res.status(404).json('User is not existing')
            }
        })
        .catch(err => res.status(500).json(err))
}

function cancelRequest(req, res) {
    Requests.deleteOne({ '_id': req.body.id })
        .then( user => {
            return res.json(user)
        })
        .catch(err => console.log(err))
}

module.exports = {
    create,
    getAllRequests,
    cancelRequest
};