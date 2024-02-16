const verify = async (req,res) => {
    const user = req.user
    res.status(200).send({user})  

}

module.exports = {
    verify
}