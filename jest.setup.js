import $ from 'jquery';

global.$ = global.jQuery = $;

// Mock air-datepicker to avoid dependency on jQuery being globally available
jest.mock('air-datepicker', () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return {
                selectDate: jest.fn(function(date) {
                    this.selectedDate = date;
                    // Mock conversion from Georgian to Hijri date
                    if (date instanceof Date) {
                        const georgianToHijri = {
                            '2024-06-18': '30/11/1445'
                        };
                        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                        this.hijriDate = georgianToHijri[dateString] || '';
                    }
                }),
                update: jest.fn(function() {
                    // Mock conversion from Hijri to Georgian date
                    const hijriToGeorgian = {
                        '30/11/1445': new Date(2024, 5, 18)
                    };
                    this.selectedDate = hijriToGeorgian[this.hijriDate] || null;
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
            // Mock conversion from Georgian to Hijri date
            if (date instanceof Date) {
                const georgianToHijri = {
                    '2024-06-18': '30/11/1445'
                };
                const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                this.hijriDate = georgianToHijri[dateString] || '';
            }
        },
        update: function() {
            // Mock conversion from Hijri to Georgian date
            const hijriToGeorgian = {
                '30/11/1445': new Date(2024, 5, 18)
            };
            this.selectedDate = hijriToGeorgian[this.hijriDate] || null;
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
