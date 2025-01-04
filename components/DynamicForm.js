import { useState } from 'react'

export default function DynamicForm () {
    const [inputs, setInputs] = useState([{key: '', value: ''}]);

    // handle change in input field
    const handleInputChange = (index, event) => {
        const {name, value} = event.target;
        const list = [...inputs];
        list[index][name] = value;
        setInputs(list);
    };

    // handle the addition of a new input field
    const handleAddClick = () => {
        setInputs([...inputs, {key: '', value: ''}]);
    };

    // handle the removal of an input field
    const handleRemoveClick = index => {
        const list = [...inputs];
        list.splice(index, 1);
        setInputs(list);
    };

    // handle form submission
    const handleSubmit = event => {
        event.preventDefault();

        // Form submission logic here
        console.log('Form submitted:', inputs);
    };

    return (
        <form onSubmit={handleSubmit} class='flex flex-col'>
            <button onClick={handleAddClick} class='px-4 py-2 font-bold text-white bg-lime-600 rounded-full hover:bg-lime-700 mb-4' >Add line</button>
            <div class='flex overflow-x-scroll pb-10'>
                {inputs.map((input, i) => (
                <div key={i} class='inline-block px-3 place-items-stretch'>
                    <div>
                        <input
                        name='key'
                        value={input.key}
                        onChange={event => handleInputChange(i, event)}
                        placeholder='Line'
                        class='border border-black py-2 px-4 font-bold rounded'
                        />{inputs.length !== 1 && (
                            <button onClick={() => handleRemoveClick(i)} class='bg-lime-600 hover:bg-lime-800 text-white font-bold py-2 px-4 border border-lime-700 rounded'>-</button>
                        )}
                    </div>
                    <div>
                        <input
                        name='value'
                        value={input.value}
                        onChange={event => handleInputChange(i, event)}
                        placeholder='Station'
                        class='border border-black py-2 px-4 rounded'
                        />
                    </div>
                </div>
                ))}
            </div>
            <button type='submit' class='px-4 py-2 font-bold text-white bg-lime-600 rounded-full hover:bg-lime-700'>Submit</button>
        </form>
    )
}