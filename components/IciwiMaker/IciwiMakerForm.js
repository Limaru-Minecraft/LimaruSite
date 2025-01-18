import Heading from '@/components/LayoutComponents/Heading'
import RouteTable from './RouteTable';
import FareTable from './FareTable';
import { useState } from 'react';

export default function IciwiMakerForm ({submitFunction}) {
    const [routes, setRoutes] = useState([{ line: '', stations: [''] }]);
    const [fares, setFares] = useState([['', ''], [0, '']]);

    // handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        submitFunction(routes, fares);
    }

    return (
        <form onSubmit={handleSubmit} class='flex flex-col'>
            <Heading level={3}>Route table</Heading>
            <RouteTable routes={routes} setRoutes={setRoutes}></RouteTable>

            <Heading level={3}>Fare table</Heading>
            <FareTable fares={fares} setFares={setFares}></FareTable>
            
            <button 
                type='submit' 
                class='px-4 py-2 font-bold text-white bg-lime-600 rounded-full hover:bg-lime-700'
            >Submit</button>
        </form>
    )
}
