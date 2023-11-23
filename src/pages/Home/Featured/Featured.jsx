import SectionTile from "../../../components/SectionTitle/SectionTile";
import featuredImg from '../../../assets/home/featured.jpg'
import './featured.css'
const Featured = () => {
    return (
        <div className="featuredItem bg-fixed text-white pt-8">
            <SectionTile subheading="Check it out"
            heading='Featured Item'></SectionTile>
            <div className="md:flex justify-center items-center py-20 px-36 pt-12 bg-slate-500 bg-opacity-40 ">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="mx-6">
                    <p>November,2023</p>
                    <p className="uppercase">
                        Where can i get some?
                    </p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima ex, iure fugiat porro debitis facilis nemo, tempora possimus unde dolorem illum esse! Ratione numquam eligendi provident quia quam dignissimos et. Placeat doloremque maiores autem reprehenderit mollitia explicabo illo, enim sit quam libero, temporibus minus distinctio. Fugit quas iste inventore voluptates!</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;