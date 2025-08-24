import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from '@mui/material';
import { useLocale } from '../contexts/LocaleContext';
import Button from './Button';

export default function ConfirmationDialog({
    open,
    title,
    description,
    onClose,
    onConfirm
}) {
    const { t } = useLocale();

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
                    {t.buttons.cancel}
                </Button>
                <Button variantcolor="danger" onClick={() => { onConfirm(); onClose(); }} startIcon={<GavelRoundedIcon />}>
                    {t.buttons.continue}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
