const getAiRes = require('../services/googleAi.service');


const getReview = async (req, res) => {
    const { code, language } = req.body;

    if (!code || !language) {
        res.status(400).json({
            success: false,
            message: "Please write the code"
        });
    }

    const prompt = `
        language: ${language},
        code: ${code}
    `
    const review = await getAiRes(prompt);

    res.status(200).json({
        success: true,
        review
    });

}


module.exports = getReview