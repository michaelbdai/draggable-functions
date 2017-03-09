export const addFunction = (functionName, functionArg, targetFn, targetIndex) => {
  // console.log('addFunction Action', functionName, functionArg);
  return {
    type: 'ADD_FUNCTION',
    functionName,
    functionArg,
    functionChain: targetFn ? [targetFn, targetIndex] : null,
  };
}
export const updateInputValue = (functionCounter, argIndex, value) => {
  // console.log('updateInputValue', functionName, argIndex, value);
  return {
    type: 'UPDATE_INPUTVALUE',
    functionCounter,
    argIndex,
    value,
  };
}

export const resetAll = () => {
  return {
    type: 'RESET',
  };
}