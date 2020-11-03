import React, {useState}from 'react';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    opacity: 0.7,
    padding: 10,
    borderRadius: 15
  
  },
  header: {
    textDecorationStyle:"none",
    color: "red",
    height: 125,
    
  },
  media: {
    height:0,
    paddingTop: '56.25%', // 16:9
  },
  date: {
    color:"grey",
    fontSize: '0.8em'
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
}));

export default function NewsCard(props) {
  const [expanded, setExpanded] = useState(false);
  const {title, content, description, url, image, date,author } = props;

  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const theme = createMuiTheme({
    typography: {
      "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    
    
    }
  });

  //converting json date to readable format
  const convertDate = () => {
var newdate = new Date(date);

var correctdate = new Date(newdate);
var day = correctdate.getDate();
var month = correctdate.getMonth() + 1;
var year = correctdate.getFullYear();

var string = "Datum: " + day + "-" + month + "-" + year;

return string;
  }

  return (
    <MuiThemeProvider theme={theme}>
    <Card className={classes.root}>     
      <CardHeader
      className={classes.header}
        title={<a style={{textDecoration:'none' , color: 'black' }}href={url}>{title}</a>}/>
      <CardMedia
        className={classes.media}
        image={image}
        title="titel" />
      <CardActions disableSpacing>
      <Typography paragraph
       className={classes.date}>
            {convertDate()}
          </Typography>
        
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </MuiThemeProvider>
  );
        }