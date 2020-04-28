import { expect } from 'chai';
import { getCompleteTodosSelector } from './selectors';

// export const getCompleteTodosSelector = createSelector(
//   getTodosSelector,
//** only need to test this second part */
//   (todos) => todos.filter(todo => todo.isCompleted)
// );

describe(`getCompleteTodosSelector`, () => {
  it(`should return only completed todos`, () => {
    // define the return value of getTodosSelector
    const fakeTodos = [{text: 'test1', isCompleted: true},{text: 'test2', isCompleted: false}];
    // expected
    const expected = fakeTodos.filter(t => t.isCompleted);
    // test
    const result = getCompleteTodosSelector.resultFunc(fakeTodos);
    expect( result ).to.deep.equal( expected );
  });
});
