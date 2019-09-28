const db = require('../../_helpers/db');
const Requests = db.Requests;
const User = db.User;
const axios = require('../../_helpers/axios');

// creating user schema
function create(req, res) {
    const text = req.body.text;

    axios.get(`http://prosto.ai/api/classify/5d8e0b621f0000023d163e56`, {
        params: { text }
    })
        .then(responce => {
            const category = responce.data.categories
                .map(item => item.category)[0]
                .split(/[ ]+(?=\d)/);

            const request = {
                category: category[0].split(/[ ]+[^А-Яа-я]/)[1],
                kind: category[1]
            };

            new Requests({
                user: req.user.id,
                address: req.body.address,
                status: req.body.status,
                request: request,
                feedback: {
                    rating: req.body.rating,
                    review: req.body.review
                }
            })
                .save()
                .then(() => res.json("Completed"))
                .catch(err => res.status(404).json(err))
        })
        .catch(err => res.json(err))
}

function getAllRequests(req, res) {
    Requests.find({ user: req.user.id })
        .then(async requests => {
            if (requests) {
                for (let request of requests) {
                    request.user = await User.findById(request.user)
                }

                return res.json(requests)
            } else {
                return res.status(404).json('User is not existing')
            }
        })
        .catch(err => res.status(500).json(err))
}

function cancelRequest(req, res) {
    Requests.deleteOne({ '_id': req.params.id })
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