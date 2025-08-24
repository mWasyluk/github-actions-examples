import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useLocale } from "../contexts/LocaleContext";
import EnImage from '../images/en.png';
import PlImage from '../images/pl.png';

export default function LanguageSelector() {
    const { locale, setLocale } = useLocale();

    return (
        <Select
            sx={(theme) => ({
                alignSelf: 'center',
                backgroundColor: "background.default",
                height: 42,
                '.MuiSvgIcon-root ': {
                    fill: theme.palette.text.primary,
                }
            })}
            value={locale}
            onChange={(e) => {
                setLocale(e.target.value);
            }}
            renderValue={(val) => {
                var img;
                if (val === 'pl') {
                    img = PlImage;
                } else {
                    img = EnImage;
                }

                return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={img} width={48} style={{ borderRadius: 4, alignSelf: 'center', justifySelf: 'center' }} />
                </Box>
            }}
        >
            <MenuItem value='en'>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <img src={EnImage} width={48} style={{ borderRadius: 4 }} />
                    <Typography variant="body1" align="center">
                        English
                    </Typography>
                </Box>
            </MenuItem>
            <MenuItem value='pl'>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <img src={PlImage} width={48} style={{ borderRadius: 4 }} />
                    <Typography variant="body1" align="center">
                        Polski
                    </Typography>
                </Box>
            </MenuItem>
        </Select>
    )
}
