import { Table } from './table';
import { Random } from './random';

describe('Table', () => {

  it('should create an instance', () => {
    expect(new Table('test', 1, 5)).toBeTruthy();
  });

  describe('for columns', () => {

    it('should be able to add a new column', () => {
      let table: Table = new Table('test', 1, 5);
      table.addColumn('test', new Random('','',1,1,1));
      expect(table.getColumnNames()).toEqual((['test']));
    });

    it('should NOT be able to add an existing column', () => {
      let table: Table = new Table('test', 1, 5);
      table.addColumn('test', new Random('','',1,1,1));
      let success = table.addColumn('test', new Random('','',2,2,2));
      expect(success).toBe(false);
      expect(table.getColumnNames()).toEqual((['test']));
    });

    it('should be able to remove a column', () => {
      let table: Table = new Table('test', 1, 5);
      table.addColumn('test', new Random('','',1,1,1));
      let success = table.removeColumn('test');
      expect(success).toBe(true);
      expect(table.getColumnNames()).toEqual(([]));
    });

    it('should NOT be able to remove an unknown column', () => {
      let table: Table = new Table('test', 1, 5);
      let success = table.removeColumn('test');
      expect(success).toBe(false);
      expect(table.getColumnNames()).toEqual(([]));
    });

    it('should NOT delete other columns', () => {
      let table: Table = new Table('test', 1, 5);
      table.addColumn('test1', new Random('','',1,1,1));
      table.addColumn('test2', new Random('','',1,1,1));
      table.addColumn('test3', new Random('','',1,1,1));
      let success = table.removeColumn('test2');
      expect(success).toBe(true);
      table.addColumn('test4', new Random('','',1,1,1));
      success = table.removeColumn('test2');
      expect(success).toBe(false);
      expect(table.getColumnNames()).toEqual((['test1', 'test3', 'test4']));
    });

  })

});
