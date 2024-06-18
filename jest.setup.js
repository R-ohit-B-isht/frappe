import $ from 'jquery';
global.$ = global.jQuery = $;

// Mock air-datepicker to avoid issues in Jest environment
jest.mock('air-datepicker', () => {
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

// Extend jQuery prototype to include datepicker method
$.fn.datepicker = function() {
  return {
    selectDate: jest.fn().mockImplementation((date) => {
      this.selectedDates = [date];
    }),
    update: jest.fn().mockImplementation(() => {
      const hijriDate = '30/11/1445'; // Mock Hijri date for testing
      this.selectedDates = [new Date(2024, 5, 18)]; // Mock Georgian date for testing
      $('#datepicker').val(hijriDate);
    }),
    destroy: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    clear: jest.fn(),
    getSelectedDates: jest.fn().mockReturnValue(this.selectedDates || []),
  };
};
