const { prisma } = require("../prisma/prisma-client");
// библиотека для хеширования пароля
const brypt = require("bcrypt");
// библиотека для токенов
const jwt = require("jsonwebtoken");

// ! login
/**
 * @route POST /api/user/login
 * @desс Логин
 * @access Public
 */
// через req мы имеем доступ к header \ body / params и т.д.
// res - то что мы ответим
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email or password is not defined" });
    }

    // найдем юзера в базу prisma
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    // пароль храниться в хешированном виде
    // проверим что user существует и поступающий пароль и пароль из базы совпадает
    const isPasswordCorrect =
      user && (await brypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      console.log("token");
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }),
      });
    } else {
      return res.status(400).json({ message: "Wrong email or password" });
    }
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

// ! register
/**
 * @route POST /api/user/register
 * @desс Регистрация
 * @access Public
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Email, password and name is not defined" });
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (registeredUser) {
      return res.status(400).json({ message: "Email is used" });
    }

    // строка которая добавляется к хешированному паролю
    const salt = await brypt.genSalt(10);
    // password 123 = $2b$10$bzpNZiYCwlStawjKZypQTurP.BbJ/9dkyaioJURMWflwSW6zkkm1a
    const hashedPassword = await brypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    // строка для генерации токена
    // expiresIn через сколько токен просрочится
    const secret = process.env.JWT_SECRET;
    if (user && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: name,
        token: jwt.sign({ id: user.id }, secret, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }),
      });
    } else {
      return res.status(400).json({ message: "dont create user" });
    }
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

/**
 * @route  get /api/user/current
 * @dec текущий пользователь
 * @access Private
 */
const current = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = { login, current, register };
