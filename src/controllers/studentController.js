const { ObjectId } = require("mongodb");
const db = require("../config/db");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

async function createStudent(req, res) {
  try {
    // Création d'un nouvel étudiant
    const student = {
      ...req.body,
      enrolledCourses: [], // Initialisation de la liste des cours inscrits comme vide
    };
    const insertedStudent = await mongoService.insertOne("students", student);
    if (!insertedStudent) {
      return res.status(400).json({ error: "Failed to create student" }); // Si l'insertion échoue
    }
    await redisService.deleteCachedData("students"); // Supprimer les données mises en cache
    res.status(201).json({ _id: insertedStudent.insertedId, ...student }); // Retourner les données de l'étudiant
  } catch (error) {
    console.error("Failed to create student:", error);
    res.status(500).json({ error: "Failed to create student" }); // Erreur serveur
  }
}

async function updateStudent(req, res) {
  try {
    const studentId = req.params.id;
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" }); // Validation de l'ID de l'étudiant
    }
    const student = req.body;
    const updatedStudent = await mongoService.updateOne(
      "students",
      studentId,
      student
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" }); // Si l'étudiant n'est pas trouvé
    }
    await redisService.deleteCachedData("students"); // Supprimer les données mises en cache
    res.json({ _id: studentId, ...student }); // Retourner les informations de l'étudiant mis à jour
  } catch (error) {
    console.error("Failed to update student:", error);
    res.status(500).json({ error: "Failed to update student" }); // Erreur serveur
  }
}

async function deleteStudent(req, res) {
  try {
    const studentId = req.params.id;
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" }); // Validation de l'ID de l'étudiant
    }
    const deletedStudent = await mongoService.deleteOne("students", studentId);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" }); // Si l'étudiant n'est pas trouvé
    }
    await redisService.deleteCachedData("students"); // Supprimer les données mises en cache
    res.json({ _id: studentId }); // Retourner l'ID de l'étudiant supprimé
  } catch (error) {
    console.error("Failed to delete student:", error);
    res.status(500).json({ error: "Failed to delete student" }); // Erreur serveur
  }
}

async function getAllStudents(req, res) {
  try {
    // Vérifier si les étudiants sont déjà en cache
    const cachedStudents = await redisService.getCachedData("students");
    if (cachedStudents) {
      return res.json(cachedStudents); // Retourner les données mises en cache
    }
    const students = await mongoService.findMany("students"); // Récupérer tous les étudiants de la base de données
    if (!students) {
      return res.status(404).json({ error: "Students not found" }); // Si aucun étudiant n'est trouvé
    }
    await redisService.cacheData("students", students, 60); // Mettre les données en cache pour 60 secondes
    res.json(students); // Retourner la liste des étudiants
  } catch (error) {
    console.error("Failed to get students:", error);
    res.status(500).json({ error: "Failed to get students" }); // Erreur serveur
  }
}

async function getStudent(req, res) {
  try {
    const studentId = req.params.id;
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" }); // Validation de l'ID de l'étudiant
    }
    const student = await mongoService.findOneById("students", studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" }); // Si l'étudiant n'est pas trouvé
    }
    res.json(student); // Retourner les informations de l'étudiant
  } catch (error) {
    console.error("Failed to get student:", error);
    res.status(500).json({ error: "Failed to get student" }); // Erreur serveur
  }
}

async function enrollCourse(req, res) {
  try {
    const studentId = req.params.id;
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" }); // Validation de l'ID de l'étudiant
    }
    const courseId = req.body.courseId;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" }); // Validation de l'ID du cours
    }
    const course = await mongoService.findOneById("courses", courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" }); // Si le cours n'est pas trouvé
    }
    const student = await mongoService.findOneById("students", studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" }); // Si l'étudiant n'est pas trouvé
    }

    // Vérifier si l'étudiant est déjà inscrit au cours
    const isEnrolled = student.enrolledCourses.some(
      (enrollment) => enrollment.courseId.toString() === courseId
    );
    if (isEnrolled) {
      return res.status(400).json({ error: "Student already enrolled" }); // Si l'étudiant est déjà inscrit
    }

    // Ajouter l'étudiant au cours
    const enrollment = {
      courseId: new ObjectId(courseId),
      title: course.title,
      enrollmentDate: new Date(),
    };
    const updatedStudent = await mongoService.updateOne("students", studentId, {
      $push: { enrolledCourses: enrollment }, // Ajouter l'inscription dans le tableau enrolledCourses
    });
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" }); // Si l'étudiant n'est pas trouvé
    }

    // Incrémenter le nombre d'inscriptions du cours
    const updatedCourse = await mongoService.updateOne("courses", courseId, {
      $inc: { enrollmentCount: 1 }, // Augmenter le compteur d'inscriptions
    });
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" }); // Si le cours n'est pas trouvé
    }

    await redisService.deleteCachedData("students"); // Supprimer les données mises en cache
    res.json(enrollment); // Retourner l'inscription
  } catch (error) {
    console.error("Failed to enroll course:", error);
    res.status(500).json({ error: "Failed to enroll course" }); // Erreur serveur
  }
}

async function getStudentEnrolledCourses(req, res) {
  try {
    const studentId = req.params.id;
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" }); // Validation de l'ID de l'étudiant
    }
    const student = await mongoService.findOneById("students", studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" }); // Si l'étudiant n'est pas trouvé
    }
    res.json(student.enrolledCourses); // Retourner les cours auxquels l'étudiant est inscrit
  } catch (error) {
    console.error("Failed to get student enrolled courses:", error);
    res.status(500).json({ error: "Failed to get student enrolled courses" }); // Erreur serveur
  }
}

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  getAllStudents,
  enrollCourse,
  getStudentEnrolledCourses,
};
