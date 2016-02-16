/* @flow */

export type TodoItem = {
    id: string;
    title: string;
    isCompleted: boolean;
};

export type TodoEditingRec = {
    title: string;
}

export type TodoCrudActions = {
    add(item: TodoItem): void;
    remove(id: string): void;
    toggle(id: string): void;
    change(item: TodoItem): void;
    toggleAll(): void;
    clearCompleted(): void;
}

export type TodoFilterActions = {
    showAll(): void;
    showActive(): void;
    showCompleted(): void;
}

export type SelectedGroup = 'all' | 'active' | 'completed';
