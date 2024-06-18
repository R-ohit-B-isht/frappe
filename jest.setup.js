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
      };
    }),
  };
});
