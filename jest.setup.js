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
                    this.selectedDate = date;
                    // Dynamic conversion from Georgian to Hijri date
                    if (date instanceof Date) {
                        const hijriDate = mockConvertGeorgianToHijri(date);
                        this.hijriDate = hijriDate || '';
                    }
                }),
                update: jest.fn(function() {
                    // Dynamic conversion from Hijri to Georgian date
                    const georgianDate = mockConvertHijriToGeorgian(this.hijriDate);
                    this.selectedDate = georgianDate || null;
                }),
                getSelectedDates: jest.fn(function() {
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
            this.selectedDate = date;
            // Dynamic conversion from Georgian to Hijri date
            if (date instanceof Date) {
                const hijriDate = mockConvertGeorgianToHijri(date);
                this.hijriDate = hijriDate || '';
            }
        },
        update: function() {
            // Dynamic conversion from Hijri to Georgian date
            const georgianDate = mockConvertHijriToGeorgian(this.hijriDate);
            this.selectedDate = georgianDate || null;
        },
        getSelectedDates: function() {
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
        return this[0] && this[0].hijriDate ? this[0].hijriDate : '';
    } else {
        this.each(function() {
            this.hijriDate = value;
        });
        return this;
    }
};
