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
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//Dropzone
import FileUpload from "react-material-file-upload";
//CSS
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


const SignMail = ({ toggleLoader, toggleSnack }) => {
    const [value, setValue] = React.useState(0);
    const [files, setFiles] = useState([]);
    const [imageData, setImageData] = React.useState(null)
    const [canvasImage, setCanvasImage] = useState(null)
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
            const response = await axios.post('/wfp/postVerification', { id });

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
    const saveCurrentCanvas = async () => {
        try {
            setOpen(true);
            setCanvasImage(signCanvas.current.getTrimmedCanvas().toDataURL("image/png"))
            let img = signCanvas.current.getTrimmedCanvas().toDataURL("image/png");
            console.log(imageData)
            const response = await axios.post('/wfp/setImageAndVerify', { id, img });
            signClear();
            const SNACK = {
                snackOpen: true,
                snackMessage: response.data,
                severity: true,
            };
            toggleSnack(SNACK);
            setOpen(false);
        } catch (error) {
            console.error(error)
        }

    }
    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const handleSubmit = () => {
        getBase64(files[0], (result) => {
            setImageData(result);
        })
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
                        <Tab label="Upload Signature" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                {data?.biometric === null &&
                    <TabPanel value={value} index={0}>
                        <Typography variant="h6" sx={{ mb: 5 }} gutterBottom component="div">
                            USER - {data?.name}
                        </Typography>
                        <Typography variant="p" gutterBottom component="div">
                            Use This Signature
                        </Typography>
                        {data?.fingerprint === null &&
                            <>
                                <Box display={'flex'} flexDirection="column">
                                    <img src={data?.signature} width='25%' />
                                </Box>
                                <Button sx={{ mt: 1, ml: 5 }} onClick={saveCanvas} variant='contained' color='success'>Submit</Button>
                            </>
                        }
                    </TabPanel>}
                <br />
                {data?.biometric != null &&
                    <TabPanel value={value} index={0}>
                        <Typography variant="h6" sx={{ mb: 5 }} gutterBottom component="div">
                            USER - {data?.name}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 5 }} gutterBottom component="div">
                            Items -
                            <ul>
                                {data?.items.map((x, i) => (

                                    !x.verified && <li key={i}>{x.title} - {x.invNumber}</li>
                                ))}
                            </ul>
                        </Typography>
                        <Typography variant="p" gutterBottom component="div">
                            Draw Below
                        </Typography>
                        <Box display={'flex'} flexDirection="column">
                            <SignaturePad ref={signCanvas} canvasProps={{ className: 'canvas' }} />
                        </Box>
                        <br />
                        <Button sx={{ mt: 1 }} onClick={signClear} variant='contained' color='warning'>Try Again</Button>

                        <Button sx={{ mt: 1, ml: 5 }} onClick={saveCurrentCanvas} variant='contained' color='success'>Submit</Button>
                    </TabPanel>
                }
                <TabPanel value={value} index={1}>
                    <Box component={"div"} width='25%'>
                        <FileUpload value={files} onChange={setFiles} />
                        <Button disabled={files.length > 0 ? false : true} variant='contained' sx={{ mt: 5 }} color='primary' onClick={handleSubmit}>Submit</Button>
                    </Box>
                </TabPanel>
            </Box>

        </>
    )
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, { toggleLoader, toggleSnack })(SignMail);