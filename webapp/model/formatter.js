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

    UTCRome: function (oDate) {
      if (!oDate) {
        return null;
      }

      return new Date(oDate.toLocaleString("it", { timeZone: "Europe/Rome" }));
    },

    convertImport: function (sValue) {
      if (!sValue) {
        return "";
      }
      sValue = sValue.replace(".", ",");
      return sValue.toString().replace(/\B(?<!\,\d*)(?=(\d{3})+(?!\d))/g, ".");
    },
  };
});
