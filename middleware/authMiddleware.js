const JWT = require("jsonwebtoken");

async function userAuth(req, res, next){
  
  const token = req.cookies.token;
  if (!token) {
    next("Auth Failed token");
  }
  // const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.createdBy =  payload.createdBy;
    // console.log(req.userId);
    next();
  } catch (error) {
    next("Auth Failed");
  }
};

module.exports = userAuth;