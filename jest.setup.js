import $ from 'jquery';

global.$ = global.jQuery = $;

$.fn.datepicker = function() {
    return {
        selectDate: function(date) {
            this.selectedDate = date;
        },
        update: function() {
            // Mock update function
        },
        getSelectedDates: function() {
            return [this.selectedDate];
        },
        destroy: function() {
            // Mock destroy function
        }
    };
};

// Mock air-datepicker to avoid dependency on jQuery being globally available
jest.mock('air-datepicker', () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return {
                selectDate: jest.fn(),
                update: jest.fn(),
                getSelectedDates: jest.fn().mockReturnValue([]),
                destroy: jest.fn()
            };
        })
    };
});
