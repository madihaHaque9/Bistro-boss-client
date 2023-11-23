import { useEffect, useState } from "react";
import SectionTile from "../../components/SectionTitle/SectionTile";
import MenuItem from "../shared/MenuItem/MenuItem";
import useMenu from "../../hooks/useMenu";


const PopularMenu = () => {
    const [menu]=useMenu();
    const popular=menu.filter(item => item.category ==='popular')


    // const [menu,setMenu]=useState([])
    // useEffect(()=>{
    //     fetch('menu.json')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         const popularItems=data.filter(item=>item.category==='popular')
    //         setMenu(popularItems)
    //     })
    // },[])
    return (
        <section className="mb-12">
            <SectionTile heading="From Our Menu"
            subheading="Popular Items"></SectionTile> <br />
            <div className="grid md:grid-cols-2 gap-10 mx-4">
                {
                    popular.map(item=><MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <button className="btn btn-outline border-0 border-b-4 mt-4 mx-auto flex items-center justify-center">View Full Menu</button>
        </section>
    );
};

export default PopularMenu;