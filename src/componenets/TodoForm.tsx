import { useState, type ChangeEvent, type FormEvent } from 'react';

interface TodoFormProps {
	onAddTodo: (text: string) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
	const [newTodo, setNewTodo] = useState<string>('');
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setNewTodo(e.target.value);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!newTodo.trim()) return;
		onAddTodo(newTodo);
		setNewTodo('');
	}

	return (
		<form className='todo-form' onSubmit={handleSubmit}>
			<input
				type='text'
				value={newTodo}
				className='todo-input'
				placeholder='Text something'
				onChange={handleChange}
			/>
			<button className='todo-button' type='submit'>
				Add a text
			</button>
		</form>
	);
}
