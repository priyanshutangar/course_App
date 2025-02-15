import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrolledCourses: [],
  completedCourses: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    enrollCourse: (state, action) => {
      if (!state.enrolledCourses.find(course => course.id === action.payload.id)) {
        state.enrolledCourses.push({
          ...action.payload,
          progress: 0,
          enrollmentDate: new Date().toISOString(),
        });
      }
    },
    updateCourseProgress: (state, action) => {
      const { courseId, progress } = action.payload;
      const course = state.enrolledCourses.find(c => c.id === courseId);
      if (course) {
        course.progress = progress;
      }
    },
    markCourseComplete: (state, action) => {
      const courseId = action.payload;
      const courseIndex = state.enrolledCourses.findIndex(c => c.id === courseId);
      if (courseIndex !== -1) {
        const course = state.enrolledCourses[courseIndex];
        state.completedCourses.push({ ...course, completedDate: new Date().toISOString() });
        state.enrolledCourses.splice(courseIndex, 1);
      }
    },
  },
});

export const { enrollCourse, updateCourseProgress, markCourseComplete } = userSlice.actions;
export default userSlice.reducer;