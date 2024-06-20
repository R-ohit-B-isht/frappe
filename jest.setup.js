import $ from 'jquery';

global.$ = global.jQuery = $;

require('air-datepicker');
require('air-datepicker/air-datepicker.css');

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
