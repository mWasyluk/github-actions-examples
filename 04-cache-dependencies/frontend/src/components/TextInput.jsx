import TextField from '@mui/material/TextField';

export default function TextInput({
    label,
    value,
    onChange,
    placeholder,
    backgroundColor,
    error = false,
    helperText = '',
    ...props
}) {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            variant="outlined"
            fullWidth
            size="small"
            sx={{
                '& .MuiOutlinedInput-root': {
                    backgroundColor: backgroundColor || 'background.default',
                    borderRadius: 1,
                }
            }}
            {...props}
        />
    );
}
