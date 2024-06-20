import $ from 'jquery';
import moment from 'moment-hijri';

global.$ = global.jQuery = $;

// Helper functions for date conversion
function mockConvertGeorgianToHijri(date) {
    if (!(date instanceof Date)) return '';
    const hijriDate = moment(date).format('iDD/iMM/iYYYY');
    console.log('mockConvertGeorgianToHijri called with:', date, 'converted to:', hijriDate); // Debugging log
    return hijriDate;
}

function mockConvertHijriToGeorgian(hijriDate) {
    if (!hijriDate) return null;
    const georgianDate = moment(hijriDate, 'iDD/iMM/iYYYY').toDate();
    console.log('mockConvertHijriToGeorgian called with:', hijriDate, 'converted to:', georgianDate); // Debugging log
    return georgianDate;
}

// Mock air-datepicker to avoid dependency on jQuery being globally available
jest.mock('air-datepicker', () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return {
                selectDate: jest.fn(function(date) {
                    console.log('selectDate: initial state', this); // Debugging log
                    this.selectedDate = date;
                    // Dynamic conversion from Georgian to Hijri date
                    if (date instanceof Date) {
                        const hijriDate = mockConvertGeorgianToHijri(date);
                        this.hijriDate = hijriDate || '';
                        console.log('selectDate: set hijriDate to', this.hijriDate); // Debugging log
                    }
                    console.log('selectDate: final state', this); // Debugging log
                    console.log('selectDate: hijriDate is', this.hijriDate); // Additional logging
                }),
                update: jest.fn(function() {
                    console.log('update: initial state', this); // Debugging log
                    console.log('update: hijriDate before conversion', this.hijriDate); // Debugging log
                    // Dynamic conversion from Hijri to Georgian date
                    const georgianDate = mockConvertHijriToGeorgian(this.hijriDate);
                    console.log('update: georgianDate after conversion', georgianDate); // Additional logging
                    this.selectedDate = georgianDate || null;
                    console.log('update: set selectedDate to', this.selectedDate); // Debugging log
                    console.log('update: final state', this); // Debugging log
                    // Additional logging to verify the update process
                    if (this.selectedDate) {
                        console.log('update: selectedDate is set to', this.selectedDate.toDateString());
                    } else {
                        console.log('update: selectedDate is null');
                    }
                    console.log('update: hijriDate is', this.hijriDate); // Additional logging
                    // Ensure the hijriDate is correctly set
                    if (!this.hijriDate) {
                        console.log('update: hijriDate is not set correctly');
                    }
                }),
                getSelectedDates: jest.fn(function() {
                    console.log('getSelectedDates: returning', [this.selectedDate]); // Debugging log
                    return [this.selectedDate];
                }),
                destroy: jest.fn()
            };
        })
    };
});

if (!$.fn) {
    $.fn = {};
}

$.fn.datepicker = function() {
    const datepickerInstance = {
        selectDate: function(date) {
            console.log('selectDate: initial state', this); // Debugging log
            this.selectedDate = date;
            // Dynamic conversion from Georgian to Hijri date
            if (date instanceof Date) {
                const hijriDate = mockConvertGeorgianToHijri(date);
                this.hijriDate = hijriDate || '';
                console.log('selectDate: set hijriDate to', this.hijriDate); // Debugging log
            }
            console.log('selectDate: final state', this); // Debugging log
        },
        update: function() {
            console.log('update: initial state', this); // Debugging log
            // Dynamic conversion from Hijri to Georgian date
            const georgianDate = mockConvertHijriToGeorgian(this.hijriDate);
            this.selectedDate = georgianDate || null;
            console.log('update: set selectedDate to', this.selectedDate); // Debugging log
            console.log('update: final state', this); // Debugging log
        },
        getSelectedDates: function() {
            console.log('getSelectedDates: returning', [this.selectedDate]); // Debugging log
            return [this.selectedDate];
        },
        destroy: function() {
            // Mock destroy function
        }
    };

    $(this).data('datepicker', datepickerInstance);
    return this;
};

$.fn.data = function(key, value) {
    if (value === undefined) {
        return this[0] && this[0][key];
    } else {
        this.each(function() {
            this[key] = value;
        });
        return this;
    }
};

// Mock the jQuery val() function to return the expected values based on the internal state of the mocked datepicker
$.fn.val = function(value) {
    if (value === undefined) {
        const hijriDate = this[0] && this[0].datepicker ? this[0].datepicker.hijriDate : '';
        console.log('val: returning hijriDate', hijriDate); // Debugging log
        return hijriDate;
    } else {
        this.each(function() {
            this.datepicker.hijriDate = value;
            console.log('val: set hijriDate to', this.datepicker.hijriDate); // Debugging log
            // Ensure the update method is called to reflect the change in hijriDate
            if (this.datepicker) {
                console.log('val: calling update on datepicker with hijriDate', this.datepicker.hijriDate); // Debugging log
                this.datepicker.update();
            }
        });
        return this;
    }
};
