import $ from 'jquery';

global.$ = global.jQuery = $;

// Helper functions for date conversion
function mockConvertGeorgianToHijri(date) {
    // Implement the logic for converting Georgian date to Hijri date
    // This is a placeholder implementation
    const hijriDate = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }).format(date);
    return hijriDate;
}

function mockConvertHijriToGeorgian(hijriDate) {
    // Implement the logic for converting Hijri date to Georgian date
    // This is a placeholder implementation
    const [day, month, year] = hijriDate.split('/').map(Number);
    const hijriDateObj = new Date(year, month - 1, day);
    const georgianDate = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }).format(hijriDateObj);
    return new Date(georgianDate);
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
