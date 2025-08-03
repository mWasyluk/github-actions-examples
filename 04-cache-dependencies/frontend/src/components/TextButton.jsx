import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    }
}));

export default function TextButton({ children, icon, onClick }) {
    return (
        <StyledButton
            startIcon={icon}
            onClick={onClick}
            disableElevation
            disableRipple
        >
            {children}
        </StyledButton>
    );
}
