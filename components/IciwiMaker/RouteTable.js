export default function RouteTable ({ routes, setRoutes }) {
    // handle change in line headers
    const handleLineChange = (index, event) => {
        const {name, value} = event.target;
        const list = [...routes];
        if (name === 'line') {
            list[index].line = value;
        }
        setRoutes(list);
    };

    // handle station changes
    const handleStationChange = (lineIndex, stationIndex, event) => {
        const { value } = event.target;
        const list = [...routes];
        list[lineIndex].stations[stationIndex] = value;
        setRoutes(list);
    };

    // handle adding a line
    const handleAddLine = () => {
        setRoutes([...routes, {line: '', stations: ['']}]);
    };

    // handle removing a line
    const handleRemoveLine = (index) => {
        const list = [...routes];
        list.splice(index, 1);
        setRoutes(list);
    };

    // Handle adding a new station to a line
    const handleAddStation = (index) => {
        const list = [...routes];
        list[index].stations.push('');
        setRoutes(list);
        const active = document.activeElement;
        if (active?.nextElementSibling) {
            active.nextElementSibling.focus();
        }
    };

    // Handle removing a station from a line
    const handleRemoveStation = (lineIndex, stationIndex) => {
        const list = [...routes];
        list[lineIndex].stations.splice(stationIndex, 1);
        setRoutes(list);
    };

    const handleKeyDown = (event, type, lineIndex) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            if (type === 'line') {
                handleAddLine();
            } else if (type === 'station') {
                handleAddStation(lineIndex);
            }
        }
    };

    return (
        <div>
        {/* Add line button */}
        <button 
            type="button" 
            onClick={handleAddLine} 
            class='px-4 py-2 font-bold text-white bg-lime-600 rounded-full hover:bg-lime-700 mb-4' 
        >Add line</button>
        <div class='flex overflow-x-scroll pb-10'>

        {/* Input lines */}
            {routes.map((route, i) => (
            <div key={i} class='inline-block px-3 place-items-stretch'>
                <div class="inline-flex">
                    <input
                        name='line'
                        value={route.line}
                        onChange={event => handleLineChange(i, event)}
                        onKeyDown={(event) => handleKeyDown(event, 'line')}
                        placeholder='Line'
                        class='border border-black py-2 px-4 font-bold rounded'
                    />
                    {routes.length !== 1 && (
                    <button 
                        type="button" 
                        onClick={() => handleRemoveLine(i)} 
                        class="ml-2 bg-lime-600 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded"
                    >-</button>
                    )}
                </div>

            {/* Input stations */}
                {route.stations.map((station, j) => (
                <div key={j} className="flex items-center mt-2">
                    {/* does nothing at the moment */}
                    {/* <input 
                        name='distance'
                        type='number'
                        min='0'
                        placeholder='0'
                        class='mt-2 px-4 py-2 w-1/6 rounded'
                    /> */}
                    <input
                        name='stations'
                        value={station}
                        onChange={event => handleStationChange(i, j, event)}
                        onKeyDown={(event) => handleKeyDown(event, 'station', i)}
                        placeholder='Station'
                        class='border border-black py-2 px-4 rounded'
                    />
                    {route.stations.length > 1 && (
                    <button 
                        type="button" 
                        onClick={() => handleRemoveStation(i, j)} 
                        className="ml-2 px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
                    >-</button>
                    )}
                </div>
                ))}

            {/* Add station button */}
                <button 
                    type="button" 
                    onClick={() => handleAddStation(i)} 
                    className="mt-2 px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700"
                >Add Station</button>

            </div>
            ))}
        </div>
        </div>
    )
}
