import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Card,
  CardContent,
  Fade,
  Slide,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { enrollCourse } from '../store/userSlice';

function CourseDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) =>
    state.courses.courses.find((c) => c.id === parseInt(id))
  );
  const enrolledCourses = useSelector((state) => state.user.enrolledCourses);
  const [showEnrollSuccess, setShowEnrollSuccess] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState(null);

  const isEnrolled = enrolledCourses.some((c) => c.id === course?.id);

  useEffect(() => {
    if (isEnrolled) {
      setShowEnrollSuccess(true);
    }
  }, [isEnrolled]);

  if (!course) {
    return <Typography>Course not found</Typography>;
  }

  const handleEnroll = () => {
    dispatch(enrollCourse(course));
    setShowEnrollSuccess(true);
  };

  const handleAccordionChange = (week) => (event, isExpanded) => {
    setExpandedWeek(isExpanded ? week : null);
  };

  return (
    <Container sx={{ pt: 12, pb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Slide direction="up" in={true} timeout={500}>
            <Paper elevation={0} className="glass-morphism" sx={{ p: 4, mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {course.name}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <Chip
                  icon={<SchoolIcon />}
                  label={`Instructor: ${course.instructor}`}
                  sx={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}
                />
                <Chip
                  icon={<AccessTimeIcon />}
                  label={course.duration}
                  sx={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}
                />
                <Chip
                  icon={<LocationOnIcon />}
                  label={course.location}
                  sx={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}
                />
                <Chip
                  label={course.enrollmentStatus}
                  sx={{
                    background: course.enrollmentStatus === 'Open' 
                      ? 'rgba(52, 211, 153, 0.1)' 
                      : 'rgba(239, 68, 68, 0.1)',
                    color: course.enrollmentStatus === 'Open' ? '#34D399' : '#EF4444',
                  }}
                />
              </Box>

              <Typography variant="body1" paragraph sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.7 }}>
                {course.description}
              </Typography>

              {!isEnrolled && course.enrollmentStatus === 'Open' && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleEnroll}
                  sx={{
                    background: 'var(--primary-gradient)',
                    color: 'black',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    mb: 4,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                      color: 'white',
                    },
                  }}
                >
                  Enroll Now
                </Button>
              )}

              <Fade in={showEnrollSuccess} timeout={1000}>
                <Box
                  sx={{
                    display: showEnrollSuccess ? 'flex' : 'none',
                    alignItems: 'center',
                    gap: 2,
                    background: 'rgba(52, 211, 153, 0.1)',
                    color: '#34D399',
                    p: 2,
                    borderRadius: 2,
                    mb: 4,
                  }}
                >
                  <CheckCircleIcon />
                  <Typography>
                    You're enrolled! Track your progress in the dashboard.
                  </Typography>
                </Box>
              </Fade>
            </Paper>
          </Slide>

          <Slide direction="up" in={true} timeout={700}>
            <Paper elevation={0} className="glass-morphism" sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, color: '#1a237e', fontWeight: 600 }}>
                Course Syllabus
              </Typography>
              {course.syllabus.map((week) => (
                <Accordion
                  key={week.week}
                  expanded={expandedWeek === week.week}
                  onChange={handleAccordionChange(week.week)}
                  sx={{
                    background: 'transparent',
                    boxShadow: 'none',
                    '&:before': { display: 'none' },
                    mb: 2,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      background: 'rgba(99, 102, 241, 0.1)',
                      borderRadius: 2,
                      '&.Mui-expanded': {
                        background: 'rgba(99, 102, 241, 0.2)',
                      },
                    }}
                  >
                    <Typography sx={{ color: '#1a237e', fontWeight: 500 }}>
                      Week {week.week}: {week.topic}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#4B5563', lineHeight: 1.7 }}>
                      {week.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          </Slide>
        </Grid>

        <Grid item xs={12} md={4}>
          <Slide direction="left" in={true} timeout={900}>
            <Card elevation={0} className="glass-morphism">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, color: '#1a237e', fontWeight: 600 }}>
                  Prerequisites
                </Typography>
                <List>
                  {course.prerequisites.map((prereq, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        background: 'rgba(99, 102, 241, 0.1)',
                        borderRadius: 2,
                        mb: 2,
                      }}
                    >
                      <ListItemText
                        primary={prereq}
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: '#4B5563',
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h6" sx={{ mt: 4, mb: 3, color: '#1a237e', fontWeight: 600 }}>
                  Schedule
                </Typography>
                <Box
                  sx={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    p: 2,
                    borderRadius: 2,
                    color: '#4B5563',
                  }}
                >
                  <Typography>{course.schedule}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Slide>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CourseDetails;