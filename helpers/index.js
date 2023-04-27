const jwt = require('jsonwebtoken')

const checkUserAndGenerateToken = (data, req, res) => {
jwt.sign({email: data.email, id: data._id}, 'tokenSecret', {expiresIn: '1d'}, (err, token) => {
  if(err){
    res.status(400).json({message: err, status: false})
  }else{
    res.status(200).json({message: 'Login Successfully!', token, status: true})
  }
})
}

module.exports = {
  checkUserAndGenerateToken
}