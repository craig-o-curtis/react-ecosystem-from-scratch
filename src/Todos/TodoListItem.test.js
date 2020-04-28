import { expect } from 'chai';
import TodoListItem, { getBorderStyleForDate } from './TodoListItem';

describe('TodoListItem component', () => {
  describe('getBorderStyleForDate', () => {
    it('should return none when date is less than 5 days ago', () => {
      const mockStartingDate = new Date(Date.now() - 8640000 * 3)
      const realCurrentDate = Date.now();
      const expected = 'none';
      const result = getBorderStyleForDate(mockStartingDate, realCurrentDate);
      expect( result ).to.equal( expected );
    });

    it('should return a border when date is more than 5 days ago', () => {
      const mockStartingDate = new Date(Date.now() - 8640000 * 6)
      const realCurrentDate = Date.now();
      const expected = '5px solid red';
      const result = getBorderStyleForDate(mockStartingDate, realCurrentDate);
      expect( result ).to.equal( expected );
    });
  });
});
