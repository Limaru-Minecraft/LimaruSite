export default function FareTable ({ fares, setFares }) {
	// handle change in cell
	const handleChange = (i, j, event) => {
		const {name, value} = event.target;
		const list = [...fares];
		if (name === 'fare') {
			list[i][j] = value;
		}
		setFares(list);
	};

	const handleAddRow = () => {
		setFares([...fares, Array(fares[0].length).fill('')]);	
	};

	const handleAddCol = () => {
		const list = [...fares];
		list.forEach( (e) => e.push('') );
		setFares(list);
	};

	const handleRemoveRow = (index) => {
		const list = [...fares];
		list.splice(index, 1);
		setFares(list);
	};

	const handleRemoveCol = (index) => {
		const list = [...fares];
		list.forEach( (e) => e.splice(index, 1) );
		setFares(list);
	};

	return (
		<div>
		{/* Add row/col buttons */}
		<button
			type='button'
			onClick={handleAddRow}
            class='px-4 py-2 font-bold text-white bg-lime-600 rounded-full hover:bg-lime-700 mb-4' 
		>Add row</button>
		<button
			type='button'
			onClick={handleAddCol}
            class='px-4 py-2 font-bold text-white bg-lime-600 rounded-full hover:bg-lime-700 mb-4' 
		>Add column</button>
			
<div class='grid gap-2'>
		{/* Headers */}
			<div>
			{fares[0].map( (header, j) => (
			<span key={j}>
				<input
					name='fare'
					value={j == 0 ? "Distance" : header}
					onChange={event => handleChange(0, j, event)}
					placeholder='Fare class'
					class='border border-black py-2 px-4 font-bold rounded'
				/>
				{fares[0].length > 1 && (
				<button
					type='button'
					onClick={() => handleRemoveCol(j)}
					className="m-2 px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
				>-</button>
				)}
			</span>
			))}
			</div>
			
		{/* Items */}
			{fares.map( (item, i) => i != 0 && (
			<div key={i}>
				{item.map( (fare, j) => (
				<span key={j}>
					<input
						name='fare'
						value={fare}
						onChange={event => handleChange(i, j, event)}
						placeholder='Amount'
						class='border border-black py-2 px-4 rounded'
					/>
				</span>
				))}
				<span>
					<button
						type='button'
						onClick={() => handleRemoveRow(i)}
						className="ml-2 px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
					>-</button>
				</span>
			</div>
			))}
</div>
		
		</div>
	);
}
