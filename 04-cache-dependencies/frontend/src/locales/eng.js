const eng = {
    buttons: {
        add: "Add",
        save: "Save",
        cancel: "Cancel",
    },
    form: {
        titleLabel: "Title",
        descriptionLabel: "Description",
        priorityLabel: "Priority",
        titlePlaceholder: "What do you need to do?",
        descPlaceholder: "How do you need to achieve that?",
    },
    notifications: {
        unknownError: "Something went wrong. Refresh the page and try again.",
        savedLocal: "Changes saved in the local memory.",
        savedServer: "Changes pushed to the server.",
        notFoundServer: "Todo could not be found on the server",
        unauthorizedServer: "Unauthorized. Pass the correct secret or clear the secret field.",
        saveLocalError: "Failed to save data in the local memory.",
        readLocalError: "Failed to read data from the local memory.",
        readServerError: "Failed to read data from the server.",
        badRequestServerError: "Bad request. Failed to push changes to the server.",
        modifyServerWithoutSecretError: "This action cannot be executed without the secret."
    }
};

export default eng;
