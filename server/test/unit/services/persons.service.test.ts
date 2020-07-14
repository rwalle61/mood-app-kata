import * as personsService from '../../../src/v1/services/persons.service';

describe('persons.service.js', () => {
  describe('getPersons()', () => {
    it('returns a list of all persons', () => {
      const output = personsService.getPersons();
      expect(output).toEqual([{ name: 'richard' }]);
    });
  });
});
