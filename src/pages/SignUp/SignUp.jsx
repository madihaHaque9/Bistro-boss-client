import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';


const SignUp = () => {
  const axiosPublic= UseAxiosPublic();
    const {
        register,
        handleSubmit,reset,
        formState: { errors },
      } = useForm();
      const {createUser,updateUserProfile}=useContext(AuthContext)
      const navigate=useNavigate()
      const onSubmit =data=>{
        console.log(data)
        createUser(data.email,data.password)
        .then(res=>{
          const loggedUser=res.user;
          console.log(loggedUser)
          updateUserProfile(data.name,data.photoURL)
          .then(()=>{
            const userInfo={
              name:data.name,
              email:data.email
            }
             axiosPublic.post('/users',userInfo)
             .then(res=>{
              if(res.data.insertedId){
                console.log("Added User")
                reset()
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "User created Successfully",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/')
              }
             })
       
          })
          .catch(error=>console.error(error))
          
        })
      }

    return (

        <>
         <Helmet>
        <title>Bistro Sign Up</title>
        
      </Helmet>
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name",{required:true})} name="name" placeholder="email" className="input input-bordered" required />
          {errors.name && <span className='text-red-600'>Name is required!</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="text" {...register("photoURL",{required:true})} placeholder="PHOTO URL" className="input input-bordered" required />
          {errors.photoURL && <span className='text-red-600'>Photo URL is required!</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" {...register("email",{required:true})} required />
          {errors.email && <span className='text-red-600'>Email is required!</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" {...register("password",{required:true ,minLength:6, maxLength:20,pattern:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
})} required />
          
          {errors.password?.type ==='required' && <p className='text-red-600'> Password is required </p>}
          {errors.password?.type ==='minLength' && <p className='text-red-600'> Password must be 6 characters </p>}
          {errors.password?.type ==='maxLength' && <p className='text-red-600'> Password must be lesser than 20 characters </p>}
          {errors.password?.type ==='pattern' && <p className='text-red-600'> Password must have one uppercase, one lower case,one number,one special character  </p>}

          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input type='submit' value="Sign Up" className="btn btn-primary"></input>
        </div>
      </form>
      <p className='px-6'>Already have an account? <Link to='/login'>Login</Link></p>
    </div>
  </div>
</div>
        </>
    );
};

export default SignUp;