import { expect } from 'chai';
import { todos as TodosReducer, initialState } from './Reducers';
import { 
  API_CREATED_TODO,
  API_LOADING_TODOS,
  apiLoadingTodos 
} from './Actions';

describe('todos reducer', () => {
  it(`adds new todo when ${API_CREATED_TODO} action is received`, () => {
    // setup
    const fakeTodo = { text: 'test1', isCompleted: false };
    const fakeAction = {
      type: API_CREATED_TODO,
      payload: {
        todo: fakeTodo
      }
    }
    const fakeOriginalState = { ...initialState };
    // expected and result
    const expected = {
      isLoading: false,
      data: [fakeTodo]
    }
    // result
    const result = TodosReducer(fakeOriginalState, fakeAction);
    // test
    expect( result ).to.deep.equal( expected );
  });

  it(`sets loading to true, keeps staet with ${API_LOADING_TODOS}`, () => {
    // setup
    const realAction = apiLoadingTodos;
    const realOriginalState = { ...initialState };
    // expected
    const expected = {
      isLoading: true,
      data: realOriginalState.data
    }
    // result
    const result = TodosReducer(realOriginalState, realAction());
    expect( result ).to.deep.equal( expected )
  });

});
