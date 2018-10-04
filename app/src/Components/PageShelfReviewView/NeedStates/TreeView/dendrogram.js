import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import rd3 from 'react-d3-library';


/* 
import flare from '../../libs/protovis/flare';
import showDendrogram from '../../libs/protovis/script';
*/
import Data from '../../../../Settings/dendrogram.json';
import ShowDendrogram from './script';

/* console.log(customData);
const newflare = JSON.stringify(customData);
console.log(newflare); */

const styles = {
  dendrogram: {
    width: 'auto',
    height: 'auto',
  },
  pluwrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  pluGroupWrapper: {
    width: '300px',
  },
  plulist: {
    width: '300px',
    /*         backgroundColor: 'yellow', */
    '& > ul': {
      listStyle: 'none',
      margin: '10px 0',
      '& > li': {
        textAlign: 'left',
        display: 'block',
        /*  height: '23px', */
        fontSize: '0.8125rem',
        padding: '5px',
        lineHeight: '14px',
      },
      '& > li:nth-child(even)': {
        backgroundColor: '#eee',
      },
    },
  },
};


class Dendrogram extends React.Component {
  componentDidMount() {
    ShowDendrogram('dendrogram', 'plulist', window.d3, Data);
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <script src="/assets/js/d3.v3.min.js" type="text/javascript" />
        </Helmet>
        <div className={classes.pluwrapper}>
          <div className={classes.pluGroupWrapper} id="pluGroupWrapper" />
          <div className={classes.plulist} id="plulist" />
          <div className={classes.dendrogram} id="dendrogram" />
        </div>
      </React.Fragment>
    );
  }
}
Dendrogram.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Dendrogram);
