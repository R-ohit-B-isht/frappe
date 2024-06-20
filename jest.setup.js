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
                        if (date.getFullYear() === 2024 && date.getMonth() === 5 && date.getDate() === 18) {
                            this.hijriDate = '30/11/1445';
                        }
                    }
                }),
                update: jest.fn(function() {
                    // Mock conversion from Hijri to Georgian date
                    if (this.hijriDate === '30/11/1445') {
                        this.selectedDate = new Date(2024, 5, 18);
                    }
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
                if (date.getFullYear() === 2024 && date.getMonth() === 5 && date.getDate() === 18) {
                    this.hijriDate = '30/11/1445';
                }
            }
        },
        update: function() {
            // Mock conversion from Hijri to Georgian date
            if (this.hijriDate === '30/11/1445') {
                this.selectedDate = new Date(2024, 5, 18);
            }
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
