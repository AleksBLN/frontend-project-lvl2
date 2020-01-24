import getAst from './astBuilder';
import render from './render';
import parse from './parsers';


const genDiff = (path1, path2) => {
  const object1 = parse(path1);
  const object2 = parse(path2);
  const ast = getAst(object1, object2);
  const finalDiff = render(ast, 0);
  return finalDiff;
};
export default genDiff;
