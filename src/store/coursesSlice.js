import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  courses: [],
  status: 'idle',
  error: null,
  selectedCourse: null,
};

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  // For demo purposes, we'll return mock data
  // In a real app, this would be an API call
  return [
      {
        id: 1,
        name: 'Introduction to React Native',
        instructor: 'John Doe',
        description: 'Learn the basics of React Native development and build your first mobile app.',
        enrollmentStatus: 'Open',
        thumbnail: 'https://blog.castle.io/content/images/2021/03/blog-thumb-1.png',
        duration: '8 weeks',
        schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
        location: 'Online',
        prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
        syllabus: [
          {
            week: 1,
            topic: 'Introduction to React Native',
            content: 'Overview of React Native, setting up your development environment.'
          },
          {
            week: 2,
            topic: 'Building Your First App',
            content: 'Creating a simple mobile app using React Native components.'
          }
        ],
        students: [
          {
            id: 101,
            name: 'Alice Johnson',
            email: 'alice@example.com',
          },
          {
            id: 102,
            name: 'Bob Smith',
            email: 'bob@example.com',
          }
        ]
      },
      {
        id: 2,
        name: "Python Programming for Beginners",
        instructor: "Jane Smith",
        description: "An introductory course to Python programming, covering basics to advanced topics.",
        enrollmentStatus: "Open",
        thumbnail: "https://images.pexels.com/photos/11035474/pexels-photo-11035474.jpeg?auto=compress&cs=tinysrgb&w=600",
        duration: "10 weeks",
        schedule: "Mondays and Wednesdays, 7:00 PM - 9:00 PM",
        location: "Online",
        rerequisites: ["Basic computer skills"],
        syllabus: [
          {
            week: 1,
            topic: "Introduction to Python",
            content: "Setting up Python environment, basic syntax, and first program."
          },
          {
            week: 2,
            topic: "Data Types and Variables",
            content: "Understanding different data types, variables, and basic operations."
          }
        ],
        students: []
      },
      {
        "id": 3,
        "name": "Full JavaScript Course for Beginners",
        "instructor": "Michael Johnson",
        "description": "Comprehensive JavaScript course covering fundamentals to advanced concepts.",
        "enrollmentStatus": "Open",
        "thumbnail": "https://wallpaperaccess.com/full/1555163.jpg",
        "duration": "12 weeks",
        "schedule": "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
        "location": "Online",
        "prerequisites": ["Basic HTML and CSS knowledge"],
        "syllabus": [
          {
            "week": 1,
            "topic": "JavaScript Basics",
            "content": "Introduction to JavaScript, variables, and data types."
          },
          {
            "week": 2,
            "topic": "Control Structures",
            "content": "Conditional statements, loops, and error handling."
          }
        ],
        "students": []
      },
      {
        "id": 4,
        "name": "C++ Programming Course",
        "instructor": "Emily Davis",
        "description": "Learn C++ programming from scratch, including object-oriented programming concepts.",
        "enrollmentStatus": "Open",
        "thumbnail": "https://w0.peakpx.com/wallpaper/668/259/HD-wallpaper-c-logo-white-silk-texture-c-emblem-programming-language-c-silk-background.jpg",
        "duration": "8 weeks",
        "schedule": "Fridays, 5:00 PM - 8:00 PM",
        "location": "Online",
        "prerequisites": ["Basic programming knowledge"],
        "syllabus": [
          {
            "week": 1,
            "topic": "Introduction to C++",
            "content": "Setting up the environment, basic syntax, and first program."
          },
          {
            "week": 2,
            "topic": "Functions and Arrays",
            "content": "Defining functions, passing parameters, and working with arrays."
          }
        ],
        "students": []
      },
      {
        "id": 5,
        "name": "Web Development Bootcamp",
        "instructor": "David Wilson",
        "description": "A complete bootcamp covering HTML, CSS, JavaScript, and modern frameworks.",
        "enrollmentStatus": "Open",
        "thumbnail": "https://www.simplilearn.com/ice9/free_resources_article_thumb/is_web_development_good_career.jpg",
        "duration": "16 weeks",
        "schedule": "Weekends, 10:00 AM - 2:00 PM",
        "location": "Online",
        "prerequisites": ["None"],
        "syllabus": [
          {
            "week": 1,
            "topic": "HTML and CSS Fundamentals",
            "content": "Building static web pages with HTML and styling with CSS."
          },
          {
            "week": 2,
            "topic": "JavaScript Essentials",
            "content": "Adding interactivity to web pages using JavaScript."
          }
        ],
        "students": []
      },
      {
        "id": 6,
        "name": "Machine Learning: From Data to Decisions",
        "instructor": "Sophia Martinez",
        "description": "An in-depth course on machine learning techniques and their applications.",
        "enrollmentStatus": "Open",
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSAdbXZE4MxcO1cl4S06oVg3xqouXRBY5ARD6sFjM4SUxK6Ftx9ln1BvGCZnbsBPcWLWQ&usqp=CAU",
        "duration": "12 weeks",
        "schedule": "Wednesdays, 6:00 PM - 9:00 PM",
        "location": "Online",
        "prerequisites": ["Basic Python knowledge", "Statistics fundamentals"],
        "syllabus": [
          {
            "week": 1,
            "topic": "Introduction to Machine Learning",
            "content": "Overview of machine learning concepts and types."
          },
          {
            "week": 2,
            "topic": "Data Preprocessing",
            "content": "Cleaning and preparing data for modeling."
          }
        ],
        "students": []
      },
      {
        "id": 7,
        "name": "Android Development for Beginners",
        "instructor": "James Brown",
        "description": "Learn to build Android applications from scratch using Kotlin.",
        "enrollmentStatus": "Open",
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSAdbXZE4MxcO1cl4S06oVg3xqouXRBY5ARD6sFjM4SUxK6Ftx9ln1BvGCZnbsBPcWLWQ&usqp=CAU",
        "duration": "10 weeks",
        "schedule": "Mondays and Wednesdays, 7:00 PM - 9:00 PM",
        "location": "Online",
        "prerequisites": ["Basic programming knowledge"],
        "syllabus": [
          {
            "week": 1,
            "topic": "Setting Up Android Studio",
            "content": "Installing Android Studio and creating your first project."
          },
          {
            "week": 2,
            "topic": "Layouts and UI Components",
            "content": "Designing user interfaces with XML and understanding UI components."
          }
        ],
        "students": []
      },
      {
        "id": 8,
        "name": "iOS Development with Swift",
        "instructor": "Olivia Garcia",
        "description": "Comprehensive course on developing iOS applications using Swift.",
        "enrollmentStatus": "Open",
        "thumbnail": "https://wallpapers.com/images/hd/black-apple-logo-1920-x-1080-84w45mb1o4of1xye.jpg",
        "duration": "12 weeks",
        "schedule": "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
        "location": "Online",
        "prerequisites": ["Basic programming knowledge"],
        "syllabus": [
          {
            "week": 1,
            "topic": "Introduction to Swift",
            "content": "Basics of Swift programming language and Xcode setup."
          },
          {
            "week": 2,
            "topic": "Building User Interfaces",
            "content": "Designing interfaces using Story"
          }
        ]
      }
    // Add more courses here
  ];
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCourse } = coursesSlice.actions;
export default coursesSlice.reducer;