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
        if (datepicker && typeof datepicker.destroy === 'function') {
            datepicker.destroy();
        }
    });

    it('should display the correct Hijri date for a given Georgian date', () => {
        const georgianDate = new Date(2024, 5, 18); // June 18, 2024
        datepicker.selectDate(georgianDate);

        const displayedDate = $('#datepicker').val();
        console.log('Displayed Hijri Date:', displayedDate); // Debugging log
        expect(displayedDate).toBe('12/12/1445'); // Expected Hijri date
    });

    it('should display the correct Georgian date for a given Hijri date', () => {
        const hijriDate = '30/11/1445';
        $('#datepicker').val(hijriDate);
        datepicker.update();

        const selectedDate = datepicker.getSelectedDates()[0];
        console.log('Selected Georgian Date:', selectedDate ? selectedDate.toDateString() : null); // Debugging log
        const expectedDate = new Date(2024, 5, 7); // June 7, 2024
        expect(selectedDate ? selectedDate.toDateString() : null).toBe(expectedDate.toDateString());
    });

    it('should correctly convert and display dates when user interacts with the datepicker', () => {
        // Simulate user selecting a Georgian date
        const userSelectedGeorgianDate = new Date(2024, 5, 18); // June 18, 2024
        datepicker.selectDate(userSelectedGeorgianDate);

        // Verify the displayed Hijri date
        let displayedHijriDate = $('#datepicker').val();
        console.log('Displayed Hijri Date after user selection:', displayedHijriDate); // Debugging log
        expect(displayedHijriDate).toBe('12/12/1445'); // Expected Hijri date

        // Simulate user entering a Hijri date
        const userEnteredHijriDate = '30/11/1445';
        $('#datepicker').val(userEnteredHijriDate);
        datepicker.update();

        // Verify the selected Georgian date
        let selectedGeorgianDate = datepicker.getSelectedDates()[0];
        console.log('Selected Georgian Date after user entry:', selectedGeorgianDate ? selectedGeorgianDate.toDateString() : null); // Debugging log
        const expectedGeorgianDate = new Date(2024, 5, 7); // June 7, 2024
        expect(selectedGeorgianDate ? selectedGeorgianDate.toDateString() : null).toBe(expectedGeorgianDate.toDateString());
    });
});
