import { TabList, Tabs,Tab,TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import orderCover from '../../../assets/shop/order.jpg'
import Cover from '../../shared/Cover/Cover';
import { useState } from 'react';
import useMenu from '../../../hooks/useMenu';

import OrderTab from './OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const categories=['salad','pizza','soup','dessert','drinks'];
    const {category}=useParams();
    const initialIndex= categories.indexOf(category)
    const [tabIndex,setTabindex]=useState(initialIndex)
    const [menu]=useMenu();
  
    
    const dessert=menu.filter(item => item.category ==='dessert')
    const soup=menu.filter(item => item.category ==='soup')
    const salad=menu.filter(item => item.category ==='salad')
    const pizza=menu.filter(item => item.category ==='pizza')
    const drinks=menu.filter(item => item.category ==='drinks')

    return (
        <div>
            <Helmet>
        <title>Bistro Menu | Order Food</title>
        
      </Helmet>
           <Cover img={orderCover} title={"Order Food"}></Cover> 
           <Tabs className="mx-auto text-center mt-4" defaultIndex={tabIndex} onSelect={(index) => setTabindex(index)}>
      <TabList>
        <Tab>Salad</Tab>
        <Tab>Pizza</Tab>
        <Tab>Soup</Tab>
        <Tab>Dessert</Tab>
        <Tab>Drinks</Tab>

      </TabList>
      <TabPanel>
      <OrderTab items={salad}></OrderTab>
      </TabPanel>
      <TabPanel>
        <OrderTab items={pizza}></OrderTab>
      </TabPanel>
      <TabPanel>
        <OrderTab items={soup}></OrderTab>
      </TabPanel>
      <TabPanel>
      <OrderTab items={dessert}></OrderTab>
      </TabPanel>
      <TabPanel>
      <OrderTab items={drinks}></OrderTab>
      </TabPanel>
    </Tabs>

          
</div>
       
    );
};

export default Order;