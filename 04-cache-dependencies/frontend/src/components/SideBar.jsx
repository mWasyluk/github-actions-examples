import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import { useTodos } from '../contexts/TodosContext';
import useDimensions, { SCREEN_SIZES } from '../hooks/useDimensions';
import IconImage from '../images/icon.png';
import Button from './Button';
import LanguageSelector from './LanguageSelector';
import TextInput from './TextInput';

export default function SideBar() {
    const { secret, setSecret, clearAll } = useTodos();
    const screen = useDimensions();
    const { t } = useLocale();

    const [collapsed, setCollapsed] = useState(false);

    var width, contentWidth;
    width = 60;
    contentWidth = width;
    if (!collapsed) {
        switch (screen.size) {
            case SCREEN_SIZES.SMALL:
                width = 60;
                contentWidth = 0.8 * screen.width;
                break;
            case SCREEN_SIZES.MEDIUM:
                width = 0.4 * screen.width;
                contentWidth = width;
                break;
            default:
                width = 0.3 * screen.width;
                contentWidth = width;
        }
    }

    const fullContent = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    height: 56
                }}
            >
                <img src={IconImage} width='32' />
                <Typography variant="h5" component="h1" typography="title" color='primary' sx={{ textAlign: 'center', lineHeight: '120%' }}>TodosApp</Typography>
                <Button
                    startIcon={<KeyboardDoubleArrowLeftRoundedIcon sx={{ width: 32, height: 32, mr: "2px" }} />}
                    onClick={() => setCollapsed(!collapsed)}
                    rounded
                    transparent
                    variantcolor="primary"
                    sx={{ position: 'absolute', minWidth: 0, width: 42, height: 42, right: -25, backgroundColor: 'background.dark' }}
                >
                </Button>
            </Box>

            <LanguageSelector />

            <Typography variant="body2" align="center">
                {t.info.greeting}
            </Typography>
            <Typography variant="body2" align="center">
                {t.info.section1}
            </Typography>
            <Typography variant="body2" align="center" sx={{}}>
                {t.info.section2}
            </Typography>

            <TextInput
                label={t.form.secret}
                value={secret}
                type="password"
                onChange={e => setSecret(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
            />

            <div style={{ height: '100%' }}></div>

            <Button
                startIcon={<DeleteIcon />}
                onClick={clearAll}
                transparent
                variantcolor="danger"
                sx={{ alignSelf: 'center' }}
            >
                {t.buttons.deleteAllData}
            </Button>
        </>
    );

    const collapsedContent = (
        <>
            <div style={{ height: 56, justifyContent: 'center', paddingTop: '12px', display: 'flex', height: '100%' }}>
                <img src={IconImage} width='32' height='32' onClick={() => setCollapsed(!collapsed)} style={{ cursor: 'pointer' }} />
            </div>

            <Button
                startIcon={<SettingsSuggestRoundedIcon sx={{ width: 32, height: 32, mb: 0.5 }} />}
                onClick={() => setCollapsed(!collapsed)}
                rounded
                transparent
                variantcolor="primary"
                sx={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', minWidth: 0, width: 42, height: 42 }}
            >
            </Button>
        </>
    );

    return (
        <Box
            component="aside"
            sx={{
                position: 'relative',
                zIndex: 999,
                width: width,
                transition: 'width 200ms ease',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'background.dark',
                    width: contentWidth,
                    transition: 'width 200ms ease',
                    height: '100%',
                    padding: '16px',
                    paddingBottom: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                {collapsed ? (
                    collapsedContent
                ) : (
                    <>
                        {fullContent}
                        {(screen.size === SCREEN_SIZES.SMALL) && (
                            <Box
                                onClick={() => setCollapsed(true)}
                                sx={{
                                    width: screen.width,
                                    height: screen.height,
                                    bgcolor: 'black',
                                    opacity: 0.5,
                                    position: 'absolute',
                                    p: 0,
                                    m: 0,
                                    top: 0,
                                    left: 0,
                                    zIndex: -1,
                                }}
                            />
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}
