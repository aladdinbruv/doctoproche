import React from 'react';
import { 
    Box, 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Link,
    AppBar,
    Toolbar,
    styled
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../utils/axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import logo from '../assets/images/logo.png';


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
    },
});

const CreateAccountButton = styled(Button)({
    backgroundColor: '#4285f4',
    color: 'white',
    '&:hover': {
        backgroundColor: '#3367d6',
    },
});

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required'),
    recaptcha: yup
        .string()
        .required('Please complete the reCAPTCHA'),
});

const SignIn = () => {
    const navigate = useNavigate();
    const recaptchaRef = React.useRef(null);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            recaptcha: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (!values.recaptcha) {
                alert('Please complete the reCAPTCHA');
                return;
            }
            try {
                const response = await api.post('http://localhost:5000/api/auth/login', {
                    email: values.email,
                    password: values.password
                });
                
                if (response.status === 200) {
                    // Store the token
                    localStorage.setItem('token', response.data.token);
                    alert('Signed in successfully!');
                    navigate('/home');
                }
            } catch (error) {
                alert(error.response?.data?.message || 'Error signing in');
            }
        },
    });

    const handleRecaptchaChange = (value) => {
        formik.setFieldValue('recaptcha', value);
    };

    const handleRecaptchaExpired = () => {
        formik.setFieldValue('recaptcha', '');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Logo>
                        <img src={logo} alt="DoctoProche" />
                        <span>DoctoProche</span>
                    </Logo>
                    <NavLinks>
                        <Link href="#">HOME</Link>
                        <Link href="#">FIND DOCTORS</Link>
                        <Link href="#">ABOUT</Link>
                        <Link href="#">CONTACT</Link>
                        <CreateAccountButton 
                            variant="contained" 
                            component={RouterLink} 
                            to="/signup"
                        >
                            Create account
                        </CreateAccountButton>
                    </NavLinks>
                </Toolbar>
            </StyledAppBar>
            
            <Container maxWidth="sm" sx={{ 
                mt: 8,
                mb: 4
            }}>
                <Box sx={{
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Sign-in
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Please sign in to book appointment
                    </Typography>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            margin="normal"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            margin="normal"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Box sx={{ my: 2 }}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey="6LenfZgqAAAAANsipaE9JAhm7A72mXHjkElh5bhj"
                                onChange={handleRecaptchaChange}
                                onExpired={handleRecaptchaExpired}
                            />
                            {formik.touched.recaptcha && formik.errors.recaptcha && (
                                <Typography color="error" variant="caption">
                                    {formik.errors.recaptcha}
                                </Typography>
                            )}
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: 2,
                                backgroundColor: '#4285f4',
                                '&:hover': {
                                    backgroundColor: '#3367d6',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    </form>

                    <Typography sx={{ mt: 2, textAlign: 'center' }}>
                        Don't have an account?{' '}
                        <Link 
                            component={RouterLink}
                            to="/signup"
                            sx={{ color: '#4285f4', cursor: 'pointer' }}
                        >
                            Create account
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default SignIn; 