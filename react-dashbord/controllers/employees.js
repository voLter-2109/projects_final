const { prisma } = require("../prisma/prisma-client");
// библиотека для хеширования пароля
const brypt = require("bcrypt");
// библиотека для токенов
const jwt = require("jsonwebtoken");

/**
 * @route GET /api/employees
 * @dec получение всех
 * @access Private
 */
const allEmployees = async (req, res) => {
  console.log(req.baseUrl);
  console.log(req._parsedUrl.query);
  try {
    const employees = await prisma.employees.findMany();

    res.status(201).json(employees);
  } catch {
    res.status(500).json({ message: "Не удалось получить сотрудников" });
  }
};

// baseUrl: '/api/employees',
//   originalUrl: '/api/employees?sort=desc',
//   _parsedUrl: Url {
//     protocol: null,
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: '?sort=desc',
//     query: 'sort=desc',
//     pathname: '/',
//     path: '/?sort=desc',
//     href: '/?sort=desc',
//     _raw: '/?sort=desc'

/**
 * @route GET /api/employees/add
 * @dec добавление пользователя
 * @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    if (!data.firstName || !data.lastName || !data.adress || !data.age) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }

    const employee = await prisma.employees.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

/**
 *
 * @route POST /api/employees/remove
 * @desc удаление сотрудника
 * @access PRIVATE
 */

const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.employees.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({ message: "не удалось удалить сотруника" });
  }
};

/**
 *
 * @route PUT /api/employees/edit
 * @desc редактирование сотрудника
 * @access PRIVATE
 */
const edit = async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;
    const employee = await prisma.employees.update({
      where: {
        id,
      },
      data,
    });

    res.status(200).json({ message: "OK" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "не удалсь отредактировать пользователя" });
  }
};

/**
 *
 * @route GET /api/employees/:id
 * @desc выбрать сотрудника
 * @access PRIVATE
 */
const employee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employees.findUnique({
      where: {
        id,
      },
    });

    res.status(201).json(employee);
  } catch (error) {}
};

module.exports = {
  allEmployees,
  add,
  remove,
  edit,
  employee,
};
