import { Link } from '@mui/material';
import { ALERT_SEVERITIES, useAlert } from '../contexts/AlertContext';
import { useLocale } from '../contexts/LocaleContext';

export function isSafeUrl(url) {
    return /^(https?:\/\/|\/)/i.test(url);
}

export function SafeLink({ href, blank = true, children }) {
    const { showAlert } = useAlert();
    const { t } = useLocale();

    const handleClick = e => {
        if (!isSafeUrl(href)) {
            e.preventDefault();
            showAlert(t.notifications.error.unsafeLink, ALERT_SEVERITIES.ERROR);
        }
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            target={blank ? "_blank" : '_self'}
            rel="noopener noreferrer"
            color="primary"
        >
            {children}
        </Link>
    );
}
