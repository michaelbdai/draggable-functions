import React from 'react';
import { connect } from 'react-redux';
import DropZone from '../components/DropZone.jsx';
import Arguments from './Arguments.jsx';
import { addFunction } from '../actions';

class ExpressionArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      functionName: this.props.functionName || null,
      dropZoneDisabled: !!this.props.functionName
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(functionName, index) {
    // console.log('ExpressionArea')
    this.setState({
      functionName: functionName,
    });
    let functionArg = 
      new Array(this.props.functionList[functionName].length).fill(undefined);
    this.props.selectFunction(functionName, functionArg);
  }
  render() {
    return(
      <DropZone
        handleSelect={this.handleSelect}
        index={0}
        disabled={this.state.dropZoneDisabled}
      >
        {
          this.state.functionName === null ? 
          <div className="memo exp-area"> Drag a function icon to here </div>
           :
          <Arguments functionCounter={this.props.id} />
        }
      </DropZone>
    )
  }
};
const mapStateToProps = (state) => ({
  functionList: state.functionList
});
const mapDispatchToProps = (dispatch) => ({
  selectFunction: (functionName, functionArg) => {
    // console.log('dispatch', typeof dispatch);
    dispatch(addFunction(functionName, functionArg))},

});

ExpressionArea = connect(mapStateToProps, mapDispatchToProps)(ExpressionArea);
export default ExpressionArea;
