import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({
    input: {
        maxWidth: '100%',
        marginBottom:30,
        width: '100%',
        "&:hover": {
          border:"1px solid red",
        }
    },
    card:{
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
    padding: "1rem",
    position: "fixed",
   left:"20%",
    top: "30%",
   maxWidth:280
},

}));
