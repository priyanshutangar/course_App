import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { updateCourseProgress, markCourseComplete } from '../store/userSlice';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Dashboard() {
  const dispatch = useDispatch();
  const { enrolledCourses, completedCourses } = useSelector((state) => state.user);

  const handleUpdateProgress = (courseId, newProgress) => {
    dispatch(updateCourseProgress({ courseId, progress: newProgress }));
  };

  const handleMarkComplete = (courseId) => {
    dispatch(markCourseComplete(courseId));
  };

  return (
    <Container sx={{ pt: 12, pb: 4 }}>
      <Box className="slide-up" sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          My Learning Journey
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 3,
              color: '#6366f1',
            }}
          >
            <SchoolIcon /> Active Courses
          </Typography>
          <Grid container spacing={3}>
            {enrolledCourses.map((course, index) => (
              <Grid item key={course.id} xs={12} md={6}>
                <Card
                  className="glass-morphism hover-scale fade-in"
                  sx={{
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s`,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: '#1a237e',
                        mb: 2,
                      }}
                    >
                      {course.name}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Instructor: {course.instructor}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{ mb: 2, fontSize: '0.875rem' }}
                    >
                      Enrolled: {new Date(course.enrollmentDate).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ mt: 2, mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#6366f1',
                          fontWeight: 500,
                          mb: 1,
                        }}
                      >
                        Progress: {course.progress}%
                      </Typography>
                      <Box className="progress-bar">
                        <LinearProgress
                          variant="determinate"
                          value={course.progress}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(99, 102, 241, 0.2)',
                            '& .MuiLinearProgress-bar': {
                              background: 'var(--primary-gradient)',
                            },
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: '#6366f1',
                          color: '#6366f1',
                          '&:hover': {
                            borderColor: '#4f46e5',
                            background: 'rgba(99, 102, 241, 0.1)',
                          },
                        }}
                        onClick={() => handleUpdateProgress(course.id, Math.min(course.progress + 10, 100))}
                      >
                        Update Progress
                      </Button>
                      {course.progress === 100 && (
                        <Button
                          variant="contained"
                          sx={{
                            background: 'var(--primary-gradient)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                            },
                          }}
                          onClick={() => handleMarkComplete(course.id)}
                        >
                          Complete Course
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 3,
              mt: 4,
              color: '#6366f1',
            }}
          >
            <CheckCircleIcon /> Completed Courses
          </Typography>
          <Grid container spacing={3}>
            {completedCourses.map((course, index) => (
              <Grid item key={course.id} xs={12} md={6}>
                <Card
                  className="glass-morphism hover-scale fade-in"
                  sx={{
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s`,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: '#1a237e',
                        mb: 2,
                      }}
                    >
                      {course.name}
                    </Typography>
                    <Typography color="textSecondary">
                      Instructor: {course.instructor}
                    </Typography>
                    <Typography color="textSecondary" sx={{ mt: 1 }}>
                      Completed: {new Date(course.completedDate).toLocaleDateString()}
                    </Typography>
                    <Chip
                      label="Course Completed"
                      sx={{
                        mt: 2,
                        background: 'var(--primary-gradient)',
                        color: 'white',
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;