const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Project = require('./models/project');
const ProjectRecord = require('./models/project-record');

// Create the Express application
const app = express();

// Allow HTTP requests from Angular
app.use(cors({ origin: 'http://localhost:4200' }));

// Read JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/IT6203')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));


// GET: Retrieve all projects
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving projects'
    });
  }
});


// POST: Create a new project
app.post('/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({
      message: 'Error saving project',
      error: err.message
    });
  }
});


// GET: Retrieve a project by ID
app.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({
      message: 'Invalid project ID'
    });
  }
});


// PUT: Update an existing project
app.put('/projects/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({
      message: 'Error updating project',
      error: err.message
    });
  }
});


// DELETE: Remove a project
app.delete('/projects/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    res.status(200).json({
      message: 'Project deleted successfully'
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error deleting project'
    });
  }
});


// ======================================================
// Lab 5: Project Records CRUD API (/project-records)
// Used by the single ProjectRecords Angular component.
// ======================================================

// GET: Retrieve all project records (newest first)
app.get('/project-records', async (req, res) => {
  try {
    const records = await ProjectRecord.find().sort({ createdAt: -1 });
    console.log(`GET /project-records - ${records.length} record(s)`);
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving project records' });
  }
});

// GET: Retrieve one project record by ID
app.get('/project-records/:id', async (req, res) => {
  try {
    const record = await ProjectRecord.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: 'Project record not found' });
    }

    console.log(`GET /project-records/${req.params.id}`);
    res.status(200).json(record);
  } catch (err) {
    res.status(400).json({ message: 'Invalid project record ID' });
  }
});

// POST: Create a project record
app.post('/project-records', async (req, res) => {
  try {
    const saved = await new ProjectRecord(req.body).save();
    console.log('POST /project-records - created:', saved.projectName);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({
      message: 'Error saving project record',
      error: err.message
    });
  }
});

// PUT: Update a project record
app.put('/project-records/:id', async (req, res) => {
  try {
    const updated = await ProjectRecord.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Project record not found' });
    }

    console.log('PUT /project-records - updated:', updated.projectName);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({
      message: 'Error updating project record',
      error: err.message
    });
  }
});

// DELETE: Remove a project record
app.delete('/project-records/:id', async (req, res) => {
  try {
    const deleted = await ProjectRecord.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Project record not found' });
    }

    console.log('DELETE /project-records - removed:', deleted.projectName);
    res.status(200).json({ message: 'Project record deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting project record' });
  }
});


// Start the Express server
app.listen(8001, () => {
  console.log('MongoDB server running on port 8001');
});
