import { h, Component } from 'preact';

import createTodoModel from './model';
import TodoHeader from './header';
import TodoFooter from './footer';
import TodoItem from './item';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

const FILTERS = {
	[ALL_TODOS]: todo => true,
	[ACTIVE_TODOS]: todo => !todo.completed,
	[COMPLETED_TODOS]: todo => todo.completed
};

export default class App extends Component {
	model = createTodoModel();

	state = {
		todos: this.model.todos,
		nowShowing: ALL_TODOS
	};

	handleRoute = ({ url }) => {
		let nowShowing = url.replace(/\/$/,'').split('/').pop();
		if (!FILTERS[nowShowing]) {
			nowShowing = ALL_TODOS;
		}
		this.setState({ nowShowing });
	};

	toggleAll = e => {
		this.model.toggleAll(e.target.checked);
	};

	save = (todo, text) => {
		this.model.save(todo, text);
		this.reset();
	};

	reset = () => {
		this.setState({ editing: null });
	};

	componentWillMount() {
		this.model.subscribe( state => {
            this.state.todos = state.todos
            this.forceUpdate()
			// this.setState({ todos: state.todos });
		});
	}

	render({ }, { nowShowing=ALL_TODOS, todos, newTodo, editing }) {
		let shownTodos = todos.filter( FILTERS[nowShowing] ),
			activeTodoCount = todos.reduce( (a, todo) => a + (todo.completed ? 0 : 1), 0),
			completedCount = todos.length - activeTodoCount;

		return (
			<div>
				<TodoHeader addTodo={this.model.addTodo} />

				{ todos.length ? (
					<section id="main">
						<input
							id="toggle-all"
							type="checkbox"
							onChange={this.toggleAll}
							checked={activeTodoCount === 0}
						/>
						<ul id="todo-list">
							{ shownTodos.map( todo => (
								<TodoItem
									key={todo.id}
									todo={todo}
									onToggle={this.model.toggle}
									onDestroy={this.model.destroy}
									editing={editing === todo.id}
									onEdit={(editing) => this.setState({editing})}
									onSave={this.save}
									onCancel={this.reset}
								/>
							)) }
						</ul>
					</section>
				) : null }

				{ (activeTodoCount || completedCount) ? (
					<TodoFooter
						count={activeTodoCount}
						completedCount={completedCount}
						nowShowing={nowShowing}
						onClearCompleted={this.model.clearCompleted}
					/>
				) : null }
			</div>
		);
	}
}
