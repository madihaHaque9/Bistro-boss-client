import { Helmet } from 'react-helmet-async';
import Cover from '../shared/Cover/Cover';
import menuImg from '../../assets/menu/menu-bg.jpg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import useMenu from '../../hooks/useMenu';
import SectionTile from '../../components/SectionTitle/SectionTile';
import MenuCategory from './MenuCategory';

const Menu = () => {
    const [menu]=useMenu()
    const dessert=menu.filter(item => item.category ==='dessert')
    const soup=menu.filter(item => item.category ==='soup')
    const salad=menu.filter(item => item.category ==='salad')
    const pizza=menu.filter(item => item.category ==='pizza')
    const offered=menu.filter(item => item.category ==='offered')
    return (
        <div>
            <Helmet>
        <title>Bistro Menu</title>
        
      </Helmet>
      <Cover title={"Our Menu"} img={menuImg}></Cover>
      
           <SectionTile subheading={"Don't miss todays offer" } heading={"Todays offer"}></SectionTile>
           <MenuCategory items={offered}></MenuCategory>
           <MenuCategory items={dessert} title={"Dessert"} img={dessertImg}></MenuCategory>
           <MenuCategory items={pizza} title={"Pizza"} img={pizzaImg}></MenuCategory>
           <MenuCategory items={soup} title={"Soup"} img={soupImg}></MenuCategory>
           <MenuCategory items={salad} title={"Salad"} img={saladImg}></MenuCategory>
        </div>
    );
};

export default Menu;