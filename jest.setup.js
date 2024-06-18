import $ from 'jquery';
global.$ = global.jQuery = $;

console.log("jest.setup.js file loaded");

// Mock air-datepicker to avoid issues in Jest environment
jest.mock('air-datepicker', () => {
  console.log("air-datepicker mock applied");
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        selectDate: jest.fn(() => console.log("selectDate called")),
        update: jest.fn(() => console.log("update called")),
        destroy: jest.fn(() => console.log("destroy called")),
        show: jest.fn(() => console.log("show called")),
        hide: jest.fn(() => console.log("hide called")),
        clear: jest.fn(() => console.log("clear called")),
        getSelectedDates: jest.fn(() => {
          console.log("getSelectedDates called");
          return [];
        }),
      };
    }),
  };
});

// Ensure jQuery is defined before extending its prototype
if (global.$) {
  console.log("jQuery is defined");
  // Check if global.$.fn is defined before extending its prototype
  if (global.$.fn) {
    console.log("global.$.fn is defined");
    // Extend jQuery prototype to include datepicker method
    global.$.fn.datepicker = function() {
      console.log("datepicker method called");
      const selectedDates = [];
      const datepickerInstance = {
        selectDate: jest.fn().mockImplementation((date) => {
          console.log("selectDate called with date:", date);
          selectedDates.push(date);
        }),
        update: jest.fn().mockImplementation(() => {
          console.log("update called");
          const hijriDate = '30/11/1445'; // Mock Hijri date for testing
          selectedDates.push(new Date(2024, 5, 18)); // Mock Georgian date for testing
        }),
        destroy: jest.fn(() => console.log("destroy called")),
        show: jest.fn(() => console.log("show called")),
        hide: jest.fn(() => console.log("hide called")),
        clear: jest.fn(() => console.log("clear called")),
        getSelectedDates: jest.fn(() => {
          console.log("getSelectedDates called");
          return selectedDates;
        }),
      };
      $(this).data('datepicker', datepickerInstance);
      return datepickerInstance;
    };
    // Mock the .data() method on the jQuery prototype
    global.$.fn.data = jest.fn().mockImplementation(function(key, value) {
      if (value === undefined) {
        if (key === 'datepicker') {
          return this[0] ? this[0].datepicker : undefined;
        }
        return this[0] ? this[0][key] : undefined;
      } else {
        this.each(function() {
          this[key] = value;
        });
        return this;
      }
    });
    console.log("datepicker method added to jQuery prototype");
    console.log("jQuery prototype after adding datepicker:", global.$.fn);
  } else {
    console.error("global.$.fn is not defined");
  }
} else {
  console.error("jQuery is not defined");
}
