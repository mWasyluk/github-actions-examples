import { Link } from '@mui/material';
import { ALERT_SEVERITIES, useAlert } from '../contexts/AlertContext';

export function isSafeUrl(url) {
    return /^(https?:\/\/|\/)/i.test(url);
}

export function SafeLink({ href, blank = true, children }) {
    const { showAlert } = useAlert();

    const handleClick = e => {
        if (!isSafeUrl(href)) {
            e.preventDefault();
            showAlert('Blocked unsafe link for your security.', ALERT_SEVERITIES.ERROR);
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
