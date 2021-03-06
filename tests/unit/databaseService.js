import {fetchData} from '../../site/src/databaseService.js';

describe('Database service', () => {
    describe('fetchData() method', () => {

        it('should return a promise with correct data', () => {

            var expected = [
                { name: 'Cars', left: 1, right: 18 },
                { name: 'Fast', left: 2, right: 11 },
                { name: 'Red', left: 3, right: 6 },
                { name: 'Ferrari', left: 4, right: 5 },
                { name: 'Yellow', left: 7, right: 10 },
                { name: 'Lamborghini', left: 8, right: 9 },
                { name: 'Slow', left: 12, right: 17 },
                { name: 'Lada', left: 13, right: 14 },
                { name: 'Polonez', left: 15, right: 16 }
            ];

            expect(fetchData()).to.deep.equal(expected);
        });
    });
});
