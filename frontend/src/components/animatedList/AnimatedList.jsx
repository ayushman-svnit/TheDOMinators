import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import './AnimatedList.css';
import { Box, Collapse, List, ListItem, ListItemText, Typography, Divider, ListItemIcon } from '@mui/material';


const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.5, triggerOnce: false });
    return (
        <motion.div
            ref={ref}
            data-index={index}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2, delay }}
            style={{ marginBottom: '1rem', cursor: 'pointer' }}
        >
            {children}
        </motion.div>
    );
};

const AnimatedList = ({
    items = [],
    onItemSelect,
    showGradients = true,
    enableArrowNavigation = true,
    className = '',
    itemClassName = '',
    displayScrollbar = true,
    initialSelectedIndex = -1,
}) => {
    const listRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
    const [keyboardNav, setKeyboardNav] = useState(false);
    const [topGradientOpacity, setTopGradientOpacity] = useState(0);
    const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        setTopGradientOpacity(Math.min(scrollTop / 50, 1));
        const bottomDistance = scrollHeight - (scrollTop + clientHeight);
        setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
    };

    useEffect(() => {
        if (!enableArrowNavigation) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
                e.preventDefault();
                setKeyboardNav(true);
                setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
            } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
                e.preventDefault();
                setKeyboardNav(true);
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter') {
                if (selectedIndex >= 0 && selectedIndex < items.length && onItemSelect) {
                    e.preventDefault();
                    onItemSelect(items[selectedIndex], selectedIndex);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

    useEffect(() => {
        if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
        const container = listRef.current;
        const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`);
        if (selectedItem) {
            const extraMargin = 50;
            const containerScrollTop = container.scrollTop;
            const containerHeight = container.clientHeight;
            const itemTop = selectedItem.offsetTop;
            const itemBottom = itemTop + selectedItem.offsetHeight;
            if (itemTop < containerScrollTop + extraMargin) {
                container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
            } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
                container.scrollTo({ top: itemBottom - containerHeight + extraMargin, behavior: 'smooth' });
            }
        }
        setKeyboardNav(false);
    }, [selectedIndex, keyboardNav]);

    return (
        <div className={`scroll-list-container ${className}`}>
            <div
                ref={listRef}
                className={`scroll-list ${!displayScrollbar ? 'no-scrollbar' : ''}`}
                onScroll={handleScroll}
            >
                {items.length === 0 ? (
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'center',
                            padding: 2,
                            color: 'text.secondary',
                        }}
                    >
                        No buses found
                    </Typography>
                ) : (
                    items.map((item, index) => (
                        <AnimatedItem
                            key={index}
                            delay={0.1}
                            index={index}
                            onMouseEnter={() => setSelectedIndex(index)}
                            onClick={() => {
                                setSelectedIndex(index);
                                if (onItemSelect) {
                                    onItemSelect(item, index);
                                }
                            }}
                        >
                            <Box
                                className={`item ${selectedIndex === index ? 'selected' : ''} ${itemClassName}`}
                                sx={{
                                    padding: 2,
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    backgroundColor: selectedIndex === index ? 'action.selected' : 'background.paper',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                    },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#006bd6',
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        mb: 0.5,
                                    }}
                                >
                                    # {item.bus_number}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        className="bus-symbol"
                                        src="/bus.svg"
                                        alt="Bus"
                                        style={{ width: 16, height: 16, marginRight: 6 }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            fontSize: '0.9rem',
                                        }}
                                    >
                                        {item.coordinates[0]?.name} ↔ {item.coordinates.at(-1)?.name}
                                    </Typography>
                                </Box>
                                <Collapse in={selectedIndex === index} timeout="auto" unmountOnExit>
                                    <List
                                        dense
                                        sx={{
                                            mt: 1,
                                            py: 0,
                                            position: 'relative',
                                            borderRadius:'10px',
                                            '&::before': { // Full height connecting line
                                                content: '""',
                                                position: 'absolute',
                                                left: '23px',
                                                top: '12px',
                                                bottom: '12px',
                                                width: '3px',
                                                backgroundColor: 'primary.main',
                                                zIndex: 1
                                            }
                                        }}
                                    >
                                        {item.coordinates.map((stop, stopIndex) => (
                                            <ListItem
                                                key={stopIndex}
                                                sx={{
                                                    py: 0.5,
                                                    pl: '34px', // Proper alignment with circle
                                                    pr: 2,
                                                    position: 'relative',
                                                    minHeight: '32px',
                                                    '&:last-child': {
                                                        minHeight: 'auto'
                                                    },
                                                    backgroundColor:'background.default'
                                                }}
                                            >
                                                {/* Hollow Circle */}
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        left: '18px',
                                                        width: '12px',
                                                        height: '12px',
                                                        borderRadius: '50%',
                                                        border: '2px solid',
                                                        borderColor: 'primary.main',
                                                        backgroundColor: 'background.default',
                                                        zIndex: 2
                                                    }}
                                                />

                                                {/* Stop Name */}
                                                <ListItemText sx={{ my: 0 }}>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            fontSize: '0.875rem',
                                                            lineHeight: '1.5'
                                                        }}
                                                    >
                                                        {stop.name}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </Box>
                        </AnimatedItem>
                    ))
                )}
            </div>
            {showGradients && (
                <>
                    <div className="top-gradient" style={{ opacity: topGradientOpacity }}></div>
                    <div className="bottom-gradient" style={{ opacity: bottomGradientOpacity }}></div>
                </>
            )}
        </div>
    );
};

export default AnimatedList;
