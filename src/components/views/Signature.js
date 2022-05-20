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
            <Box sx={{ width: '100%' }}>
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
        </>
    )
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, { toggleLoader, toggleSnack })(Signature);