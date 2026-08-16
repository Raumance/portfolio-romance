const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middlewares/auth');
const { projectRules } = require('../middlewares/inputValidators');
const validate = require('../middlewares/validate');

router.route('/')
  .get(getProjects)
  .post(protect, projectRules, validate, createProject);

router.route('/:id')
  .get(getProject)
  .put(protect, projectRules, validate, updateProject)
  .delete(protect, deleteProject);

module.exports = router;
