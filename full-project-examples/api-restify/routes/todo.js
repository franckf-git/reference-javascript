'use strict';

const express = require('express');
const router = express.Router();
const Tasks = require('../models/Todo');

router.route('/tasks')
    //list_all_tasks
    .get(function (req, res) {
        Tasks.find({}, function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    })
    //create_a_task
    .post(function (req, res) {
        let new_task = new Tasks(req.body);
        new_task.save(function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    });

router.route('/tasks/:taskId')
    //read_a_task
    .get(function (req, res) {
        Tasks.findById(req.params.taskId, function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    })
    //update_a_task
    .put(function (req, res) {
        Tasks.findOneAndUpdate({
            _id: req.params.taskId
        }, req.body, {
            new: true
        }, function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    })
    //delete_a_task
    .delete(function (req, res) {
        Tasks.remove({
            _id: req.params.taskId
        }, function (err, task) {
            if (err)
                res.send(err);
            res.json({
                message: 'Tache supprimée'
            });
        });
    });

module.exports = router;