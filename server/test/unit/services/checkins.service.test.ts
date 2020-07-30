import * as checkInsService from '../../../src/v1/services/checkins.service';

describe('checkIns.service.js', () => {
  describe('getCheckIns()', () => {
    it('returns a list of all checkIns', () => {
      expect(checkInsService.getCheckIns()).toEqual([]);
    });
  });
  describe('addCheckIn()', () => {
    it('updates the list of checkIns', () => {
      const newCheckIn = {
        date: Date.now(),
        mood: 3,
        feelings: ['Happy', 'Optimistic'],
        comment: 'comment1',
      };
      checkInsService.addCheckIn(newCheckIn);

      expect(checkInsService.getCheckIns()).toEqual([newCheckIn]);
    });
  });
});
