import { createContext, useContext, useMemo, useState } from "react";
import en from "../locales/en.js";
import pl from "../locales/pl.js";

/** @typedef {"en" | "pl" } Locale */
/** @typedef {typeof en} Messages */
/** @typedef {{ locale: Locale; setLocale: (loc: Locale) => void; t: Messages }} LocaleContextValue */

const DICT = { en, pl };

const LS_KEY = "todosapp:locale";

function getInitialLocale() {
    const fromLS = (localStorage.getItem(LS_KEY));
    if (fromLS && DICT[fromLS]) return fromLS;
    const nav2 = (navigator.language || "en").slice(0, 2).toLowerCase();
    return (nav2 === "pl" ? "pl" : "en");
}

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
    const [locale, setLocaleState] = useState(() => getInitialLocale());

    const setLocale = (loc) => {
        if (!DICT[loc]) return;
        localStorage.setItem(LS_KEY, loc);
        setLocaleState(loc);
    };

    const t = useMemo(() => DICT[locale], [locale]);
    const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

    return (
        <LocaleContext.Provider value={value}>
            {children}
        </LocaleContext.Provider>
    );
}

/** @returns {LocaleContextValue} */
export function useLocale() {
    const ctx = useContext(LocaleContext);
    if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
    return ctx;
}
