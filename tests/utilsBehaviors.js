describe('uniqueId', function () {
    it('Should return different strings for each call', function () {
        expect(ko.utils.uniqueId()).not.toEqual(ko.utils.uniqueId());
    });

    it('Should return id starts with passed prefix', function() {
        expect(ko.utils.uniqueId('test-prefix')).toMatch(/^test-prefix/);
    });
});