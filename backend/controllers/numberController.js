numberController = {}

numberController.getNumber = (req, res) => {
    console.log(req.body);
    res.status(200).json({message: 'Get'});
}

numberController.postNumber = (req, res) => {
    console.log(req.body);
    res.status(200).json({message: 'Post'});
}




module.exports = numberController;