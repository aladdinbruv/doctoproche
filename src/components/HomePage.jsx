import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    Grid,
    Card,
    CardContent,
    CardMedia,
    styled,
    AppBar,
    Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';


// Styled components
const StyledAppBar = styled(AppBar)({
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1100,
});

const Logo = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#4285f4',
    fontSize: '1.5rem',
    '& img': {
        height: '40px',
    },
});

const NavLinks = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    '& a': {
        textDecoration: 'none',
        color: '#333',
        cursor: 'pointer',
    },
});

const HeroSection = styled(Box)({
    background: '#4285f4',
    color: 'white',
    padding: '60px 0',
    borderRadius: '10px',
    marginTop: '20px',
    position: 'relative',
    overflow: 'hidden',
});

const SpecialityCard = styled(Box)({
    textAlign: 'center',
    padding: '20px',
    '& img': {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        marginBottom: '10px',
    },
});

const DoctorCard = styled(Card)({
    maxWidth: 345,
    margin: '10px',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
});

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    const specialities = [
        { title: 'General physician', image: '/placeholder-doctor.png' },
        { title: 'Gynecologist', image: '/placeholder-doctor.png' },
        { title: 'Dermatologist', image: '/placeholder-doctor.png' },
        { title: 'Pediatrician', image: '/placeholder-doctor.png' },
        { title: 'Neurologist', image: '/placeholder-doctor.png' },
        { title: 'Gastroenterologist', image: '/placeholder-doctor.png' },
    ];

    const doctors = Array(10).fill({
        name: 'Dr. Richard James',
        speciality: 'General physician',
        image: '/placeholder-doctor.png',
        available: true,
    });

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Logo>
                        <img src="/placeholder-logo.png" alt="DoctoProche" />
                        <span>DoctoProche</span>
                    </Logo>
                    <NavLinks>
                        <a>HOME</a>
                        <a>FIND DOCTORS</a>
                        <a>ABOUT</a>
                        <a>CONTACT</a>
                        <Button 
                            variant="contained"
                            onClick={handleLogout}
                            sx={{
                                backgroundColor: '#4285f4',
                                '&:hover': { backgroundColor: '#3367d6' },
                            }}
                        >
                            Logout
                        </Button>
                    </NavLinks>
                </Toolbar>
            </StyledAppBar>

            <Container maxWidth="lg">
                <HeroSection>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6} sx={{ p: 4 }}>
                            <Typography variant="h3" component="h1" gutterBottom>
                                Book Appointment
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                With Trusted Doctors
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                Simply browse through our extensive list of trusted doctors,
                                schedule your appointment hassle-free.
                            </Typography>
                            <Button 
                                variant="contained" 
                                sx={{ 
                                    backgroundColor: 'white',
                                    color: '#4285f4',
                                    '&:hover': { backgroundColor: '#f5f5f5' },
                                }}
                            >
                                Book appointment →
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img 
                                src="/placeholder-doctors-group.png" 
                                alt="Doctors"
                                style={{ 
                                    width: '100%',
                                    maxHeight: '400px',
                                    objectFit: 'contain',
                                }}
                            />
                        </Grid>
                    </Grid>
                </HeroSection>

                <Box sx={{ my: 8 }}>
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        Find by Speciality
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
                    </Typography>
                    <Grid container spacing={3}>
                        {specialities.map((speciality, index) => (
                            <Grid item xs={6} sm={4} md={2} key={index}>
                                <SpecialityCard>
                                    <img src={speciality.image} alt={speciality.title} />
                                    <Typography variant="body1">{speciality.title}</Typography>
                                </SpecialityCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ my: 8 }}>
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        Top Doctors to Book
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                        Simply browse through our extensive list of trusted doctors.
                    </Typography>
                    <Grid container spacing={3}>
                        {doctors.map((doctor, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <DoctorCard>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={doctor.image}
                                        alt={doctor.name}
                                    />
                                    <CardContent>
                                        <Typography 
                                            variant="caption" 
                                            color="success.main"
                                            sx={{ display: 'block', mb: 1 }}
                                        >
                                            ● Available
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {doctor.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {doctor.speciality}
                                        </Typography>
                                    </CardContent>
                                </DoctorCard>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Button variant="outlined">more</Button>
                    </Box>
                </Box>

                <Box 
                    sx={{ 
                        my: 8, 
                        backgroundColor: '#4285f4',
                        borderRadius: '10px',
                        color: 'white',
                        p: 4,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h4" component="h2" gutterBottom>
                        Book Appointment
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        With 100+ Trusted Doctors
                    </Typography>
                    <Button 
                        variant="contained" 
                        sx={{ 
                            mt: 2,
                            backgroundColor: 'white',
                            color: '#4285f4',
                            '&:hover': { backgroundColor: '#f5f5f5' },
                        }}
                    >
                        Create account
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default HomePage; 