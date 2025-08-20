import { SafeLink } from "../components/SafeLink";

export const PRIORITY_MAP = { 0: 'minor', 1: 'important', 2: 'urgent' };
export const REVERSE_PRIORITY_MAP = { minor: 0, important: 1, urgent: 2 };

export function mapServerTodo(serverTodo) {
    return {
        id: String(serverTodo.id),
        title: serverTodo.title || '',
        description: serverTodo.description || '',
        priority: PRIORITY_MAP[serverTodo.priority] || 'minor',
        isDone: Boolean(serverTodo.isDone),
        origin: 'server'
    };
}

export function mapToServerPayload(feTodo) {
    return {
        title: feTodo.title,
        description: feTodo.description,
        priority: REVERSE_PRIORITY_MAP[feTodo.priority]
    };
}

export function sortByPriorityAndTitle(todos) {
    return [...todos].sort((a, b) => {
        const pa = REVERSE_PRIORITY_MAP[a.priority] || 0;
        const pb = REVERSE_PRIORITY_MAP[b.priority] || 0;

        // Compare by priority descending
        if (pb !== pa) {
            return pb - pa;
        }

        // Same priority: compare title ascending
        return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
    });
}

export function linkify(text) {
    if (typeof text !== 'string') return text;

    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // push any text before the match
        if (match.index > lastIndex) {
            result.push(text.slice(lastIndex, match.index));
        }

        const [full, linkText, href] = match;
        result.push(
            <SafeLink key={lastIndex} href={href} >
                {linkText}
            </SafeLink>
        );
        lastIndex = match.index + full.length;
    }

    // push remaining text
    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
    }

    return result;
}
