import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Alert,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { submitContactForm } from '../utils/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#FFF5EE',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(139, 0, 0, 0.15)',
  transition: 'all 0.4s ease-in-out',
  position: 'relative',
  overflow: 'hidden',
  border: '2px solid #8B0000',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: 'linear-gradient(90deg, #FFF5EE, #8B0000, #FFF5EE)',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(139, 0, 0, 0.25)',
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  borderRadius: '12px',
  backgroundColor: 'rgba(139, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(139, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(139, 0, 0, 0.1)',
    transform: 'translateX(8px)',
    border: '1px solid rgba(139, 0, 0, 0.2)',
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(2),
    color: '#8B0000',
    fontSize: '2rem',
  },
  '& .MuiTypography-root': {
    color: '#333',
    fontSize: '1.1rem',
  },
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: '#333',
    backgroundColor: 'rgba(139, 0, 0, 0.03)',
    borderRadius: '12px',
    '& fieldset': {
      borderColor: 'rgba(139, 0, 0, 0.2)',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: '#8B0000',
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#8B0000',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#666',
    '&.Mui-focused': {
      color: '#8B0000',
    },
  },
  '& .MuiOutlinedInput-input': {
    '&::placeholder': {
      color: '#666',
      opacity: 0.7,
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#8B0000',
  color: '#FFF5EE',
  padding: '15px 40px',
  borderRadius: '30px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: '-100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'all 0.5s ease',
  },
  '&:hover': {
    backgroundColor: '#660000',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(139, 0, 0, 0.3)',
    '&::after': {
      left: '100%',
    },
  },
});

const SocialIcon = styled(IconButton)({
  color: '#8B0000',
  margin: '0 8px',
  padding: '12px',
  backgroundColor: 'rgba(139, 0, 0, 0.05)',
  border: '1px solid rgba(139, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(139, 0, 0, 0.1)',
    transform: 'translateY(-3px)',
    border: '1px solid rgba(139, 0, 0, 0.2)',
  },
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactForm(formData);
      setStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon!',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    }
  };

  return (
    <Box sx={{ bgcolor: '#FFF5EE', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: '#8B0000',
            mb: 6,
            textAlign: 'center',
            fontWeight: 'bold',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -15,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              backgroundColor: '#8B0000',
              borderRadius: '2px',
            }
          }}
        >
          Get in Touch
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <StyledPaper sx={{ p: 4 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  color: '#8B0000',
                  fontWeight: 'bold',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '40px',
                    height: '2px',
                    backgroundColor: '#8B0000',
                  }
                }}
              >
                Contact Information
              </Typography>
              <InfoItem>
                <LocationOnIcon />
                <Typography>Level 3, East Century Mall</Typography>
              </InfoItem>
              <InfoItem>
                <PhoneIcon />
                <Typography>(029) 883-8920</Typography>
              </InfoItem>
              <InfoItem>
                <EmailIcon />
                <Typography>info@silverkitchen.com</Typography>
              </InfoItem>
              <InfoItem>
                <AccessTimeIcon />
                <Typography>Mon - Sun: 11:00 AM - 11:00 PM</Typography>
              </InfoItem>

              <Box sx={{ mt: 6, textAlign: 'center' }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#8B0000',
                    mb: 2,
                    fontWeight: 'bold',
                  }}
                >
                  Follow Us
                </Typography>
                <Box>
                  <SocialIcon>
                    <FacebookIcon />
                  </SocialIcon>
                  <SocialIcon>
                    <InstagramIcon />
                  </SocialIcon>
                  <SocialIcon>
                    <TwitterIcon />
                  </SocialIcon>
                </Box>
              </Box>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={8}>
            <StyledPaper sx={{ p: 4 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  color: '#8B0000',
                  fontWeight: 'bold',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '40px',
                    height: '2px',
                    backgroundColor: '#8B0000',
                  }
                }}
              >
                Send us a Message
              </Typography>
              {status.message && (
                <Alert 
                  severity={status.type} 
                  sx={{ 
                    mb: 3,
                    borderRadius: '12px',
                    backgroundColor: status.type === 'success' ? 'rgba(139, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                    color: status.type === 'success' ? '#8B0000' : '#d32f2f',
                    border: `1px solid ${status.type === 'success' ? '#8B0000' : '#d32f2f'}`,
                    '& .MuiAlert-icon': {
                      color: status.type === 'success' ? '#8B0000' : '#d32f2f',
                    },
                  }}
                >
                  {status.message}
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledButton
                      type="submit"
                      variant="contained"
                      fullWidth
                    >
                      Send Message
                    </StyledButton>
                  </Grid>
                </Grid>
              </form>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact; 