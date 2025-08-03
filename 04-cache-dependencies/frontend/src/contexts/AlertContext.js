import { Alert, Snackbar } from "@mui/material";
import { createContext, useCallback, useContext, useRef, useState } from "react";

export const ALERT_SEVERITIES = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error"
};

const AlertContext = createContext();

const defaultOpts = {
    open: false,
    message: "",
    severity: ALERT_SEVERITIES.INFO,
    duration: 4000
}

export function AlertProvider({ children }) {
    const [alertOpts, setAlertOpts] = useState(defaultOpts);

    const onCloseRef = useRef(() => { });

    const showAlert = useCallback((message, severity = ALERT_SEVERITIES.INFO, onClose = () => { }, duration = 4000) => {
        onCloseRef.current = onClose;
        setAlertOpts({ open: true, message, severity, duration });
    }, []);

    const handleClose = () => {
        setAlertOpts(prev => ({ ...prev, open: false }));
        onCloseRef.current();
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            <Snackbar
                open={alertOpts.open}
                autoHideDuration={alertOpts.duration}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity={alertOpts.severity} onClose={handleClose}>
                    {alertOpts.message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const ctx = useContext(AlertContext);
    if (!ctx) throw new Error("useAlert must be used within AlertProvider");
    return ctx;
}
