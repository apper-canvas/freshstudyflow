// Initialize ApperClient with Project ID and Public Key
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const assignmentService = {
  async getAll() {
    await delay(300);
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "grade_c"}},
          {"field": {"Name": "weight_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "course_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        orderBy: [{"fieldName": "due_date_c", "sorttype": "ASC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await apperClient.fetchRecords('assignment_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Transform data to match existing component expectations
      const assignments = response.data.map(assignment => ({
        Id: assignment.Id,
        courseId: assignment.course_id_c?.Id?.toString() || assignment.course_id_c?.toString() || "",
        title: assignment.title_c || assignment.Name || "",
        description: assignment.description_c || "",
        dueDate: assignment.due_date_c || new Date().toISOString(),
        priority: assignment.priority_c || "medium",
        completed: assignment.completed_c || false,
        grade: assignment.grade_c || null,
        weight: assignment.weight_c || 0.1,
        type: assignment.type_c || "Assignment",
        createdAt: assignment.CreatedOn || new Date().toISOString()
      }));
      
      return assignments;
    } catch (error) {
      console.error("Error fetching assignments:", error?.response?.data?.message || error.message);
      throw new Error("Failed to fetch assignments");
    }
  },

  async getById(id) {
    await delay(200);
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "grade_c"}},
          {"field": {"Name": "weight_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "course_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      };
      
      const response = await apperClient.getRecordById('assignment_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (!response.data) {
        throw new Error("Assignment not found");
      }
      
      // Transform data to match existing component expectations
      const assignment = {
        Id: response.data.Id,
        courseId: response.data.course_id_c?.Id?.toString() || response.data.course_id_c?.toString() || "",
        title: response.data.title_c || response.data.Name || "",
        description: response.data.description_c || "",
        dueDate: response.data.due_date_c || new Date().toISOString(),
        priority: response.data.priority_c || "medium",
        completed: response.data.completed_c || false,
        grade: response.data.grade_c || null,
        weight: response.data.weight_c || 0.1,
        type: response.data.type_c || "Assignment",
        createdAt: response.data.CreatedOn || new Date().toISOString()
      };
      
      return assignment;
    } catch (error) {
      console.error(`Error fetching assignment ${id}:`, error?.response?.data?.message || error.message);
      throw new Error("Failed to fetch assignment");
    }
  },

  async getByCourseId(courseId) {
    await delay(250);
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "grade_c"}},
          {"field": {"Name": "weight_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "course_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        where: [{"FieldName": "course_id_c", "Operator": "EqualTo", "Values": [parseInt(courseId)]}],
        orderBy: [{"fieldName": "due_date_c", "sorttype": "ASC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await apperClient.fetchRecords('assignment_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Transform data to match existing component expectations
      const assignments = response.data.map(assignment => ({
        Id: assignment.Id,
        courseId: assignment.course_id_c?.Id?.toString() || assignment.course_id_c?.toString() || "",
        title: assignment.title_c || assignment.Name || "",
        description: assignment.description_c || "",
        dueDate: assignment.due_date_c || new Date().toISOString(),
        priority: assignment.priority_c || "medium",
        completed: assignment.completed_c || false,
        grade: assignment.grade_c || null,
        weight: assignment.weight_c || 0.1,
        type: assignment.type_c || "Assignment",
        createdAt: assignment.CreatedOn || new Date().toISOString()
      }));
      
      return assignments;
    } catch (error) {
      console.error("Error fetching course assignments:", error?.response?.data?.message || error.message);
      throw new Error("Failed to fetch course assignments");
    }
  },

  async create(assignmentData) {
    await delay(400);
    try {
      const params = {
        records: [{
          Name: assignmentData.title || "",
          title_c: assignmentData.title || "",
          description_c: assignmentData.description || "",
          due_date_c: assignmentData.dueDate || new Date().toISOString(),
          priority_c: assignmentData.priority || "medium",
          completed_c: assignmentData.completed || false,
          grade_c: assignmentData.grade || null,
          weight_c: parseFloat(assignmentData.weight) || 0.1,
          type_c: assignmentData.type || "Assignment",
          course_id_c: parseInt(assignmentData.courseId) || null
        }]
      };
      
      const response = await apperClient.createRecord('assignment_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create assignment:`, failed);
          const errorMessage = failed[0].message || "Failed to create assignment";
          throw new Error(errorMessage);
        }
        
        if (successful.length > 0) {
          const createdAssignment = successful[0].data;
          return {
            Id: createdAssignment.Id,
            courseId: createdAssignment.course_id_c?.Id?.toString() || createdAssignment.course_id_c?.toString() || "",
            title: createdAssignment.title_c || createdAssignment.Name || "",
            description: createdAssignment.description_c || "",
            dueDate: createdAssignment.due_date_c || new Date().toISOString(),
            priority: createdAssignment.priority_c || "medium",
            completed: createdAssignment.completed_c || false,
            grade: createdAssignment.grade_c || null,
            weight: createdAssignment.weight_c || 0.1,
            type: createdAssignment.type_c || "Assignment",
            createdAt: createdAssignment.CreatedOn || new Date().toISOString()
          };
        }
      }
    } catch (error) {
      console.error("Error creating assignment:", error?.response?.data?.message || error.message);
      throw new Error("Failed to create assignment");
    }
  },

  async update(id, assignmentData) {
    await delay(400);
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          ...(assignmentData.title && { Name: assignmentData.title, title_c: assignmentData.title }),
          ...(assignmentData.description && { description_c: assignmentData.description }),
          ...(assignmentData.dueDate && { due_date_c: assignmentData.dueDate }),
          ...(assignmentData.priority && { priority_c: assignmentData.priority }),
          ...(assignmentData.hasOwnProperty('completed') && { completed_c: assignmentData.completed }),
          ...(assignmentData.hasOwnProperty('grade') && { grade_c: assignmentData.grade }),
          ...(assignmentData.hasOwnProperty('weight') && { weight_c: parseFloat(assignmentData.weight) }),
          ...(assignmentData.type && { type_c: assignmentData.type }),
          ...(assignmentData.courseId && { course_id_c: parseInt(assignmentData.courseId) })
        }]
      };
      
      const response = await apperClient.updateRecord('assignment_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update assignment:`, failed);
          const errorMessage = failed[0].message || "Failed to update assignment";
          throw new Error(errorMessage);
        }
        
        if (successful.length > 0) {
          const updatedAssignment = successful[0].data;
          return {
            Id: updatedAssignment.Id,
            courseId: updatedAssignment.course_id_c?.Id?.toString() || updatedAssignment.course_id_c?.toString() || "",
            title: updatedAssignment.title_c || updatedAssignment.Name || "",
            description: updatedAssignment.description_c || "",
            dueDate: updatedAssignment.due_date_c || new Date().toISOString(),
            priority: updatedAssignment.priority_c || "medium",
            completed: updatedAssignment.completed_c || false,
            grade: updatedAssignment.grade_c || null,
            weight: updatedAssignment.weight_c || 0.1,
            type: updatedAssignment.type_c || "Assignment",
            createdAt: updatedAssignment.CreatedOn || new Date().toISOString()
          };
        }
      }
    } catch (error) {
      console.error("Error updating assignment:", error?.response?.data?.message || error.message);
      throw new Error("Failed to update assignment");
    }
  },

  async delete(id) {
    await delay(300);
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('assignment_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete assignment:`, failed);
          const errorMessage = failed[0].message || "Failed to delete assignment";
          throw new Error(errorMessage);
        }
        
        return successful.length > 0;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting assignment:", error?.response?.data?.message || error.message);
      throw new Error("Failed to delete assignment");
    }
  },

  async toggleComplete(id, completed) {
    await delay(200);
    try {
      return await this.update(id, { completed });
    } catch (error) {
      console.error("Error toggling assignment completion:", error?.response?.data?.message || error.message);
      throw new Error("Failed to toggle assignment completion");
    }
  }
};