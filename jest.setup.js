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
        datepicker: {
          language: {
            hijri: {
              days: ["الأحد", "الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعه", "السبت"],
              daysShort: ["أحد", "أثن", "ثلا", "أرب", "خمي", "جمع", "سبت"],
              daysMin: ["أ", "ث", "ث", "أ", "خ", "ج", "س"],
              months: [
                "محرم",
                "صفر",
                "ربيع الأول",
                "ربيع الآخر",
                "جمادى الأولى",
                "جمادى الآخرة",
                "رجب",
                "شعبان",
                "رمضان",
                "شوال",
                "ذو القعدة",
                "ذو الحجة",
              ],
              monthsShort: [
                "محرم",
                "صفر",
                "ربيع 1",
                "ربيع 2",
                "جمادى 1",
                "جمادى 2",
                "رجب",
                "شعبان",
                "رمضان",
                "شوال",
                "ذو القعدة",
                "ذو الحجة",
              ],
              today: "اليوم",
              clear: "مسح",
              dateFormat: "dd/mm/yyyy",
              timeFormat: "hh:ii aa",
              firstDay: 6,
            },
          },
        },
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
