sap.ui.define([], function () {
  "use strict";

  return {
    /**
     * Rounds the number unit value to 2 digits
     * @public
     * @param {string} sValue the number string to be rounded
     * @returns {string} sValue with 2 digits rounded
     */
    numberUnit: function (sValue) {
      if (!sValue) {
        return "";
      }
      return parseFloat(sValue).toFixed(2);
    },

    /**
     *
     * @param {Date} oDate
     * @returns {Date}
     */
    UTCRome: function (oDate) {
      if (!oDate) {
        return null;
      }

      if (!oDate instanceof Date) {
        oDate = new Date(oDate);
      }

      var sDay = oDate.getDate();
      var sMonths = oDate.getMonth() + 1;
      var sYear = oDate.getFullYear();
      oDate = new Date(sYear + "-" + sMonths + "-" + sDay + "T00:00:00+0000")

      return oDate
    },

    convertImport: function (sValue) {
      if (!sValue) {
        return "";
      }
      sValue = sValue.replace(".", ",");
      return sValue.toString().replace(/\B(?<!\,\d*)(?=(\d{3})+(?!\d))/g, ".");
    },

    /**
     *
     * @param {Date} oDate
     * @returns {string}
     */
    dateToString: function (oDate) {
      if (!oDate) {
        return "";
      }

      var sDay = oDate.getDate();
      var sMonths = oDate.getMonth() + 1;
      var sYear = oDate.getFullYear();

      return sDay + "." + sMonths + "." + sYear;
    },

    deleteFirstZeros: function (sValue) {
      if (parseInt(sValue) === 0 || !sValue) {
        return "";
      }
      return parseInt(sValue).toString();
    },
  };
});
