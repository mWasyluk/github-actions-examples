import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from '@mui/material';
import Button from './Button';

export default function ConfirmationDialog({
    open,
    title,
    description,
    onClose,
    onConfirm
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.primary">
                    {description}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variantcolor="default" onClick={onClose}>
                    Cancel
                </Button>
                <Button variantcolor="danger" onClick={() => { onConfirm(); onClose(); }} startIcon={<GavelRoundedIcon />}>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
}
