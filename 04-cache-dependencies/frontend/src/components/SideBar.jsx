import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useTodos } from '../contexts/TodosContext';
import useDimensions, { SCREEN_SIZES } from '../hooks/useDimensions';
import Button from './Button';
import TextInput from './TextInput';

export default function SideBar() {
    const { secret, setSecret, clearAll } = useTodos();
    const screen = useDimensions();
    const [collapsed, setCollapsed] = useState(true);

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
            <Typography variant="h5" component="h1" typography="title" sx={{ textAlign: 'center' }}>TodosApp</Typography>

            <Button
                startIcon={<KeyboardDoubleArrowLeftRoundedIcon sx={{ width: 32, height: 32, mr: "2px" }} />}
                onClick={() => setCollapsed(!collapsed)}
                rounded
                transparent
                variantcolor="primary"
                sx={{ alignSelf: 'end', minWidth: 0, width: 42, height: 42 }}
            >
            </Button>

            <Typography variant="body2" align="center">
                Hi there! 👋
            </Typography>
            <Typography variant="body2" align="center">
                This page hosts a little demo app that I built to encourage visitors to try out
                a few things, but you can also use it as your own personal to-do list ✔.
            </Typography>
            <Typography variant="body2" align="center" sx={{}}>
                Just so you know: adding or editing publicly visible tasks is only possible if
                you’ve got the admin password 🔑. That means everything you do here will stay
                visible only to you (unless you somehow hacked my password... in that case,
                please don’t cause chaos <span style={{ whiteSpace: 'nowrap' }}>🙃🔥</span>).
            </Typography>

            <TextInput
                label="secret"
                value={secret}
                onChange={e => setSecret(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
            />

            <Button
                startIcon={<DeleteIcon />}
                onClick={clearAll}
                transparent
                variantcolor="danger"
                sx={{ alignSelf: 'center' }}
            >
                Delete all data
            </Button>
        </>
    );

    const collapsedContent = (
        <>
            <Typography variant="h5" component="h1" typography="title" sx={{ alignSelf: 'center' }}>TA</Typography>
            <Button
                startIcon={<MenuRoundedIcon sx={{ width: 32, height: 32 }} />}
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
            <Box sx={{
                backgroundColor: 'background.dark',
                overflowY: 'auto',
                overflowX: 'hidden',
                width: contentWidth,
                transition: 'width 200ms ease',
                height: '100%',
                padding: '16px',
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
