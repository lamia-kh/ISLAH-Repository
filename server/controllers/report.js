const jwt = require(`jsonwebtoken`);

const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

//submit post
const submitReport = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const { location, description, categorie, image } = req.body;
  if (
    await prisma.raport.findFirst({
      where: {
        userId: decoded.userId,
        location,
        description,
        categorie,
        image,
      },
    })
  ) {
    return res.status(400).send(`this raport is already exists`);
  }

  await prisma.raport.create({
    data: {
      userId: decoded.userId,
      location,
      description,
      categorie,
      image,
    },
  });
  res.status(200).send(`Reported submitted successfully`);
};

const editReport = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const updateFields = {};

  if (req.body.location) updateFields.location = req.body.location;

  if (req.body.categorie) updateFields.categorie = req.body.categorie;

  if (req.body.image) updateFields.image = req.body.image;

  if (req.body.description) updateFields.description = req.body.description;

  if (!updateFields) return res.status(400).send("No data provided");

  await prisma.raport.update({
    where: {
      userId: decoded.userId,
      report_id: parseInt(req.params.id),
    },
    data: {
      ...updateFields,
      edited: true,
    },
  });
  res.status(200).send("Report updated successfully");
};

const deleteReport = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  await prisma.raport.delete({
    where: {
      userId: decoded.userId,
      report_id: parseInt(req.params.id),
    },
  });

  res.status(200).send("The Report has been deleted");
};

module.exports = { submitReport, editReport, deleteReport };
