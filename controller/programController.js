const pool = require("../config/db");

async function getAllPrograms(req, res) {
  const userId = req.createdBy; // Assuming user ID is obtained from authentication

  try {
    const result = await pool.query(
      "SELECT * FROM programs WHERE userid = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getProgramById(req, res) {
  const programId = req.params.id;
  const userId = req.createdBy; // Assuming user ID is obtained from authentication

  try {
    const result = await pool.query(
      "SELECT * FROM programs WHERE id = $1 AND userid = $2",
      [programId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching program by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function createProgram(req, res) {
  const userId = req.createdBy; // Assuming user ID is obtained from authentication
  const {
    name,
    price,
    domain,
    program_type,
    registrations_status,
    description,
    placement_assurance,
    image_url,
    university_name,
    faculty_profile,
    learning_hours,
    certificate_diploma,
    eligibility_criteria,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO programs (name, price, domain, program_type, registrations_status, description, placement_assurance, image_url, university_name, faculty_profile, learning_hours, certificate_diploma, eligibility_criteria, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
      [
        name,
        price,
        domain,
        program_type,
        registrations_status,
        description,
        placement_assurance,
        image_url,
        university_name,
        faculty_profile,
        learning_hours,
        certificate_diploma,
        eligibility_criteria,
        userId,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating program:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateProgram(req, res) {
  const programId = req.params.id;
  const userId = req.createdBy; // Assuming user ID is obtained from authentication
  const {
    name,
    price,
    domain,
    program_type,
    registrations_status,
    description,
    placement_assurance,
    image_url,
    university_name,
    faculty_profile,
    learning_hours,
    certificate_diploma,
    eligibility_criteria,
  } = req.body;

  try {
    const result = await pool.query(
      "UPDATE programs SET name = $1, price = $2, domain = $3, program_type = $4, registrations_status = $5, description = $6, placement_assurance = $7, image_url = $8, university_name = $9, faculty_profile = $10, learning_hours = $11, certificate_diploma = $12, eligibility_criteria = $13 WHERE programid = $14 AND userid = $15 RETURNING *",
      [
        name,
        price,
        domain,
        program_type,
        registrations_status,
        description,
        placement_assurance,
        image_url,
        university_name,
        faculty_profile,
        learning_hours,
        certificate_diploma,
        eligibility_criteria,
        programId,
        userId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating program:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteProgram(req, res) {
  const programId = req.params.id;
  const userId = req.createdBy; // Assuming user ID is obtained from authentication

  try {
    const result = await pool.query(
      "DELETE FROM programs WHERE programid = $1 AND userid = $2 RETURNING *",
      [programId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting program:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
};
