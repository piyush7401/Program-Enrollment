const JWT = require("jsonwebtoken");

async function userAuth(req, res, next){
  
  const token = req.cookies.token;
  if (!token) {
    next("Auth Failed token");
  }
  // const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.SECRET);
    req.createdBy =  payload.createdBy;
    console.log(req.createdBy);
    console.log(payload);
    next();
  } catch (error) {
    next("Auth Failed");
  }
};

module.exports = userAuth;