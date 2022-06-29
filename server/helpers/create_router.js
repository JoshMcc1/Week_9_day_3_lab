const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const createRouter = function (collection) {

    const router = express.Router();

    // Index - GET - '/api/sightings'
    router.get('/', (req, res) => {
        collection
            .find()
            .toArray()
            .then((docs) => res.json(docs))
            .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });

    // Show - GET - '/api/sightings/:id'
    router.get('/:id', (req, res) => {
        const id = req.params.id;
        collection
            .findOne({ _id: ObjectId(id) })
            .then((doc) => res.json(doc))
            .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });

    // Create - POST - '/api/sightings'
    router.post('/', (req, res) => {
        const newSightingBody = req.body;
        collection
            .insertOne(newSightingBody)
            .then((result) => {
                res.json(result.ops[0]);
            })
            .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    })


    // Destroy - DELETE - '/api/sightings/:id'
    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        collection
            .deleteOne({ _id: ObjectId(id) })
            .then(() => collection.find().toArray())
            .then((docs) => { res.json(docs) })
            .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });


    // Update - PUT - '/api/sightings/:id'
    router.put('/:id', (req, res) => {
        const id = req.params.id;
        const updatedSightingBody = req.body;
        collection
            .updateOne({ _id: ObjectId(id) }, { $set: updatedSightingBody })
            .then(() => collection.find().toArray())
            .then((docs) => { res.json(docs) })
            .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    })

    return router;
};

module.exports = createRouter;