import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCourses } from '../store/coursesSlice';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function CourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, status, error } = useSelector((state) => state.courses);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress sx={{ color: '#6366f1' }} />
      </Box>
    );
  }

  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>;
  }

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
          Discover Your Next Course
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search courses or instructors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            maxWidth: 600,
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 1)',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#6366f1' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Grid container spacing={4}>
        {filteredCourses.map((course, index) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card
              className="glass-morphism hover-scale fade-in"
              sx={{
                height: '100%',
                cursor: 'pointer',
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s`,
                transition: `transform 0.3s ease, box-shadow 0.7s ease`,
                '&:hover': {
                  transform: 'scale(1.05)', // Zoom-in effect
                  boxShadow: '0px 10px 30px rgba(99, 102, 241, 0.6)', // Glowing effect
                },
              }}
              onClick={() => navigate(`/course/${course.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={course.thumbnail}
                alt={course.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#1a237e',
                  }}
                >
                  {course.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6366f1',
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  {course.instructor}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    flexWrap: 'wrap',
                    mt: 2,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      background: course.enrollmentStatus === 'Open' ? '#4caf50' : '#f44336',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: '4px',
                      fontWeight: 500,
                    }}
                  >
                    {course.enrollmentStatus}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      background: '#6366f1',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: '4px',
                      fontWeight: 500,
                    }}
                  >
                    {course.duration}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CourseList;