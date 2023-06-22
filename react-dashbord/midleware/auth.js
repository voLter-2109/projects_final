const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prisma-client");

// midleware = некая функция проверки до запроса
const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    req.user = user;

    next();
  } catch (e) {
    return res.status(401).json({ message: "not auth" });
  }
};

module.exports = {
  auth,
};
