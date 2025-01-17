// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require("mongodb");
const db = require("../config/db");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable

  try {
    const course = {
      ...req.body,
      enrollmentCount: 0,
    };
    const insertedCourse = await mongoService.insertOne("courses", course);
    if (!insertedCourse) {
      return res.status(400).json({ error: "Failed to create course" });
    }
    await redisService.deleteCachedData("courses");
    res.status(201).json({ _id: insertedCourse.insertedId, ...course });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }
    const course = await mongoService.findOneById("courses", courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error("Error getting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateCourse(req, res) {
  try {
    const courseId = req.params.id;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }
    const course = req.body;
    const updatedCourse = await mongoService.updateOne(
      "courses",
      courseId,
      course
    );
    if (!updatedCourse) {
      return res.status(400).json({ error: "Failed to update course" });
    }
    await redisService.deleteCachedData("courses");
    res.json({ _id: courseId, ...course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteCourse(req, res) {
  try {
    const courseId = req.params.id;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }
    const deletedCourse = await mongoService.deleteOne("courses", courseId);
    if (!deletedCourse) {
      return res.status(400).json({ error: "Failed to delete course" });
    }
    await redisService.deleteCachedData("courses");
    res.json({ _id: courseId });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }
    const course = await mongoService.findOneById("courses", courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error("Error getting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllCourses(req, res) {
  try {
    const cachedCourses = await redisService.getCachedData("courses");
    if (cachedCourses) {
      return res.json(cachedCourses);
    }
    const courses = await mongoService.findMany("courses");
    if (!courses) {
      return res.status(404).json({ error: "Courses not found" });
    }
    await redisService.cacheData("courses", courses, 60); // Cache for 1 minute
    res.json(courses);
  } catch (error) {
    console.error("Error getting all courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCourseStats(req, res) {
  try {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalCourses: { $sum: 1 },
          averageDuration: { $avg: "$duration" },
          totalEnrollments: { $sum: "$enrollmentCount" },
          courses: {
            $push: {
              _id: "$_id",
              title: "$title",
              instructor: "$instructor",
              duration: "$duration",
              enrollmentCount: "$enrollmentCount",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalCourses: 1,
          averageDuration: 1,
          totalEnrollments: 1,
          courses: 1,
        },
      },
    ];

    const stats = await mongoService.aggregate("courses", pipeline);

    // Check if the stats array is empty or not found
    if (!stats || stats.length === 0) {
      return res.status(404).json({ error: "Course stats not found" });
    }

    res.json(stats[0]);
  } catch (error) {
    console.error("Error getting course stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  getAllCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  getCourseStats,
};
