import { Box, Link, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                p: 2,
                textAlign: 'center',
            }}
        >
            <Typography variant="caption" color="text.secondary">
                This site is a part of{' '}
                <Link
                    href="https://mwasyluk.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                >
                    mwasyluk.pl
                </Link>{' '}
                infrastructure. All rights are reserved.
            </Typography>
        </Box>
    );
}
