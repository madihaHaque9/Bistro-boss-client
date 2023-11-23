import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const Login = () => {
   
    const [disabled,setDisabled]=useState(true);
    const {signIn}=useContext(AuthContext)
    const navigate=useNavigate();
    const location=useLocation();
    const from=location.state?.from?.pathname || '/'
    console.log("state in the location login page ",location.state)
    useEffect(()=>{
        loadCaptchaEnginge(6);

    },[])
    const handleLogin=e=>{
        e.preventDefault();
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password)
        signIn(email,password)
        .then(res=>{
            const user=res.user;
            console.log(user)
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "You have successfully logged in",
              showConfirmButton: true,
              timer: 1500
            });
            navigate(from, {replace:true})

        })


    }
    const handleValidateCaptcha=(e)=>{
        const user_captcha_value=e.target.value;
        if(validateCaptcha(user_captcha_value) ){
          setDisabled(false)
        }
        else{
setDisabled(true)
        }



    }

    return (
        <>
        <Helmet>
        <title>Bistro Login</title>
        
      </Helmet>
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center md:w-1/2 lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleLogin}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
          <LoadCanvasTemplate />
          </label>
          <input onBlur={handleValidateCaptcha} type="text" placeholder="type the text above" name="captcha" className="input input-bordered" required />
          
         
        </div>
        <div className="form-control mt-6">
        
          <input disabled={false} type="submit" value="Login" className="btn btn-primary"/>
        </div>
      </form>
     <p className='px-6'> <small>New Here?<Link to='/signup'>Create an account</Link></small></p>
     <SocialLogin></SocialLogin>
    </div>
  </div>
  
</div>
        </>
    );
};

export default Login;