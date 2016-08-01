/**
 * Created by justin on 7/5/16.
 */

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Leaderboard from './components/Leaderboard';
import { fetchModelsFromProject, fetchProject } from '../Projects/actions/projects.actions';

interface Props {
  leaderboard: any,
  params: {
    projectid: string
  },
  project: any
}

interface DispatchProps {
  fetchModelsFromProject: Function,
  fetchProject: Function
}

export class Projects extends React.Component<Props & DispatchProps, any> {
  componentWillMount(): void {
    if (_.isEmpty(this.props.leaderboard)) {
      this.props.fetchModelsFromProject(parseInt(this.props.params.projectid, 10));
      this.props.fetchProject(parseInt(this.props.params.projectid, 10));
    }
  }

  render(): React.ReactElement<HTMLDivElement> {
    if (!this.props.leaderboard) {
      return <div></div>;
    }
    return (
      <div className="projects">
        <Leaderboard items={this.props.leaderboard} projectId={parseInt(this.props.params.projectid, 10)} modelCategory={this.props.project.model_category}></Leaderboard>
      </div>
    );
  }
}

function mapStateToProps(state: any): any {
  return {
    leaderboard: state.projects.models,
    project: state.projects.project
  };
}

function mapDispatchToProps(dispatch): DispatchProps {
  return {
    fetchModelsFromProject: bindActionCreators(fetchModelsFromProject, dispatch),
    fetchProject: bindActionCreators(fetchProject, dispatch)
  };
}

export default connect<any, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(Projects);
