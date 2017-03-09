import React from 'react'
import { connect } from 'react-redux';
import { updateInputValue, addChain, addFunction } from '../actions';
import DropZone from '../components/DropZone.jsx';
import Item from '../components/Item.jsx';

class Arguments extends React.Component {
  constructor(props) {
    // console.log('Arguments----')
    super(props);
    this.state = {
      counterId: this.props.functionsCount - 1,
      functionName: this.props.lastFnName,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleChange(e) {
    // console.log(e.target);
    // console.log(e.target.id);
    this.props.changeInputValue(this.state.counterId, e.target.id, e.target.value);
  }
  handleSelect(functionName, index) {
    let functionArg = 
      new Array(this.props.functionList[functionName].length).fill(undefined);
    this.props.selectFunction(functionName, functionArg, this.state.functionName, index);
  }
  render() {
    // console.log(this.props.functionsArg);
    // console.log(this.props.functionsCount);
    let counter = this.props.functionsArg[this.state.counterId].length;
    return (
      <div>
        <Item
          functionName={this.state.functionName}
          key={this.state.functionName}
          style={{width: `${Math.floor(80 / (counter + 1))}`}}
        />
        <form >
          {this.props.functionsArg[this.state.counterId]
            .map((useless, index, array) => (
              <DropZone
                handleSelect={this.handleSelect}
                index={index}
                key={index}
                isForm={true}
                width={`${Math.floor(80 / (counter + 1))}%`}
              >
                <input
                  type="text"
                  key={index} 
                  onChange={this.handleChange}
                  id={index}
                  className="memo"
                  placeholder="enter value/drag a icon"
                />
              </DropZone>
            ))
          }
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  functionsArg: state.functionsArg,
  functionList: state.functionList,
  lastFnName: state.lastFnName,
  functionsCount:state.functionsCount,
});
const mapDispatchToProps = (dispatch) => ({
  changeInputValue: (functionsCount, argIndex, value) => {
    dispatch(updateInputValue(functionsCount, argIndex, value));
  },
  selectFunction: (functionName, functionArg, targetFn, targetIndex) => {
    dispatch(addFunction(functionName, functionArg, targetFn, targetIndex));
  },
});

Arguments = connect(mapStateToProps, mapDispatchToProps)(Arguments);
export default Arguments;
