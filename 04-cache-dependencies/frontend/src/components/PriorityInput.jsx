import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocale } from '../contexts/LocaleContext';

const StyledGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButton-root': {
        textTransform: 'capitalize',
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(1),
        '&:not(.Mui-selected)': {
            backgroundColor: theme.palette.background.light,
            color: theme.palette.text.secondary,
        },
        '&.Mui-selected': {
            fontWeight: 600,
        }
    }
}));

export default function PriorityInput({ value, onChange }) {
    const { t } = useLocale();

    const handleChange = (_, newVal) => {
        if (newVal) onChange(newVal);
    };

    return (
        <StyledGroup
            value={value}
            exclusive
            onChange={handleChange}
            size="small"
        >
            <ToggleButton value="minor" color="success">{t.todo.priorities.minor}</ToggleButton>
            <ToggleButton value="important" color="warning">{t.todo.priorities.important}</ToggleButton>
            <ToggleButton value="urgent" color="danger">{t.todo.priorities.urgent}</ToggleButton>
        </StyledGroup>
    );
}
