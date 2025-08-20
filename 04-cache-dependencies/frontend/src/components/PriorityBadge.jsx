import Chip from '@mui/material/Chip';

const colorMap = {
    minor: 'success',
    important: 'warning',
    urgent: 'danger'
};

export default function PriorityBadge({ priority = 'minor' }) {
    return (
        <Chip
            label={priority.charAt(0).toUpperCase() + priority.slice(1)}
            color={colorMap[priority]}
            size="small"
            sx={{ textTransform: 'capitalize', fontWeight: 500 }}
        />
    );
}
