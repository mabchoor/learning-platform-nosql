const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

// Routes pour gérer les étudiants
router.post("/", studentController.createStudent); // Créer un étudiant
router.get("/", studentController.getAllStudents); // Obtenir tous les étudiants
router.get("/:id", studentController.getStudent); // Obtenir un étudiant par ID
router.put("/:id", studentController.updateStudent); // Mettre à jour un étudiant par ID
router.delete("/:id", studentController.deleteStudent); // Supprimer un étudiant par ID

// Routes pour gérer les cours d'un étudiant
router.post("/:id/enroll", studentController.enrollCourse); // Inscrire un étudiant à un cours
router.get("/:id/courses", studentController.getStudentEnrolledCourses); // Obtenir les cours auxquels l'étudiant est inscrit

module.exports = router;
