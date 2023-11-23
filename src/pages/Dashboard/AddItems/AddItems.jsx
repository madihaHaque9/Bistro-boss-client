import { useForm } from "react-hook-form";
import SectionTile from "../../../components/SectionTitle/SectionTile";
import { FaUtensils } from "react-icons/fa";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";
import UseAxiosSecure from "../../../UseAxiosSecure/UseAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const {register,handleSubmit}=useForm();
    const axiosPublic=UseAxiosPublic()
    const axiosSecure=UseAxiosSecure()
    const onSubmit =async(data)=>{
        console.log(data)
        const imageFile={image:data.image[0]}
        const res=await axiosPublic.post(image_hosting_api,imageFile,{
            headers:{
                'content-type':'multipart/form-data'
            }
        })
        if(res.data.success){
            const menuItem={
                name:data.name,
                category:data.category,
                price:parseFloat(data.price),
                recipe:data.recipe,
                image:res.data.data.display_url
            }
            const menuRes= await axiosSecure.put('/menu',menuItem);
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                Swal.fire({
                    icon:"Success",
                    title:`${data.name} is added to the menu`
                })
            }
        }

    };
    return (
        <div>
        <SectionTile heading="add item" subheading="What's New?"></SectionTile>
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name",{required:true})} />
      <div className="form-control w-full my-6 ">
  <label className="label">
    <span className="label-text">Recipe Name*</span>
 
  </label>
  <input type="text" placeholder="Recipe Name" 
  {
    ...register('name')
  }
  
  className="input input-bordered w-full " />
  
</div>
<div className="flex gap-6">
<div className="form-control w-full my-6 ">
  <label className="label">
    <span className="label-text">Category*</span>
 
  </label>
  <select defaultValue="default" {...register('category' ,{required:true})} className="select select-bordered w-full ">
  <option disabled value="default">Select a Category</option>
  <option value="salad">Salad</option>
  <option value="pizza">Pizza</option>
  <option value="soup">Soup</option>
  <option value="dessert">Dessert</option>
  <option value="drinks">Drinks</option>
  
</select>
  
</div>
<div className="form-control w-full my-6 ">
  <label className="label">
    <span className="label-text">Price*</span>
 
  </label>
  <input type="number" placeholder="Price" 
  {
    ...register('price' ,{required:true})
  }
  
  className="input input-bordered w-full " />
  
</div>


</div>
<div className="form-control">
  <label className="label">
    <span className="label-text">Recipe Details </span>
    
  </label>
  <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
  
</div>
<div className="form-control w-full my-6">
<input {...register('image',{required:true})} type="file" className="file-input w-full max-w-xs" />
</div>
      
      
     <button className="btn">
        Add Item <FaUtensils className="ml-4"></FaUtensils>
     </button>
    </form>
        </div>
        </div>
    );
};

export default AddItems;