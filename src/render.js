import _ from 'lodash';

const getIndent = (indent) => ' '.repeat(indent * 4);

const stringify = (value, indent) => {
  if (typeof value !== 'object') return ` ${value}`;
  const str = Object.keys(value).map((key) => {
    if (typeof value[key] !== 'object') {
      return `${getIndent(indent + 2)}${key}: ${value[key]}`;
    }
    return `${getIndent(indent + 2)}${key}: ${stringify(value[key], indent + 1)}`;
  });
  return ` {\n${str.join('\n')}\n    ${getIndent(indent)}}`;
};

const render = (ast, indent) => {
  const string = ast.map((node) => {
    if (node.state === 'deleted') {
      return `${getIndent(indent)}  - ${node.name}:${stringify(node.value, indent)}`;
    } if (node.state === 'added') {
      return `${getIndent(indent)}  + ${node.name}:${stringify(node.value, indent)}`;
    } if (node.state === 'unmodified') {
      return `${getIndent(indent)}    ${node.name}:${stringify(node.value, indent)}`;
    } if (node.state === 'modified') {
      return [`${getIndent(indent)}  + ${node.name}:${stringify(node.value, indent)}`, `${getIndent(indent)}  - ${node.name}:${stringify(node.oldValue, indent)}`];
    }
    return `${getIndent(indent)}    ${node.name}: ${render(node.children, indent + 1)}`;
  });
  const finalString = `{\n${_.flattenDeep(string).join('\n')}\n${getIndent(indent)}}`;
  // console.log(finalString);
  return finalString;
};
export default render;
