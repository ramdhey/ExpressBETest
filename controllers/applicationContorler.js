const Application = require("../models/Application");
const User = require("../models/User");

// User mengirimkan data lamaran
exports.createApplication = async (req, res) => {
  const {
    position_applied,
    name,
    ktp_number,
    place_of_birth,
    date_of_birth,
    gender,
    religion,
    blood_type,
    marital_status,
    address_ktp,
    address_current,
    email,
    phone_number,
    emergency_contact,
    education_details,
    training_history,
    work_experience,
    skills,
    relocation,
    expected_salary,
  } = req.body;
  const userId = req.user.id;
  

  try {
    const newApplication = await Application.create({
      position_applied,
      name,
      ktp_number,
      place_of_birth,
      date_of_birth,
      gender,
      religion,
      blood_type,
      marital_status,
      address_ktp,
      address_current,
      email,
      phone_number,
      emergency_contact,
      education_details, 
      training_history,
      work_experience, 
      skills,
      relocation,
      expected_salary,
      status: "waiting",
      userId,
    });

    res.status(201).json({
      status: 201,
      message: "Lamaran berhasil dikirim",
      data: newApplication,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 500, message: "Error saat mengirim lamaran", error });
  }
};

// Admin mengupdate status lamaran
exports.updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const application = await Application.findByPk(id);

    if (!application) {
      return res
        .status(404)
        .json({ status: 404, message: "Lamaran tidak ditemukan" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      status: 200,
      message: "Status lamaran berhasil diperbarui",
      data: application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error saat memperbarui status lamaran",
      error,
    });
  }
};

// User melihat daftar lamarannya sendiri
exports.getUserApplications = async (req, res) => {
  const userId = req.user.id;

  try {
    const applications = await Application.findAll({ where: { userId } });

    if (!applications.length) {
      return res.status(404).json({
        status: 404,
        message: "Tidak ada lamaran yang ditemukan untuk user ini.",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Daftar lamaran berhasil diambil",
      data: applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error saat mengambil daftar lamaran",
      error,
    });
  }
};

// Admin melihat semua lamaran
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll();

    if (!applications.length) {
      return res.status(404).json({
        status: 404,
        message: "Tidak ada lamaran yang ditemukan.",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Daftar semua lamaran berhasil diambil",
      data: applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error saat mengambil daftar lamaran",
      error,
    });
  }
};

// User melihat detail lamaran berdasarkan ID
exports.getApplicationById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const application = await Application.findOne({ where: { id, userId } });

    if (!application) {
      return res.status(404).json({
        status: 404,
        message: "Lamaran tidak ditemukan atau Anda tidak memiliki akses.",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Detail lamaran berhasil diambil",
      data: application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error saat mengambil detail lamaran",
      error,
    });
  }
};

// Admin melihat detail lamaran berdasarkan ID tanpa batasan userId
exports.getApplicationByIdForAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await Application.findByPk(id);

    if (!application) {
      return res
        .status(404)
        .json({ status: 404, message: "Lamaran tidak ditemukan" });
    }

    res.status(200).json({
      status: 200,
      message: "Detail lamaran berhasil diambil",
      data: application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error saat mengambil detail lamaran",
      error,
    });
  }
};

// Admin mengedit data lamaran
exports.editApplication = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const application = await Application.findByPk(id);

    if (!application) {
      return res
        .status(404)
        .json({ status: 404, message: "Lamaran tidak ditemukan" });
    }

    await application.update(updates);

    res.status(200).json({
      status: 200,
      message: "Lamaran berhasil diperbarui",
      data: application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error saat memperbarui lamaran",
      error,
    });
  }
};

// Admin menghapus data lamaran
exports.deleteApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await Application.findByPk(id);

    if (!application) {
      return res
        .status(404)
        .json({ status: 404, message: "Lamaran tidak ditemukan" });
    }

    await application.destroy();

    res.status(200).json({
      status: 200,
      message: "Lamaran berhasil dihapus",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error saat menghapus lamaran",
      error,
    });
  }
};
