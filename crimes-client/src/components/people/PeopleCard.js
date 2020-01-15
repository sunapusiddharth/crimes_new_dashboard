import React, { Fragment } from 'react';
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
//for list item inside the card 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import faker from 'faker'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
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
    inline: {
        display: 'inline',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    list:{
        paddingLeft:0,
        paddingRight:0,
    },
    root:{
        paddingTop:0,
        paddingBottom:0
    }
}));

export default function PeopleCard(props) {
    const classes = useStyles();
    const [expandedDept, setExpandedDept] = React.useState(false);
    const [expandedPrisons, setExpandedPrisons] = React.useState(false);
    const [expandedEmployment, setExpandedEmployment] = React.useState(false);
    const [expandedEducation, setExpandedEducation] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);


    const handleExpandClick = (type) => {
        if (type == 'departments') {
            setExpandedDept(!expandedDept);
        }
        if (type == 'prisons') {
            setExpandedPrisons(!expandedPrisons);
        }
        if (type == 'employment') {
            setExpandedEmployment(!expandedEmployment);
        }
        if (type == 'education') {
            setExpandedEducation(!expandedEducation);
        }
    };

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.data.is_accussed ? 'A' : props.data.is_law ? 'L' : props.data.is_suspect ? 'S' : 'W'}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.data.name[0]}
                subheader={`${props.data.address[0]} ,${props.data.phone[0]} ${props.data.email[0]}`}
            />
            <CardMedia
                className={classes.media}
                image={props.data.avatar}
                title={props.data.name[0]}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{faker.lorem.sentences(5)}</Typography>
            </CardContent>
            {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>

            </CardActions> */}
            {props.data.departments.length ?<ExpansionPanel expanded={expanded === 'departments'} onChange={handleChange('departments')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Deparments</Typography>
                    <Typography className={classes.secondaryHeading}>All departments listed here.</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List className={classes.root}>
                        {props.data.departments.map(dept => <Fragment><ListItem alignItems="flex-start" className={classes.list}>
                            {/* <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar> */}
                            <ListItemText
                                primary={dept.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {dept.position}
                                        </Typography>
                                        {`${dept.address} from ${dept.from} to ${dept.to} for a duration of ${dept.duration}`}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                        )}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>:''}

            {/* Card Prisons  */}
            {props.data.prisons.length ?<ExpansionPanel expanded={expanded === 'prisons'} onChange={handleChange('prisons')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Prisons</Typography>
                    <Typography className={classes.secondaryHeading}>All prisons listed here.</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <List className={classes.root}>
                        {props.data.prisons.map(prison => <Fragment><ListItem alignItems="flex-start">
                            {/* <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar> */}
                            <ListItemText
                                primary={prison.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {prison.position}
                                        </Typography>
                                        {`${prison.cell_holding} from ${prison.from} to ${prison.to} for a duration of ${prison.duration} under ${prison.supervisor && prison.supervisor[0].name}`}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                        )}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>:''}

           
            {/* Card Employment  */}
             {props.data.employment.length ? <ExpansionPanel expanded={expanded === 'employment'} onChange={handleChange('employment')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Employment</Typography>
                    <Typography className={classes.secondaryHeading}>All employment details are listed below here.</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <List className={classes.root}>
                        {props.data.employment.map(emp => <Fragment><ListItem alignItems="flex-start">
                            {/* <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar> */}
                            <ListItemText
                                primary={`${emp.employment_type},${emp.title}`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {emp.company_name}
                                        </Typography>
                                        {`${emp.address} from ${emp.from} to ${emp.to} for a duration of ${emp.duration} years`}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                        )}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>:''}
            
            {/* Card Education  */}
             {props.data.education.length? <ExpansionPanel expanded={expanded === 'education'} onChange={handleChange('education')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Education</Typography>
                    <Typography className={classes.secondaryHeading}>All education details are  listed below.</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <List className={classes.root}>
                        {props.data.education.map(edu => <Fragment><ListItem alignItems="flex-start">
                            {/* <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar> */}
                            <ListItemText
                                primary={`School ${edu.school_name}`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            qualification : {edu.qualification_name}
                                        </Typography>
                                        {`${edu.address} from ${edu.from} to ${edu.to} for a duration of ${edu.duration} years`}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                        )}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>:''}
        </Card>
    );
}