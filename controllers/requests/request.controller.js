const db = require('../../_helpers/db');
const Requests = db.Requests;
const User = db.User;
const axios = require('../../_helpers/axios');
const Nexmo = require('nexmo'),
    nexmoConf = require('../../_helpers/nexmoConfig');

// creating user schema
function create(req, res) {
    const text = req.body.text;

    axios.get(`http://prosto.ai/api/classify/5d8e0b621f0000023d163e56`, {
        params: { text }
    })
        .then(async responce => {
            const category = responce.data.categories
                .map(item => item.category)[0];

            if (category === 'nrecognized') {
                return res.status(400).json('Request is not recognized')
            } else {
                const newCategory = category.split(/[ ]+(?=\d)/);

                const request = {
                    category: newCategory[0].split(/[ ]+[^А-Яа-я]/)[1],
                    kind: newCategory[1]
                };

                const userInfo = await User.findOne({ '_id': req.user.id });

                new Requests({
                    user: req.user.id,
                    request: request,
                    address: userInfo.address
                })
                    .save()
                    .then(async result => {
                        result.user = await User.findById(result.user);
                        result.worker = await User.findById(result.worker);

                        return res.json(result)
                    })
                    .catch(err => res.status(404).json(err))
            }
        })
        .catch(err => res.json(err))
}

async function createByPhone(req, res) {
    const info = req.body;
    const text = req.body.text;

    console.log("req.body:", info);

    const user = await User.findOne({ phone });

    if (user) {
        // Nothing
    } else {
        const password = generator.generate({ length: 10, numbers: true });

        const nexmo = new Nexmo({
            apiKey: nexmoConf.apiKey,
            apiSecret: nexmoConf.apiSecret,
        });

        const from = 'Limbus';
        const to = `${phone}`;
        const text = `Your password is: ${password}   Please change it after auth.`;

        nexmo.message.sendSms(from, to, text);

        const newUser = new User({
            phone,
            address,
            password
        });

        await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => console.log(eser))
            })
        });
    }

    await axios.get(`http://prosto.ai/api/classify/5d8e0b621f0000023d163e56`, {
        params: { text }
    })
}

function getAllRequests(req, res) {
    Requests.find({ user: req.user.id })
        .then(async requests => {
            if (requests) {
                for (let request of requests) {
                    request.user = await User.findById(request.user);
                    request.worker = await User.findById(request.worker);
                }

                return res.json(requests)
            } else {
                return res.status(400).json('User is not existing')
            }
        })
        .catch(err => res.status(404).json(err))
}

function cancelRequest(req, res) {
    Requests.deleteOne({ '_id': req.params.id })
        .then( user => {
            return res.json(user)
        })
        .catch(err => console.log(err))
}

function updateStatusRequest(req, res) {
    const status = req.body.status;

    Requests.findOneAndUpdate({ '_id': req.params.id }, { status })
        .then(user => {
            if (!user) {
                return res.status(404).json('User not found')
            } else {
                return res.status(200).json('Update completed')
            }
        })
        .catch(err => res.status(500).json(err))
}

module.exports = {
    create,
    getAllRequests,
    cancelRequest,
    updateStatusRequest
};