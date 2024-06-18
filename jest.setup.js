import $ from 'jquery';
global.$ = global.jQuery = $;

console.log("jest.setup.js file loaded");

// Mock air-datepicker to avoid issues in Jest environment
jest.mock('air-datepicker', () => {
  console.log("air-datepicker mock applied");
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      const selectedDates = [];
      return {
        selectDate: jest.fn().mockImplementation((date) => {
          console.log("selectDate called with date:", date);
          selectedDates.push(date);
        }),
        update: jest.fn().mockImplementation(() => {
          console.log("update called");
          const hijriDate = '30/11/1445'; // Mock Hijri date for testing
          selectedDates.push(new Date(2024, 5, 18)); // Mock Georgian date for testing
        }),
        destroy: jest.fn(),
        show: jest.fn(),
        hide: jest.fn(),
        clear: jest.fn(),
        getSelectedDates: jest.fn().mockReturnValue(selectedDates),
      };
    }),
  };
});

// Ensure jQuery is defined before extending its prototype
if ($) {
  console.log("jQuery is defined");
  // Extend jQuery prototype to include datepicker method
  $.fn.datepicker = function() {
    console.log("datepicker method called");
    const selectedDates = [];
    return {
      selectDate: jest.fn().mockImplementation((date) => {
        console.log("selectDate called with date:", date);
        selectedDates.push(date);
      }),
      update: jest.fn().mockImplementation(() => {
        console.log("update called");
        const hijriDate = '30/11/1445'; // Mock Hijri date for testing
        selectedDates.push(new Date(2024, 5, 18)); // Mock Georgian date for testing
      }),
      destroy: jest.fn(),
      show: jest.fn(),
      hide: jest.fn(),
      clear: jest.fn(),
      getSelectedDates: jest.fn().mockReturnValue(selectedDates),
    };
  };
  console.log("datepicker method added to jQuery prototype");
} else {
  console.error("jQuery is not defined");
}
