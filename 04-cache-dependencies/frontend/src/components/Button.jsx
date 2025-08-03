import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MuiButton, {
    shouldForwardProp: prop => prop !== 'variantcolor'
})(({ theme, variantcolor }) => ({
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    ...(variantcolor === 'danger' && {
        backgroundColor: theme.palette.danger.main,
        color: theme.palette.danger.contrastText,
        '&:hover': { backgroundColor: theme.palette.danger.dark }
    }),
    ...(variantcolor === 'warning' && {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        '&:hover': { backgroundColor: theme.palette.warning.dark }
    }),
    ...(variantcolor === 'primary' && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': { backgroundColor: theme.palette.primary.dark }
    }),
    ...(variantcolor === 'success' && {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        '&:hover': { backgroundColor: theme.palette.success.dark }
    }),
    ...(variantcolor === 'disabled' && {
        backgroundColor: theme.palette.background.light,
        color: theme.palette.text.secondary,
        '&:hover': { backgroundColor: theme.palette.background.paper }
    })
}));

export default function Button({ variantcolor = 'primary', ...props }) {
    return <StyledButton variant="contained" variantcolor={variantcolor} {...props} />;
}
