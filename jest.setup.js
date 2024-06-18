// Mock air-datepicker to avoid issues in Jest environment
jest.mock('air-datepicker', () => {
  console.log("air-datepicker mock applied");
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        selectDate: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
        show: jest.fn(),
        hide: jest.fn(),
        clear: jest.fn(),
        getSelectedDates: jest.fn().mockReturnValue([]),
      };
    }),
  };
});

import $ from 'jquery';
global.$ = global.jQuery = $;

console.log("jest.setup.js file loaded");

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
      $('#datepicker').val(hijriDate);
    }),
    destroy: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    clear: jest.fn(),
    getSelectedDates: jest.fn().mockReturnValue(self.selectedDates || []),
  };
};
