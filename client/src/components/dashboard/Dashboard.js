import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';

const Dashboard = ({getCurrentProfile, auth, profile}) => {
    
    useEffect(() => {
        getCurrentProfile();
    },[]);    //will only work once

    return (
        <div>Dashboard</div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({      //anything in the state in the reducer will be able to get into this component
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
