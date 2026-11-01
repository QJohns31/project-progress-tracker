const mongoose = require('mongoose');

// Lab 5: Project record schema (eight fields)
const projectRecordSchema = new mongoose.Schema({
  projectCode: { type: String, required: true, trim: true },
  projectName: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  projectManager: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Not Started', 'In Progress', 'On Hold', 'Completed']
  },
  priority: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High']
  }
}, { timestamps: true });

// Lab 5 records are stored in the IT6203 database, ProjectRecords collection
module.exports = mongoose.model(
  'ProjectRecord',
  projectRecordSchema,
  'ProjectRecords'
);
