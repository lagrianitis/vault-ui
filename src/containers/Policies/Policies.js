import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { load as loadPolicies, loadIndividualPolicy } from 'redux/modules/policies';
import { CollapsibleSection } from '../../components';
import {
  Card,
  CardTitle,
  CardText,
  Button
} from 'react-mdl';

class Policies extends Component {
  static propTypes = {
    policies: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    loadingIndividual: PropTypes.bool
  }

  componentDidMount() {
    this.props.dispatch(loadPolicies());
  }

  handleRefreshPolicies = (event) => {
    event.preventDefault();
    this.props.dispatch(loadPolicies());
  }

  loadPolicy = (policyName) => {
    console.log('beboop loadPolicy: ', policyName);
    this.props.dispatch(loadIndividualPolicy(policyName));
  }

  render() {
    const { policies, loadingIndividual } = this.props;
    console.log(loadingIndividual);
    const styles = require('./Policies.scss');
    console.log('Policy render called: ', this.props.policies);
    return (
      <div>
        <Card shadow={0} className={styles.card}>
          <CardTitle className={styles.cardTitle}>
            <div style={{float: 'right'}}>
              <h2 className="mdl-color-text--white">Policies</h2>
              <Button onClick={this.handleRefreshPolicies} className="mdl-cell--bottom" raised colored ripple>Refresh Policies</Button>
            </div>
          </CardTitle>
          <CardText className={styles.cardText}>
            <ul className={styles.policyList}>
            { policies.map((policy) => {
              return (
                <li key={policy.index} shadow={0}>
                  <CollapsibleSection title={policy.name} asyncLoadFn={() => this.loadPolicy(policy.name)} children={policy.policy}/>
                </li>
              );
            }) }
            </ul>
          </CardText>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    policies: state.policies.policies
  };
}

export default connect(mapStateToProps)(Policies);
