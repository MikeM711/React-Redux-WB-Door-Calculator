import React, { Component } from 'react';
import { connect } from 'react-redux';

import './WidgetPage.css';
import Form from '../Form/Form';
import SelectedWidgets from '../SelectedWidgets/SelectedWidgets';
import ResultTotal from '../ResultTotal/ResultTotal';
import Navbar from '../../Navbar/Navbar';

class WidgetPage extends Component {
  render() {
    return (
      <div className="widget-calculator-page">
        <Navbar />
        <div className="widget-calculator-container container">
          <h2 className="center blue-text">Widget Material Calculator</h2>
          <Form {...this.props} />

          {!this.props.userHistory.length === false ? ([
            <SelectedWidgets key="selected-widgets" />,
            <ResultTotal key="result-total" />
          ]) : null}

        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    userHistory: state.widgetRed.userHistory
  };
};

export default connect(mapStateToProps)(WidgetPage);
