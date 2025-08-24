// @ts-check
/** @typedef {typeof import("./en.js").default} Messages */

/** @type {Messages} */
const pl = {
    info: {
        greeting: "Cześć! 👋",
        section1: `Ta strona udostępnia wersję demo apki, którą stworzyłem, aby zachęcić odwiedzających 
        do wypróbowania kilku rzeczy, ale Ty możesz ją wykorzystać jako prywatną listę zadań ✔.`,
        section2: `Ważne, żebyś wiedział(a), że dodawanie lub edytowanie publicznie dostępnych zadań jest możliwe tylko po wprowadzeniu 
            hasła admina 🔑. Oznacza to, że wszystko co tutaj zrobisz
            będzie widoczne tylko dla Ciebie (chyba że w jakiś sposób pozyskałeś(aś) moje hasło... w takim wypadku 
            nie narób tu bałaganu, proszę 🙃🔥).`
    },
    buttons: {
        add: "Dodaj",
        save: "Zapisz",
        update: "Aktualizuj",
        cancel: "Anuluj",
        continue: "Kontynuuj",
        deleteAllData: "Usuń wszystkie dane",
    },
    footer: {
        copyright: "Wszystkie prawa zastrzeżone"
    },
    tooltips: {
        requiresSecret: "Ta operacja wymaga hasła",
    },
    todo: {
        title: "Tytuł",
        description: "Opis",
        priority: "Priorytet",
        priorities: {
            minor: "Drobne",
            important: "Ważne",
            urgent: "Pilne"
        }
    },
    todoList: {
        todoTitle: "Do zrobienia",
        doneTitle: "Zrobione",
        noTodo: "Brak zadań do wyświetlenia"
    },
    form: {
        addTitle: "Dodaj nowe zadanie",
        editTitle: "Edytuj zadanie",
        serverLabel: "Serwer",
        titlePlaceholder: "Co chcesz zrobić?",
        descPlaceholder: "Jak chcesz to zrobić?",
        secret: "Hasło"
    },
    notifications: {
        error: {
            unknown: "Coś poszło nie tak. Odśwież tę stronę, aby spróbować ponownie.",
            unsafeLink: "Dla twojego bezpieczeństwa zablokowano niebezpieczny link z powodu braku protokołu http(s).",
            noSecret: "Ta operacja wymaga hasła. Wprowadź je w pasku bocznym i spróbuj ponownie.",
            unauthorized: "Hasło jest niepoprawne. Wprowadź poprawne lub wyczyść pole hasła na pasku bocznym.",
            notSavedLocal: "Nie udało się zapisać danych w pamięci lokalnej. Odśwież stronę i spróbuj ponownie.",
            notReadLocal: "Nie udało się odczytać danych z pamięci lokalnej. Odśwież stronę, aby spróbować ponownie.",
            notReadServer: "Nie udało się odczytać danych z serwera. Odśwież stronę, aby spróbować ponownie.",

        },
        success: {
            savedLocal: "Zmiany zostały zapisane w pamięci lokalnej.",
            savedServer: "Zmiany zostały zapisane na serwerze.",
        },
    },
    dialogs: {
        delete: {
            title: "Ta akcja jest nieodwracalna",
            description: "Zmiana będzie permanentna i Twoje dane przepadną na zawsze. Czy na pewno chcesz kontynuować?",
        }
    }
};

export default pl;
