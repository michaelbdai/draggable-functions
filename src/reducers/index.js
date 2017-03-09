import { FUNCTIONS } from '../functionList.js';
const copyOfArray = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++ ){
    let element = arr[i];
    if (Array.isArray(element)){
      element = copyOfArray(element);
    } else if (typeof element === 'object') {
      element = copyOfObj(element);
    } 
    result.push(element);
  }
  return result;
}

const copyOfObj = (obj) => {
  let result = {};
  for (let key in obj) {
    let value = obj[key];
    if (Array.isArray(value)) {
      value = copyOfArray(value); 
    } else if (typeof value === 'object') {
      value = copyOfObj(value);
    }
    result[key] = value;
  }
  return result;
}
const initialState = {
  // expressionAreaArray: [true],
  functionList: FUNCTIONS,
  // selectedFunctions: [], //[fn1, fn2, fn1]array of function name
  functionsArg: [], //[[arr1, arr2, ...], [...]: ..., ..]
  functionsChain: [], //[null, [fn1, 1],... [fn2, 0],...]
  functionsCount: 0,
  lastFnName: '',
}
let functionsArgCopy
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FUNCTION': 
      return {
        ...state,
        functionsChain: state.functionsChain.concat([action.functionChain]),
        functionsArg: state.functionsArg.concat([action.functionArg]),
        lastFnName: action.functionName,
        functionsCount: state.functionsCount + 1,

      };
    case 'UPDATE_INPUTVALUE':
      functionsArgCopy = copyOfArray(state.functionsArg);
      functionsArgCopy[action.functionCounter][action.argIndex] = action.value;
      return {
        ...state,
        functionsArg: functionsArgCopy,
      };

    case 'RESET' : 
      return initialState;
    default:
      return state;      
  }
}