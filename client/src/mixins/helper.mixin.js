import dayjs from "dayjs";

export default {
  methods: {
    dateWithoutYear(date) {
      const currentYear = dayjs().format("Y");
      const dateFormatted = dayjs(date).format("D MMM, Y");
      const parts = dateFormatted.split(", ");
      return currentYear === parts.pop() ? parts.shift() : dateFormatted;
    }
  }
};
