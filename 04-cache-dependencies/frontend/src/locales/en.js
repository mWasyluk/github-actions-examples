const en = /** @type {const} */ {
    info: {
        greeting: "Hi there! 👋",
        section1: `This page hosts a little demo app that I built to encourage visitors to try out 
            a few things, but you can also use it as your own personal to-do list ✔.`,
        section2: `It's important for you to know that adding or editing publicly visible tasks is only possible if 
            you’ve got the admin password 🔑. That means everything you do here will stay
            visible only to you (unless you somehow hacked my password... in that case,
            please don’t cause chaos 🙃🔥).`
    },
    buttons: {
        add: "Add",
        save: "Save",
        update: "Update",
        cancel: "Cancel",
        continue: "Continue",
        deleteAllData: "Delete all data",
    },
    footer: {
        copyright: "All rights reserved"
    },
    tooltips: {
        requiresSecret: "This operation requires a password",
    },
    todo: {
        title: "Title",
        description: "Description",
        priority: "Priority",
        priorities: {
            minor: "Minor",
            important: "Important",
            urgent: "Urgent"
        }
    },
    todoList: {
        todoTitle: "To Do",
        doneTitle: "Done",
        noTodo: "No tasks to display"
    },
    form: {
        addTitle: "Add New Todo",
        editTitle: "Edit Todo",
        serverLabel: "Server",
        titlePlaceholder: "What do you need to do?",
        descPlaceholder: "How are you going to do this?",
        secret: "Password"
    },
    notifications: {
        error: {
            unknown: "Something went wrong. Refresh this page and try again.",
            unsafeLink: "For your security, the unsafe link was blocked due to the missing http(s) protocol.",
            noSecret: "This operation requires password. Provide it in the side bar and try again.",
            unauthorized: "Password is incorrect. Provide the correct one or clear the password field in the side bar.",
            notSavedLocal: "Failed to save data in the local memory. Try again later.",
            notReadLocal: "Failed to read data from the local memory. Refresh this page to try again.",
            notReadServer: "Failed to read data from the server. Refresh this page to try again.",

        },
        success: {
            savedLocal: "Changes saved in the local memory.",
            savedServer: "Changes saved on the server.",
        },
    },
    dialogs: {
        delete: {
            title: "This action cannot be undone",
            description: "This change is permanent and your data will be lost forever. Are you sure you want to continue?",
        }
    }
};

export default en;
