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
        selectDate: jest.fn().mockImplementation((date) => {
          console.log("selectDate called with date:", date);
          this.selectedDates = [date];
        }),
        update: jest.fn().mockImplementation(() => {
          console.log("update called");
          const hijriDate = '30/11/1445'; // Mock Hijri date for testing
          this.selectedDates = [new Date(2024, 5, 18)]; // Mock Georgian date for testing
          // Mock setting the value without referencing DOM elements
          this.mockDatepickerValue = hijriDate;
        }),
        destroy: jest.fn(),
        show: jest.fn(),
        hide: jest.fn(),
        clear: jest.fn(),
        getSelectedDates: jest.fn().mockReturnValue(this.selectedDates || []),
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
    const self = this;
    return {
      selectDate: jest.fn().mockImplementation((date) => {
        console.log("selectDate called with date:", date);
        self.selectedDates = [date];
      }),
      update: jest.fn().mockImplementation(() => {
        console.log("update called");
        const hijriDate = '30/11/1445'; // Mock Hijri date for testing
        self.selectedDates = [new Date(2024, 5, 18)]; // Mock Georgian date for testing
        // Mock setting the value without referencing DOM elements
        self.mockDatepickerValue = hijriDate;
      }),
      destroy: jest.fn(),
      show: jest.fn(),
      hide: jest.fn(),
      clear: jest.fn(),
      getSelectedDates: jest.fn().mockReturnValue(self.selectedDates || []),
    };
  };
  console.log("datepicker method added to jQuery prototype");
} else {
  console.error("jQuery is not defined");
}
