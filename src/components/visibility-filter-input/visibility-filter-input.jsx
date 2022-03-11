import React from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import { setFilter } from "../../actions/actions";

function VisibilityFilterInput(props) {
  return <Form.Control
    className='m-auto'
    style={{ backgroundColor: '#1E2127', color: 'white', maxWidth: '400px' }}
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder='search movies' />;
}

export default connect(null, { setFilter })(VisibilityFilterInput)