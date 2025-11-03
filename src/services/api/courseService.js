// Initialize ApperClient with Project ID and Public Key
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const courseService = {
  async getAll() {
    await delay(300);
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "instructor_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "credits_c"}},
          {"field": {"Name": "semester_c"}},
          {"field": {"Name": "schedule_day_c"}},
          {"field": {"Name": "schedule_startTime_c"}},
          {"field": {"Name": "schedule_endTime_c"}},
          {"field": {"Name": "schedule_location_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await apperClient.fetchRecords('course_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Transform data to match existing component expectations
      const courses = response.data.map(course => ({
        Id: course.Id,
        name: course.name_c || course.Name || "",
        instructor: course.instructor_c || "",
        color: course.color_c || "#4F46E5",
        credits: course.credits_c || 3,
        semester: course.semester_c || "Fall 2024",
        schedule: [{
          day: course.schedule_day_c || "",
          startTime: course.schedule_startTime_c || "",
          endTime: course.schedule_endTime_c || "",
          location: course.schedule_location_c || ""
        }].filter(s => s.day && s.startTime && s.endTime),
        createdAt: course.CreatedOn || new Date().toISOString()
      }));
      
      return courses;
    } catch (error) {
      console.error("Error fetching courses:", error?.response?.data?.message || error.message);
      throw new Error("Failed to fetch courses");
    }
  },

  async getById(id) {
    await delay(200);
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "instructor_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "credits_c"}},
          {"field": {"Name": "semester_c"}},
          {"field": {"Name": "schedule_day_c"}},
          {"field": {"Name": "schedule_startTime_c"}},
          {"field": {"Name": "schedule_endTime_c"}},
          {"field": {"Name": "schedule_location_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      };
      
      const response = await apperClient.getRecordById('course_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (!response.data) {
        throw new Error("Course not found");
      }
      
      // Transform data to match existing component expectations
      const course = {
        Id: response.data.Id,
        name: response.data.name_c || response.data.Name || "",
        instructor: response.data.instructor_c || "",
        color: response.data.color_c || "#4F46E5",
        credits: response.data.credits_c || 3,
        semester: response.data.semester_c || "Fall 2024",
        schedule: [{
          day: response.data.schedule_day_c || "",
          startTime: response.data.schedule_startTime_c || "",
          endTime: response.data.schedule_endTime_c || "",
          location: response.data.schedule_location_c || ""
        }].filter(s => s.day && s.startTime && s.endTime),
        createdAt: response.data.CreatedOn || new Date().toISOString()
      };
      
      return course;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error?.response?.data?.message || error.message);
      throw new Error("Failed to fetch course");
    }
  },

  async create(courseData) {
    await delay(400);
    try {
      const schedule = courseData.schedule || [];
      const firstSchedule = schedule[0] || {};
      
      const params = {
        records: [{
          Name: courseData.name || "",
          name_c: courseData.name || "",
          instructor_c: courseData.instructor || "",
          color_c: courseData.color || "#4F46E5",
          credits_c: parseInt(courseData.credits) || 3,
          semester_c: courseData.semester || "Fall 2024",
          schedule_day_c: firstSchedule.day || "",
          schedule_startTime_c: firstSchedule.startTime || "",
          schedule_endTime_c: firstSchedule.endTime || "",
          schedule_location_c: firstSchedule.location || ""
        }]
      };
      
      const response = await apperClient.createRecord('course_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create course:`, failed);
          const errorMessage = failed[0].message || "Failed to create course";
          throw new Error(errorMessage);
        }
        
        if (successful.length > 0) {
          const createdCourse = successful[0].data;
          return {
            Id: createdCourse.Id,
            name: createdCourse.name_c || createdCourse.Name || "",
            instructor: createdCourse.instructor_c || "",
            color: createdCourse.color_c || "#4F46E5",
            credits: createdCourse.credits_c || 3,
            semester: createdCourse.semester_c || "Fall 2024",
            schedule: schedule,
            createdAt: createdCourse.CreatedOn || new Date().toISOString()
          };
        }
      }
    } catch (error) {
      console.error("Error creating course:", error?.response?.data?.message || error.message);
      throw new Error("Failed to create course");
    }
  },

  async update(id, courseData) {
    await delay(400);
    try {
      const schedule = courseData.schedule || [];
      const firstSchedule = schedule[0] || {};
      
      const params = {
        records: [{
          Id: parseInt(id),
          Name: courseData.name || "",
          name_c: courseData.name || "",
          instructor_c: courseData.instructor || "",
          color_c: courseData.color || "#4F46E5",
          credits_c: parseInt(courseData.credits) || 3,
          semester_c: courseData.semester || "Fall 2024",
          schedule_day_c: firstSchedule.day || "",
          schedule_startTime_c: firstSchedule.startTime || "",
          schedule_endTime_c: firstSchedule.endTime || "",
          schedule_location_c: firstSchedule.location || ""
        }]
      };
      
      const response = await apperClient.updateRecord('course_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update course:`, failed);
          const errorMessage = failed[0].message || "Failed to update course";
          throw new Error(errorMessage);
        }
        
        if (successful.length > 0) {
          const updatedCourse = successful[0].data;
          return {
            Id: updatedCourse.Id,
            name: updatedCourse.name_c || updatedCourse.Name || "",
            instructor: updatedCourse.instructor_c || "",
            color: updatedCourse.color_c || "#4F46E5",
            credits: updatedCourse.credits_c || 3,
            semester: updatedCourse.semester_c || "Fall 2024",
            schedule: schedule,
            createdAt: updatedCourse.CreatedOn || new Date().toISOString()
          };
        }
      }
    } catch (error) {
      console.error("Error updating course:", error?.response?.data?.message || error.message);
      throw new Error("Failed to update course");
    }
  },

  async delete(id) {
    await delay(300);
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('course_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete course:`, failed);
          const errorMessage = failed[0].message || "Failed to delete course";
          throw new Error(errorMessage);
        }
        
        return successful.length > 0;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting course:", error?.response?.data?.message || error.message);
      throw new Error("Failed to delete course");
    }
  }
};