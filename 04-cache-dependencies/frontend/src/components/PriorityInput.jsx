import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

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
            <ToggleButton value="minor" color="success">Minor</ToggleButton>
            <ToggleButton value="important" color="warning">Important</ToggleButton>
            <ToggleButton value="urgent" color="danger">Urgent</ToggleButton>
        </StyledGroup>
    );
}
