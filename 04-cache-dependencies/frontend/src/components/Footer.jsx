import { Link, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 0.5, textAlign: 'center' }}>
            ©2025{' '}
            <Link
                href="https://mwasyluk.pl"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
            >
                mwasyluk.pl
            </Link>
            . All rights reserved.
        </Typography>
    );
}
