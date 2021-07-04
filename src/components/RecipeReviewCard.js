import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import image1 from '../images/1.JPG';
import image2 from '../images/2.JPG';
import image3 from '../images/3.JPG';
import { Delete } from '@material-ui/icons';
import { Button, Divider, Grid, TextField } from '@material-ui/core';
import { cats, subscats } from '../utils/constants';
import { addOrderApi } from '../service/api/shoppingApi';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../service/api';
import { addItemToCart } from '../service/action/cartAction';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import { getCommentApi, setCommentApi } from '../service/api/productApi';
import { setProductId } from '../service/action/appAction';
import Modal from '@material-ui/core/Modal';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: '0 auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  circle: {
      marginRight: theme.spacing(1),
      display: 'inline-block',
      width: 24,
      height: 24,
      borderRadius: '50%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function RecipeReviewCard({ product = {}, showDelete}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [comments , setComments] = useState([]);
  const [expanded, setExpanded] = useState(false);
  // const [modalStyle] = useState(getModalStyle);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(0);
  const userId = useSelector(state => state.app.userId);
  const dispatch = useDispatch();
  const {id, name, subtitle, cat1, cat2, color1, color2, color3, size, price, picture} = product;
  
  const cat1Name = cats.find(cat => cat.pk === cat1)?.fields?.name;
  const cat2Name = subscats.find(cat => cat.pk === cat2)?.fields?.name;
  const history = useHistory();
  const handleClick = async () => {
   try{
    const response = await setCommentApi(parseInt(userId), parseInt(id), comment);
    setComment('');
   }catch(e){
     setError(1);
   }
  }
  const handleAddToCart = async () => {
    try {
      const order = await addOrderApi(userId, id);
      dispatch(addItemToCart({...product, orderId: order.id}));
      enqueueSnackbar(`${product.name} was added to your cart.`);
    } catch(e) {

    }
  };

  const handleShowComments = async (e)=>{
    const comments = await getCommentApi(id);
    setComments(comments);
    setExpanded(!expanded);
    }
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  }

  const pictureUrl = picture ? baseUrl + picture : '';

  return (
    <Card className={classes.root}>
      <CardHeader
      // avatar={
      //   <Avatar aria-label="recipe" className={classes.avatar}>
      //     R
      //   </Avatar>
      // }
      action={showDelete &&
        <IconButton aria-label="settings">
          <Delete />
        </IconButton>
      }
        title={name}
        subheader={`${cat1Name} - ${cat2Name}`}
      />
      {pictureUrl && <CardMedia
        className={classes.media}
        image={pictureUrl}
        title="Paella dish"
      />}
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {subtitle}
        </Typography>
        <Divider className={classes.divider}/>
        <Typography variant="body2" color="textSecondary" component="p">
          {price} $
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" component="p">
          size: {size}
        </Typography>
        {color1 && color1 !== 'x' && <div className={classes.circle}  style={{backgroundColor: color1}}/>}
        {color2 && color2 !== 'x' && <div className={classes.circle}  style={{backgroundColor: color2}}/>}
        {color3 && color3 !== 'x' && <div className={classes.circle}  style={{backgroundColor: color3}}/>}
        <TextField
          id="outlined-full-width"
          label="Comment"
          value={comment}
          onChange = {handleChangeComment}
          style={{ margin: 8 }}
          placeholder="Comment"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </CardContent>
      <CardActions>
        <Button onClick={handleAddToCart}>Add to cart</Button>
        <Button onClick={handleClick}>Leave Comment</Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleShowComments}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments.map(comment =>(
            <Typography>
              {comment.text}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
      {error === 1 && (
      <Grid item xs={12}>
        <Typography
          color="error"
          variant="subtitle2"
        >
          Comment is empty!
        </Typography>
      </Grid>
    )}
    </Card>
    
  );
}
