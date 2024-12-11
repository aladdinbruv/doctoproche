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
    styled,
    MenuItem
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
    firstName: yup
        .string()
        .required('First name is required'),
    lastName: yup
        .string()
        .required('Last name is required'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
    phoneNumber: yup
        .string()
        .required('Phone number is required'),
    role: yup
        .string()
        .oneOf(['patient', 'doctor'], 'Invalid role')
        .required('Role is required'),
    recaptcha: yup
        .string()
        .required('Please complete the reCAPTCHA'),
});

const SignUp = () => {
    const recaptchaRef = React.useRef(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
            role: 'patient',
            recaptcha: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (!values.recaptcha) {
                alert('Please complete the reCAPTCHA');
                return;
            }
            try {
                const response = await axios.post('http://localhost:5000/api/auth/register', {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    phoneNumber: values.phoneNumber,
                    role: values.role
                });

                if (response.status === 201) {
                    alert('Account created successfully!');
                    navigate('/signin');
                }
            } catch (error) {
                alert(error.response?.data?.message || 'Error creating account');
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
                        <CreateAccountButton variant="contained">
                            Create account
                        </CreateAccountButton>
                    </NavLinks>
                </Toolbar>
            </StyledAppBar>

            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Box sx={{
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Create Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Please sign up to book appointment
                    </Typography>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            margin="normal"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />

                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            margin="normal"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />

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

                        <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            margin="normal"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        />

                        <TextField
                            select
                            fullWidth
                            id="role"
                            name="role"
                            label="Role"
                            margin="normal"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            helperText={formik.touched.role && formik.errors.role}
                        >
                            <MenuItem value="patient">Patient</MenuItem>
                            <MenuItem value="doctor">Doctor</MenuItem>
                        </TextField>

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
                            Create Account
                        </Button>
                    </form>

                    <Typography sx={{ mt: 2, textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link 
                            component={RouterLink}
                            to="/signin" 
                            sx={{ color: '#4285f4' }}
                        >
                            Login here
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default SignUp; 