import { Link, Typography } from '@mui/material';
import { useLocale } from '../contexts/LocaleContext';

const year = new Date().getFullYear();

export default function Footer() {
    const { t } = useLocale();

    return (
        <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 0.5, textAlign: 'center' }}>
            ©{year}{' '}
            <Link
                href="https://mwasyluk.pl"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
            >
                mwasyluk.pl
            </Link>
            {`. ${t.footer.copyright}.`}
        </Typography>
    );
}
