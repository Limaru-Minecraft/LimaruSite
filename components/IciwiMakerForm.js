import Heading from './LayoutComponents/Heading';
import RouteTable from './RouteTable';
import FareTable from './FareTable';
import { useState } from 'react';

const FareMap = class {
    /**
     * Create a FareMap
     * @param {Array<{distance: Number, fares: Array<{clazz: String, fare: Number}>}>} fareMap 
     */
    constructor (fareMap) {
        this.fareMap = fareMap;
    }

    /**
     * 
     * @param {String} clazz 
     */
    getClass (clazz) {
        let a = new Map();
        this.fareMap.forEach( (entry) => {
            let d = entry.distance;
            entry.fares.forEach( (f) => (f.clazz === clazz) && a.set(d, f.fare) );
        });
        return a;
    }
}

export default function IciwiMakerForm ({submitFunction}) {
    const [routes, setRoutes] = useState([{ line: '', stations: [''] }]);
    const [fares, setFares] = useState([['']]);

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
