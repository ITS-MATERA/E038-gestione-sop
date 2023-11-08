sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/library",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
  ],
  function (Controller, UIComponent, mobileLibrary, Filter, FilterOperator, JSONModel) {
    "use strict";

    // shortcut for sap.m.URLHelper
    var URLHelper = mobileLibrary.URLHelper;

    return Controller.extend("gestionesop.controller.BaseController", {
      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },

      getModel: function (sName) {
        return this.getView().getModel(sName);
      },

      setModel: function (oModel, sName) {
        return this.getView().setModel(oModel, sName);
      },

      getResourceBundle: function () {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle();
      },

      setBlank: function (sValue) {
        if (!sValue) {
          return "";
        }

        return sValue;
      },

      setModelCustom: function (sNameModel, oData) {
        var oView = this.getView();
        var oModelJson = new JSONModel();
        oModelJson.setData(oData);
        oView.setModel(oModelJson, sNameModel);
      },

      hasResponseError: function (oResponse) {
        var bError = false;
        if (oResponse?.headers["sap-message"]) {
          var oMessage = this._getMessage(oResponse);

          switch (oMessage.severity) {
            case "error":
              sap.m.MessageBox.error(oMessage.message);
              bError = true;
              break;
            case "success":
              sap.m.MessageBox.success(oMessage.message);
              break;
            case "warning":
              sap.m.MessageBox.warning(oMessage.message);
              break;
          }
        }
        return bError;
      },

      _getMessage: function (oResponse) {
        return JSON.parse(oResponse.headers["sap-message"]);
      },

      //#region ---------------------GESTIONE VALUE HELP--------------------

      onValueHelpChange: function (oEvent) {
        var sValue = oEvent.getParameter("value");
        var oSource = oEvent.getSource();

        var sFilterValueHelp = oSource.data()?.FilterValueHelp;
        var oFilter = [];
        var qFilters = [];

        if (sFilterValueHelp) {
          oFilter.push(this._createFilterValueHelp(sFilterValueHelp, FilterOperator.Contains, sValue, false));
          qFilters = new Filter({ filters: oFilter, and: false });
          oSource.getBinding("items").filter(qFilters);
        }
      },

      _createFilterValueHelp: function (key, operator, value, useToLower) {
        return new Filter(useToLower ? "tolower(" + key + ")" : key, operator, useToLower ? "'" + value.toLowerCase() + "'" : value);
      },

      loadFragment: function (dialogPath) {
        this.unloadFragment();

        if (!this._sDialog) {
          this._sDialog = sap.ui.xmlfragment(dialogPath, this);
          this.getView().addDependent(this._sDialog);
        }

        return this._sDialog;
      },

      unloadFragment: function () {
        if (this._sDialog) {
          if (this._sDialog.close) {
            this._sDialog.close();
          }
          this._sDialog.destroy();
          this._sDialog = null;
        }
      },

      setModelDialog: function (sNameModel, aData, sNameDialog, oDialog) {
        var oModelJson = new JSONModel();
        oModelJson.setData(aData.results);
        var oSelectDialog = sap.ui.getCore().byId(sNameDialog);
        oSelectDialog?.setModel(oModelJson, sNameModel);
        oDialog.open();
      },

      //#endregion ------------------GESTIONE VALUE HELP--------------------

      //#region -------------------GESTIONE FILTRI--------------------- */

      setFilterEQ: function (aFilters, sPropertyModel, sValue) {
        if (sValue) {
          aFilters.push(new Filter(sPropertyModel, FilterOperator.EQ, sValue));
        }
      },

      setFilterBT: function (aFilters, sPropertyModel, sValueFrom, sValueTo) {
        if (sValueFrom && sValueTo) {
          aFilters.push(new Filter(sPropertyModel, FilterOperator.BT, sValueFrom, sValueTo));
          return;
        }
        if (sValueFrom || sValueTo) {
          this.setFilterEQ(aFilters, sPropertyModel, sValueFrom);
          this.setFilterEQ(aFilters, sPropertyModel, sValueTo);
          return;
        }
      },

      setFilterCP: function (aFilters, sPropertyModel, sValue) {
        if (sValue) {
          aFilters.push(new Filter(sPropertyModel, FilterOperator.Contains, sValue));
        }
      },

      //#endregion -------------------GESTIONE FILTRI--------------------- */

      getPermissionSop: function (bNavTo = false) {
        var self = this;
        var oAuthModel = this.getModel("ZSS4_CA_CONI_VISIBILITA_SRV");

        var aFilters = [];

        self.setFilterEQ(aFilters, "SEM_OBJ", "ZS4_SOP_SRV");
        self.setFilterEQ(aFilters, "AUTH_OBJ", "Z_GEST_SOP");

        var oAuth = {
          AgrName: "",
          Fikrs: "",
          Prctr: "",
          Registra: false,
          Dettaglio: false,
          Copia: false,
        };

        oAuthModel.read("/ZES_CONIAUTH_SET", {
          filters: aFilters,
          success: function (data) {
            var aData = data.results;
            oAuth.AgrName = aData[0].AGR_NAME;
            oAuth.Fikrs = aData[0].FIKRS;
            oAuth.Prctr = aData[0].PRCTR;
            oAuth.Copia = self._isUserAuthorized(aData, "ACTV_4", "Z10");
            oAuth.Registra = self._isUserAuthorized(aData, "ACTV_1", "Z01");
            oAuth.Dettaglio = self._isUserAuthorized(aData, "ACTV_3", "Z03");
            self.setModel(new JSONModel(oAuth), "AuthorityCheck");
            if (bNavTo) {
              self.getRouter().navTo("amm.home");
            }
          },
          error: function (error) {
            self.setModel(new JSONModel(oAuth), "AuthorityCheck");
          },
        });
      },

      _isUserAuthorized: function (array, param, value) {
        return array.filter((x) => x[param] === value).length > 0;
      },
    });
  }
);
