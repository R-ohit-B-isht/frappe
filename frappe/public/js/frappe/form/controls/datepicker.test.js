import $ from 'jquery';
// import './datepicker_i18n';

describe('Hijri Calendar Datepicker', () => {
    let datepicker;

    beforeEach(() => {
        document.body.innerHTML = '<input type="text" id="datepicker">';
        datepicker = $('#datepicker').datepicker({
            language: 'hijri',
            dateFormat: 'dd/mm/yyyy',
        }).data('datepicker');
    });

    afterEach(() => {
        datepicker.destroy();
    });

    it('should display the correct Hijri date for a given Georgian date', () => {
        const georgianDate = new Date(2024, 5, 18); // June 18, 2024
        datepicker.selectDate(georgianDate);

        const displayedDate = $('#datepicker').val();
        expect(displayedDate).toBe('30/11/1445'); // Expected Hijri date
    });

    it('should display the correct Georgian date for a given Hijri date', () => {
        const hijriDate = '30/11/1445';
        $('#datepicker').val(hijriDate);
        datepicker.update();

        const selectedDate = datepicker.selectedDates[0];
        const expectedDate = new Date(2024, 5, 18); // June 18, 2024
        expect(selectedDate.toDateString()).toBe(expectedDate.toDateString());
    });
});
