import React from 'react';
import { connect } from 'react-redux'
import "./Loading.css"

let Laoading = ({ loading }) => (

  loading ?
    <div className="bg-gradient-primary">
		<div id="loader"></div>
    </div> :
    null
);

const mapStateToProps = (state) => ({
  loading: state.loading
})

Laoading = connect(
  mapStateToProps,
  null
)(Laoading)


export default Laoading;
