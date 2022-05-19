import React, { useEffect, useRef, useState } from 'react'
import axios from '../../api/axios';
import SignaturePad from 'react-signature-canvas';
import Modal from '../Modal';
import Snack from '../Snack';
//banner
import banner from '../../banner.png';
//material
import Button from "@mui/material/Button";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//CSS
import styles from '../../svg.css';

import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toggleLoader, toggleSnack } from '../../actions';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Signature = ({ toggleLoader, toggleSnack }) => {
    const [value, setValue] = React.useState(0);
    const [imageData, setImageData] = React.useState()
    const [valid, setValid] = useState();
    const [data, setData] = useState();
    const signCanvas = useRef({});
    const [open, setOpen] = useState(true);
    const { id } = useParams();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        async function getData() {
            const response = await axios.post(`/wfp/getMailUser`, { id });
            setData(response.data);
            if (response.data.signature != null) {
                setValid(false);
            } else {
                setValid(true)
            }
        }
        if (data) {
            handleClose();
        } else {
            getData();
        }
    }, [data, valid])

    const signClear = () => {
        signCanvas.current.clear();
    }

    const saveCanvas = async () => {
        try {
            setOpen(true);
            setImageData(signCanvas.current.getTrimmedCanvas().toDataURL("image/png"))
            let img = signCanvas.current.getTrimmedCanvas().toDataURL("image/png");
            console.log(imageData)
            const response = await axios.post('/wfp/setImage', { id, img });
            signClear();
            const SNACK = {
                snackOpen: true,
                snackMessage: response.data,
                severity: true,
            };
            toggleSnack(SNACK);
            setOpen(false);
            window.location.reload()
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
            {valid && <Box sx={{ width: '100%' }}>
                <Modal handleClose={handleClose} loader={open} />
                <Snack />
                <Box>
                    <img className='banner' src={banner} alt='banner' />
                </Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="E-Signature" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Typography variant="h6" sx={{ mb: 5 }} gutterBottom component="div">
                        USER - {data?.name}
                    </Typography>
                    <Typography variant="p" gutterBottom component="div">
                        Draw Below
                    </Typography>
                    <Box display={'flex'} flexDirection="column">
                        <SignaturePad ref={signCanvas} canvasProps={{ className: 'canvas' }} />
                    </Box>
                    <br />
                    <Button sx={{ mt: 1 }} onClick={signClear} variant='contained' color='warning'>Try Again</Button>

                    <Button sx={{ mt: 1, ml: 5 }} onClick={saveCanvas} variant='contained' color='success'>Submit</Button>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>
            }
            {
                !valid && <div className={styles.body} style={{ background: 'rgba(96, 196, 196, .3)' }}>
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 464 390.4" style={{ width: '30%', margin: '0 5% 3vh !important', enableBackground: 'new 0 0 464 390.4' }} xmlSpace="preserve">

                        <circle className={styles.st0} cx="126" cy="175.4" r="12" />
                        <circle className={styles.st0} cx="339" cy="175.4" r="12" />
                        <circle className={styles.st1} cx="232.5" cy="170.9" r="106.5" />
                        <path className={styles.st2} d="M126,164.4c0,0,4.5-15.4,10.5-19.6c0,0,31,0,65-26.5c0,0,110,85.9,176-30.8c0,0-33,28.6-116-41.4
    c0,0-131-16.2-135.5,106V164.4z"/>
                        <path className={styles.st2} d="M339,164.4c0,0,6.2-13.3-8.2-32.4l-6.3,3.9C324.5,135.9,333.5,142.9,339,164.4z" />
                        <path className={styles.st2} d="M247.8,45.3c0,0,47.7-5.3,76.7,53.7L247.8,45.3z" />
                        <circle className={styles.st2} cx="192" cy="175.4" r="9" />
                        <circle className={styles.st2} cx="271" cy="175.4" r="9" />
                        <path className={styles.st4} d="M101.4,390.1c22.1-106.8,75.7-114.1,137.1-114.1c61.4,0,104,18.8,130.1,114.1
    C368.7,390.6,101.3,390.6,101.4,390.1z"/>

                        <circle id="path" className={styles.st3} cx="234.5" cy="230.5" r="20" />
                    </svg>

                    <div className={styles.message}>
                        <h1>Oops, this link is expired</h1>
                        <h3>{data?.name} - Your Account Has been Already Created</h3>
                        <p>This URL is not valid anymore.</p>

                    </div>
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, { toggleLoader, toggleSnack })(Signature);