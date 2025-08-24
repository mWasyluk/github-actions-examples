import Chip from '@mui/material/Chip';
import { useLocale } from '../contexts/LocaleContext';

const colorMap = {
    minor: 'success',
    important: 'warning',
    urgent: 'danger'
};

export default function PriorityBadge({ priority = 'minor' }) {
    const { t } = useLocale();
    return (
        <Chip
            label={t.todo.priorities[priority]}
            color={colorMap[priority]}
            size="small"
            sx={{ textTransform: 'capitalize', fontWeight: 500 }}
        />
    );
}
