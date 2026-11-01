// Lab 5: Structure of a project record stored in MongoDB (ProjectRecords collection)
export interface ProjectRecord {
  _id: string;
  projectCode: string;
  projectName: string;
  description: string;
  projectManager: string;
  startDate: string;
  dueDate: string;
  status: string;
  priority: string;
  createdAt?: string;
  updatedAt?: string;
}

// New records do not have MongoDB-generated fields yet
export type ProjectRecordInput = Omit<ProjectRecord, '_id' | 'createdAt' | 'updatedAt'>;
