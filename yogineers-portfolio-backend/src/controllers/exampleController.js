const ExampleModel = require('../models/exampleModel');

const getAllExamples = async (req, res) => {
    try {
        const examples = await ExampleModel.getAllExamples();
        res.json(examples);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message});
    }
}

module.exports = { getAllExamples }