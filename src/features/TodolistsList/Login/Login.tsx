import React from 'react'
import { Navigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginTC } from './auth-reducer';
import { useAppSelector } from '../../../app/store';


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if(!values.email) {
                errors.email = 'Required email'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if(!values.password) {
                errors.password = 'Required password'
            } else if (!/^[a-z0-9A-Z]{4}/i.test(values.password)){
                errors.password = 'Invalid password address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        }
      });

      if(isLoggedIn){
        return <Navigate to='/'/>
    }
      
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={ formik.handleSubmit }>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'} target={'_blank'} rel={'noreferrer'}>
                                here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField 
                            label="Email" 
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{color:'#ff458a', fontWeight: 'bold' }}>{formik.errors.email}</div>}
                        <TextField 
                            type="password" 
                            label="Password" 
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div style={{color:'#ff458a', fontWeight: 'bold'}}>{formik.errors.password}</div>}
                        <FormControlLabel 
                            label={'Remember me'} 
                            control={<Checkbox 
                                {...formik.getFieldProps('rememberMe')}
                            />} 
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}