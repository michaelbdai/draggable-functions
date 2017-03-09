import React from 'react';
import List from './List.jsx';
import ExpressionArea from './ExpressionArea.jsx';
import { connect } from 'react-redux';
import {resetAll} from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
  }
  handleClick() {
    let lastFnName = this.props.lastFnName;
    let arg = this.props.functionsArg;
    let chain = this.props.functionsChain;
    let fnDB = this.props.functionList;
    // console.log(arg);
    // console.log(chain);
    // console.log(lastFnName);
    let result = '';
    let targetIndex;
    let output;
    for (
      let counter = this.props.functionsCount - 1;
      counter >= 0;
      counter--
    ){
      let errorMessage;
      let args = arg[counter].slice(0);
      if (targetIndex !== undefined) args[targetIndex] = output;
      // console.log('args is', args)
      try {
        output = fnDB[lastFnName].apply(null, args.map(a => JSON.parse(a)));
      } catch(e) {
        errorMessage = 
          `Find error from function ${lastFnName}. \n 
          Error type: ${e.name}. \n
          Error message: ${e.message} \n`;
      }
      if (errorMessage) {
        result += errorMessage;
        break; 
      } else {
        result += `Get result from function ${lastFnName} => ${JSON.stringify(output)} \n`;
      }
      // console.log('inlop', counter);
      if (chain[counter]) {
        // console.log(chain[counter]);
        targetIndex = chain[counter][1];
        lastFnName = chain[counter][0];
      }
    }
    this.setState({
      result: result,
    });
  }
  reset() {
    this.props.reset();
    this.rend();
  }
  render() {
    return (
      <div className="container">
        <List />
        <ExpressionArea key={0} id={0} />
        {this.props.functionsChain.slice(1).map((functionName, index) => (
          <ExpressionArea
            key={index}
            id={index}
            index={index}
            functionName={functionName}
          />
        ))}
        <div className="button" onClick={this.handleClick} key="button">
          Click to Calculate
        </div>       
        <div className="result" key="result">
          {this.state.result.split('\n').map((item, index) => 
            <p key={index} >{item}</p> 
          )}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  functionsArg: state.functionsArg,
  functionsChain: state.functionsChain,
  functionList: state.functionList,
  lastFnName: state.lastFnName,
  functionsCount: state.functionsCount,
});
const mapDispatchToProps = (dispatch) => ({
  reset: () => {
    dispatch(resetAll())
  },
});
App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
