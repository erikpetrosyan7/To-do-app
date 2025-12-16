import { type Todo } from '../types';
import { useState } from 'react';

interface TodoListProps {
	todos: Todo[];
	onDelete: (id: number) => void;
	onEdit: (id: number, newText: string) => void;
}

export default function TodoList({ todos, onDelete, onEdit }: TodoListProps) {
	const [editId, setEditId] = useState<number | null>(null);
	const [editText, setEditText] = useState('');

	function startEdit(todo: Todo) {
		setEditId(todo.id);
		setEditText(todo.text);
	}

	function saveEdit() {
		if (editText.trim() !== '' && editId !== null) {
			onEdit(editId, editText);
			setEditId(null);
			setEditText('');
		}
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			saveEdit();
		}
		if (e.key === 'Escape' && editId !== null) {
			const originalTodo = todos.find(todo => todo.id === editId);
			if (originalTodo) {
				setEditText(originalTodo.text);
				setEditId(null);
			}
		}
	}

	return (
		<ul className='todo-list'>
			{todos.map(todo => (
				<li key={todo.id} className='todo-item'>
					{editId === todo.id ? (
						<>
							<input
								value={editText}
								onChange={e => setEditText(e.target.value)}
								className='todo-input'
								onKeyDown={handleKeyDown}
							/>
							<button className='save-button' onClick={saveEdit}>
								Save
							</button>
						</>
					) : (
						<>
							<span>{todo.text}</span>
							<div className='buttons'>
								<button className='edit-button' onClick={() => startEdit(todo)}>
									Edit
								</button>
								<button
									className='delete-button'
									onClick={() => onDelete(todo.id)}
								>
									Delete
								</button>
							</div>
						</>
					)}
				</li>
			))}
		</ul>
	);
}
