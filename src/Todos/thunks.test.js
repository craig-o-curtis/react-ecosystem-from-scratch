import 'node-fetch';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import sinon from 'sinon';
import { apiLoadingTodos, apiLoadedTodosSuccess } from '../Store/Actions';
import { loadTodosRequest } from './thunks';

describe(`loadTodosRequest thunk API call`, () => {
  it('should dispatch correct success actions', async () => {
    // ** spies
    const fakeDispatch = sinon.spy();
    // ** fake fetch
    const fakeTodosReturnedFromApi = [{text:'1'},{text:'2'}];
    // ** define what url will hit, with return response
    fetchMock.get('http://localhost:8080/todos', fakeTodosReturnedFromApi);

    // ** define actions
    const expectedFirstAction = { ...apiLoadingTodos() };
    const expectedSecondAction = { ...apiLoadedTodosSuccess(fakeTodosReturnedFromApi) };

    // ** call thunk
    await loadTodosRequest()(fakeDispatch);

    // ** actual test - test dispatched actions in correct order
    // ** .getCall(0) === the 1st call made to fakeDispatch
    // ** .args[0] === the 1st arg passed during 1st call to fakeDispatch
    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal( expectedFirstAction )
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal( expectedSecondAction )
    // ** restore fetch back to original state
    fetchMock.reset(); 
  });
  
  it('should load actual data from server', () => {
    
  });

});
