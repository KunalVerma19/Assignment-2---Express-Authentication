const mongoose = require('mongoose');

const Projects = mongoose.model('Projects', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagelink: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    data: {
        type: Array
    },
    githublink: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    }
}));

exports.Projects = Projects;