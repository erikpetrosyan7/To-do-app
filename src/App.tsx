import { useState, useEffect } from 'react';
import TodoForm from './componenets/TodoForm';
import TodoList from './componenets/TodoList';
import DarkModeToggle from './componenets/DarkMode';
import { type Todo } from './types';
import './index.css';

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedTodos = localStorage.getItem('todos');
		if (savedTodos) setTodos(JSON.parse(savedTodos));
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	function addTodo(text: string) {
		const newTodo: Todo = {
			id: Date.now(),
			text,
		};
		setTodos([...todos, newTodo]);
	}

	function deleteTodo(id: number) {
		setTodos(todos.filter(todo => todo.id !== id));
	}

	function editTodo(id: number, newText: string) {
		setTodos(
			todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
		);
	}

	function toggleDarkMode() {
		setDarkMode(prev => !prev);
	}

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	}, [darkMode]);

	return (
		<div>
			<h1>My Todo App</h1>
			<DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
			<TodoForm onAddTodo={addTodo} />
			<TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} />
		</div>
	);
}

export default App;
