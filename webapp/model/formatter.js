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
      var iDay = parseInt(sDay)
      if (iDay < 10) {
        sDay = "0" + sDay
      }
      var sMonths = oDate.getMonth() + 1;
      var iMonth = parseInt(sMonths)
      if (iMonth < 10) {
        sMonths = "0" + sMonths
      }
      var sYear = oDate.getFullYear();
      var sDatetime = sYear + "-" + sMonths + "-" + sDay + "T00:00:00.000+00:00"
      oDate = new Date(sDatetime)

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

    formatDateAllType: function (sValue) {
      var oDateFormat = sap.ui.core.format.DateFormat.getInstance({
        pattern: "dd.MM.yyyy"
      });
      var sOutput = "";
      var sType = typeof (sValue);
      switch (sType) {
        case 'object':
          sOutput = oDateFormat.format(sValue);
          break;
        case 'string':
          if (sValue != "" && sValue[0] != "0") {
            if (sValue.length == 8) {
              sOutput = sValue[6] + sValue[7] + "." + sValue[4] + sValue[5] + "." + sValue[0] + sValue[1] + sValue[2] + sValue[3];
            } else {
              sOutput = sValue[8] + sValue[9] + "." + sValue[5] + sValue[6] + "." + sValue[0] + sValue[1] + sValue[2] + sValue[3];
            }
          }
          break;
        default:
          break;
      }
      return sOutput;
    }
  };
});
