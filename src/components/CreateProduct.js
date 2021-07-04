import { TextField, Button, Typography, 
  Grid, makeStyles, FormControl, Card, FormControlLabel, Radio, RadioGroup, IconButton, Avatar, Toolbar, InputAdornment } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { setToken } from '../service/action/appAction';
import { signupApi } from '../service/api/authApi';
import { createproductApi } from '../service/api/productApi';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import ColorSelector from './ColorSelector';
import { cats, subscats } from '../utils/constants';
import { AttachMoney, CloudUpload, Delete, PhotoOutlined } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  createProductPageContainer: {
    minHeight: '80vh',
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    padding: theme.spacing(2, 2),
    backgroundColor: theme.palette.grey[100],
    margin: theme.spacing(2, 'auto'),
    [theme.breakpoints.up('md')]: {
      width: 600,
    }
  },
  signupContainer: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
    color: '#145DA0',
  },
  pictureContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1),
  },
  pictureImgContainer: {
    position: 'relative',
    minHeight: 64,
  },
  pictureDeleteButton: {
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.error.main,
    }
  },
  pictureImg: {
    width: '100%',
    objectFit: 'cover',
  }
}))

export default function CreateProduct({}) {
  const classes = useStyles();
  const pictureInputRef = useRef(null);

  const { enqueueSnackbar } = useSnackbar();

  const isLoggedIn = useSelector(state => state.app.isLoggedIn);
  const history = useHistory();

  const [name, setName] = useState('');
  const [id, setId] = useState(0);
  const [subtitle, setSubtitle] = useState('');
  const [color1, setColor1] = useState('x');
  const [color2, setColor2] = useState('x');
  const [color3, setColor3] = useState('x');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');
  const [error, setError] = useState(0);

  const [pictureFile, setPictureFile] = useState(null);
  const [pictureFileSrc, setPictureFileSrc] = useState('');

  const userId = useSelector(state => state.app.userId);
  const catMen = useSelector(state => state.app.catMen);
  const catWomen = useSelector(state => state.app.catWomen);
  const catKids = useSelector(state => state.app.catKids);

  useEffect(() => {
    if(!isLoggedIn) history.push('/');
  }, [history, isLoggedIn]);

  const handleName = (e) => {
    setName(e.target.value);
    setError(0);
  }
  const handleSubtitle = (e) => {
    setSubtitle(e.target.value);
    setError(0);
  }
  const handleColor1 = (e) => {
    setColor1(e.target.value);
    setError(0);
  }
  const handleColor2 = (e) => {
    // console.log(e.target.value)
    setColor2(e.target.value);
    setError(0);
  }
  const handleColor3 = (e) => {
    setColor3(e.target.value);
    setError(0);
  }
  const handleSize = (e) => {
      setSize(e.target.value);
      setError(0);
  }
  const handlePrice = (e) => {
      setPrice(e.target.value);
      setError(0);
  }
  const handleCategory1 = (e) => {
    setCategory1(e.target.value);
    setError(0);
  }
  const handleCategory2 = (e) => {
    setCategory2(e.target.value);
    setError(0);
  }
  
  const handlePictureFileChange = (e) => {
    const file = e.target.files[0];
    setPictureFile(file);
    if (FileReader && file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPictureFileSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // TODO: not supported
    }
  };

  const handleDeletePicture = () => {
    setPictureFile(null);
    setPictureFileSrc('');
  }
  
  const handleSubmit = async (e) => {
    if(!name || !color1 || !color2 || !color3 || !size || !price || !category1 || !category2 || !pictureFile) {
      setError(1);
    } else {
      try {
        const userId = localStorage.getItem('userId');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('subtitle', subtitle);
        formData.append('color1', color1);
        formData.append('color2', color2);
        formData.append('color3', color3);
        formData.append('size', size);
        formData.append('price', price);
        formData.append('category1', category1);
        formData.append('category2', category2);
        formData.append('seller', userId);
        formData.append('picture', pictureFile);
        await createproductApi(formData);
        setError(0);
        enqueueSnackbar(`Created product successfully.`, {variant: 'success'});
      } catch(e) {
        enqueueSnackbar(`Created product failed.`, {variant: 'error'});
        setError(3);
      } finally {
        setName('');
        setSubtitle('');
        setColor1('x');
        setColor2('x');
        setColor3('x');
        setSize('');
        setPrice('');
        setCategory1('');
        setCategory2('');
        setPictureFile(null);
        setPictureFileSrc('');
      }
    }
  }

  return (
    <>
      <Toolbar />
      <div className={classes.createProductPageContainer}>
        <Card className={classes.formContainer}>
          <Grid  container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Create product</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label="Name"
                variant="outlined"
                fullWidth
                size="small"
                value={name}
                onChange={handleName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label="Description"
                variant="outlined"
                fullWidth
                size="small"
                value={subtitle}
                onChange={handleSubtitle}
              />
            </Grid>
            <Grid item xs={4}>
              <ColorSelector 
                name="Color 1"
                color={color1}
                handleChange={handleColor1}
              />
            </Grid>
            <Grid item xs={4}>
              <ColorSelector 
                name="Color 2"
                color={color2}
                handleChange={handleColor2}
              />
            </Grid>
            <Grid item xs={4}>
              <ColorSelector 
                name="Color 3"
                color={color3}
                handleChange={handleColor3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label="Size"
                variant="outlined"
                fullWidth
                size="small"
                value={size}
                onChange={handleSize}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label="Price"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  type: 'text',
                  endAdornment: (
                    <InputAdornment position="end">
                      <AttachMoney />
                    </InputAdornment>
                  )
                }}
                value={price}
                onChange={handlePrice}
              />
            </Grid>
            <Grid item xs={12} container justify="center" alignItems="center" className={classes.pictureContainer}>
              <input
                ref={pictureInputRef}
                type="file"
                accept="image/*"
                style={{ visibility: 'hidden', width: 0, height: 0 }}
                onChange={handlePictureFileChange}
              />
              {pictureFileSrc 
                ? (
                  <div className={classes.pictureImgContainer}>
                    <img className={classes.pictureImg} src={pictureFileSrc} alt="product"/>
                    <IconButton className={classes.pictureDeleteButton} onClick={handleDeletePicture} color="inherit">
                      <Delete />
                    </IconButton>
                  </div>
                )
                : (
                  <>
                    <Grid item xs container alignItems="center">
                      <PhotoOutlined />
                      &nbsp;
                      <Typography component="span">Product picture</Typography>
                    </Grid>
                    <Button onClick={() => pictureInputRef.current.click()} color="primary">
                      <CloudUpload />
                      &nbsp;
                       Upload
                    </Button>
                  </>
                )
              }
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.margin} variant="outlined" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={category1}
                  onChange={handleCategory1}
                >
                  {
                    cats.map(cat => (
                      <MenuItem value={cat.pk}>{cat.fields.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.margin} variant="outlined" fullWidth>
                <InputLabel>Sub category</InputLabel>
                  <Select
                  label="Sub category"
                  value={category2}
                  onChange={handleCategory2}
                >
                  {
                    subscats.map(subcat => (
                      <MenuItem value={subcat.pk}>{subcat.fields.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid> 
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                onClick={handleSubmit}
              >
                Confirm
              </Button>
            </Grid>
            {error === 1 && (
              <Grid item xs={12}>
                <Typography
                  color="error"
                  variant="subtitle2"
                >
                  Please fill out all necessary fields.
                </Typography>
              </Grid>
            )}
            {error === 3 && (
              <Grid item xs={12}>
                <Typography
                  color="error"
                  variant="subtitle2"
                >
                  Server error!
                </Typography>
              </Grid>
            )}
          </Grid>
        </Card>
      </div>
    </>
  );
}