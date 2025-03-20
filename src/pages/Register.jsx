import { Form, useNavigation, useActionData } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';
import { Button } from '../components/Button';
import { CircularProgress, LinearProgress } from '../components/Progress';
import { useEffect } from 'react';
import { useSnackbar } from '../hooks/useSnackbar';
import { AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';
import { banner } from '../assets/assets';
import { Link } from 'react-router-dom';
const Register = () => {
  const navigation = useNavigation();
  const error = useActionData();
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    if (error?.message) {
      showSnackbar({
        message: error.message,
        type: 'error',
      });
    }
  }, [error, showSnackbar]);
  return (
    <>
      <PageTitle title={'Create an account'} />
      <div className='relative w-screen h-dvh p-2 grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2 items-center'>
        <div className='flex flex-col p-4'>
          <div className='flex flex-col gap-2 max-w-[480px] w-full mx-auto'>
            <h2 className='text-displaySmall font-semibold text-light-onBackground dark:text-dark-onBackground text-center'>
              Create an account
            </h2>
            <p className='text-bodyLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-1 mb-5 text-center px-2'>
              Register today and gain access to powerful tools that will
              superchange your ideas.
            </p>
            {/* REGISTER FORM */}
            <Form
              method='POST'
              className='grid grid-cols-1 gap-4'
            >
              <TextField
                type='text'
                name='name'
                label='Full Name'
                placeholder='Full Name'
                required={true}
                autoFocus={true}
                helperText='Some helper text'
              />
              <TextField
                type='email'
                name='email'
                label='Email Address'
                placeholder='Email'
                required={true}
              />
              <TextField
                type='password'
                name='password'
                label='Password'
                placeholder='Enter Your Password'
                required={true}
              />
              <Button
                type='submit'
                disabled={navigation.state === 'Submitting'}
              >
                {navigation.state === 'submitting' ? (
                  <CircularProgress size='small' />
                ) : (
                  'Create account'
                )}
              </Button>
            </Form>
            <p className='text-bodyMedium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-center mt-4'>
              Already have an account?
              <Link
                to='/login'
                className='link text-labelLarge inline-block ms-1 text-light-onSurface dark:text-dark-onSurface'
              >
                Sign in
              </Link>
            </p>
          </div>
          <p className='mt-auto mx-auto text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-bodyMedium lg:mx-0 pt-10'>
            &copy; 2024 Dimas Rizki. All right reserved.
          </p>
        </div>
        <div className='hidden img-box lg:block lg:relative lg:rounded-large'>
          <img
            src={banner}
            alt=''
            className='img-cover'
          />
          <p className='absolute bottom-10 left-12 right-12 z-10 text-displayLarge font-semibold leading-tight text-right text-light-onSurface drop-shadow-sm 2xl:text-[72px]'>
            Chat with Mori to superchange your ideas.
          </p>
        </div>
      </div>
      <AnimatePresence>
        {navigation.state == 'loading' && (
          <LinearProgress classes='absolute top-0 left-0 right-0' />
        )}
      </AnimatePresence>
    </>
  );
};

export default Register;
