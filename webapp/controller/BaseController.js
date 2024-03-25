sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/library",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library",
    "sap/ui/core/BusyIndicator"
  ],
  function (Controller, UIComponent, mobileLibrary, Filter, FilterOperator, JSONModel, MessageBox, Spreadsheet, exportLibrary, BusyIndicator) {
    "use strict";

    // shortcut for sap.m.URLHelper
    var URLHelper = mobileLibrary.URLHelper;
    const EDM_TYPE = exportLibrary.EdmType;

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

      resetWizard: function (sId) {
        var self = this;
        var oWizard = self.getView().byId(sId);
        var iCurrentWizard = oWizard.getProgress();
        for (var i = 0; i < iCurrentWizard - 1; i++) {
          oWizard.previousStep();
        }
      },

      acceptOnlyImport: function (sId) {
        var oInput = this.getView().byId(sId);
        oInput.attachBrowserEvent("keypress", function (oEvent) {
          if (oEvent.key === "." || oEvent.key === "-") {
            oEvent.preventDefault();
          }
        });
      },

      acceptOnlyNumber: function (sId) {
        var oInput = this.getView().byId(sId);
        oInput.attachBrowserEvent("keypress", function (oEvent) {
          if (isNaN(oEvent.key)) {
            oEvent.preventDefault();
          }
        });
      },

      acceptOnlyTotChar: function (sId, iNumber) {
        var oInput = this.getView().byId(sId);
        oInput.attachBrowserEvent("keypress", function (oEvent) {
          var iLength = sap.ui.getCore().byId(oEvent.currentTarget.id).getValue().length
          if (iLength >= iNumber) {
            oEvent.preventDefault();
          }
          if (isNaN(oEvent.key)) {
            oEvent.preventDefault();
          }
        });
      },

      noWrite: function (sId) {
        var oInput = this.getView().byId(sId);
        oInput.attachBrowserEvent("keypress", function (oEvent) {
          if (oEvent.key) {
            oEvent.preventDefault();
          }
        });
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
              MessageBox.error(oMessage.message);
              bError = true;
              break;
            case "success":
              MessageBox.success(oMessage.message);
              break;
            case "warning":
              MessageBox.warning(oMessage.message);
              break;
          }
        }

        return bError;
      },

      resetLog: function () {
        this.setModel(new JSONModel({}), "Log")
        var oModelUtility = this.getModel("Utility")
        oModelUtility.setProperty("/isLogVisible", false)
      },

      _getMessage: function (oResponse) {
        return JSON.parse(oResponse.headers["sap-message"]);
      },

      hasMessageError: function (data) {
        var aData = data.results[0];
        var sMessage = aData?.Message;
        var sMessageType = aData?.Msgty;

        if (sMessageType === "E") {
          MessageBox.error(sMessage);
          return true;
        }

        return false;
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
          Rettifica: false,
          Annullamento: false,
          InvioFirma: false,
          RevocaInvioFirma: false,
          Firma: false,
          Richiamo: false,
          RegRichiestaAnn: false,
          CancRichiestaAnn: false
        };

        oAuthModel.read("/ZES_CONIAUTH_SET", {
          filters: aFilters,
          success: async function (data) {
            var aData = data.results;
            oAuth.AgrName = aData[0].AGR_NAME;
            oAuth.Fikrs = aData[0].FIKRS;
            oAuth.Prctr = aData[0].PRCTR;
            oAuth.Copia = self._isUserAuthorized(aData, "ACTV_4", "Z10");
            oAuth.Registra = self._isUserAuthorized(aData, "ACTV_1", "Z01");
            oAuth.Dettaglio = self._isUserAuthorized(aData, "ACTV_3", "Z03");
            oAuth.Rettifica = self._isUserAuthorized(aData, "ACTV_2", "Z02");
            oAuth.Annullamento = self._isUserAuthorized(aData, "ACTV_4", "Z07");
            oAuth.InvioFirma = self._isUserAuthorized(aData, "ACTV_4", "Z04");
            oAuth.RevocaInvioFirma = self._isUserAuthorized(aData, "ACTV_4", "Z05");
            oAuth.Firma = self._isUserAuthorized(aData, "ACTV_4", "Z06");
            oAuth.Richiamo = self._isUserAuthorized(aData, "ACTV_4", "Z17");
            oAuth.RegRichiestaAnn = self._isUserAuthorized(aData, "ACTV_4", "Z08");
            oAuth.CancRichiestaAnn = self._isUserAuthorized(aData, "ACTV_4", "Z09");
            self.setModel(new JSONModel(oAuth), "AuthorityCheck");

            if (bNavTo) {
              var sUserRole = await self._getUserRole()
              switch (sUserRole) {
                case "A": {
                  self.getRouter().navTo("amm.home")
                  break;
                }
                case "R": {
                  self.getRouter().navTo("rag.home")
                  break;
                }
              }
            }
          },
          error: function (error) {
            self.setModel(new JSONModel(oAuth), "AuthorityCheck");
          },
        });
      },

      _getUserRole: async function () {
        var self = this;
        var oModel = self.getModel()

        var sKey = oModel.createKey("/ControlloAppSet", {
          App: ""
        })
        self.getView().setBusy(true)
        return new Promise(async function (resolve, reject) {
          await oModel.read(sKey, {
            success: function (data, oResponse) {
              self.getView().setBusy(false);
              resolve(data.App);
            },
            error: function (e) {
              self.getView().setBusy(false);
              reject(e);
            },
          });
        });

      },

      _createModelPermissions: async function () {
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

        self.getView().setBusy(true)
        return new Promise(async function (resolve, reject) {
          await oAuthModel.read("/ZES_CONIAUTH_SET", {
            filters: aFilters,
            success: async function (data) {
              var aData = data.results;
              oAuth.AgrName = aData[0].AGR_NAME;
              oAuth.Fikrs = aData[0].FIKRS;
              oAuth.Prctr = aData[0].PRCTR;
              oAuth.Copia = self._isUserAuthorized(aData, "ACTV_4", "Z10");
              oAuth.Registra = self._isUserAuthorized(aData, "ACTV_1", "Z01");
              oAuth.Dettaglio = self._isUserAuthorized(aData, "ACTV_3", "Z03");
              resolve(oAuth)
              self.getView().setBusy(false)
            },
            error: function (error) {
              self.getView().setBusy(false)
              self.setModel(new JSONModel(oAuth), "AuthorityCheck");
            },
          });
        })
      },

      checkPermissions: async function (sRole, sPermission = "") {
        var self = this;
        var sUserRole = await self._getUserRole()
        var oPermissions = await self._createModelPermissions()
        var sHome = sUserRole === 'A' ? "amm.home" : "rag.home";
        var sMessage = sRole === 'A' ? "Amministrazione" : "Ragioneria";

        if (sUserRole !== sRole) {
          MessageBox.error("Utente non abilitato per '" + sMessage + "'", {
            onClose: function () {
              self.getRouter().navTo(sHome)
            }
          })
          return;
        }

        if (sPermission) {
          switch (sPermission) {
            case "Registra": {
              if (!oPermissions.Registra) {
                MessageBox.error("Utente non abilitato per la 'Registrazione'", {
                  onClose: function () {
                    self.getRouter().navTo(sHome)
                  }
                })
              }
              break;
            }
            case "Copia": {
              if (!oPermissions.Copia) {
                MessageBox.error("Utente non abilitato per la 'Copia'", {
                  onClose: function () {
                    self.getRouter().navTo(sHome)
                  }
                })
              }
              break;
            }
            case "Dettaglio": {
              if (!oPermissions.Dettaglio) {
                MessageBox.error("Utente non abilitato per il 'Dettaglio'", {
                  onClose: function () {
                    self.getRouter().navTo(sHome)
                  }
                })
              }
              break;
            }
          }
        }
      },

      _isUserAuthorized: function (array, param, value) {
        return array.filter((x) => x[param] === value).length > 0;
      },

      getUfficio: function () {
        var self = this;
        var oModel = self.getModel();
        var sKey = oModel.createKey("/UserParamSet", {
          Parid: "/PRA/PN_DN_FUNC_AREA",
        });
        self.getView().setBusy(true);
        return new Promise(async function (resolve, reject) {
          await oModel.read(sKey, {
            success: function (data, oResponse) {
              self.getView().setBusy(false);
              if (self.hasResponseError(oResponse)) return;
              resolve(data.Parva);
            },
            error: function (e) {
              self.getView().setBusy(false);
              reject(e);
            },
          });
        });
      },

      getBukrs: function () {
        var self = this;
        var oModel = self.getModel();
        var sKey = oModel.createKey("/UserParamSet", {
          Parid: "BUK",
        });
        self.getView().setBusy(true);
        return new Promise(async function (resolve, reject) {
          await oModel.read(sKey, {
            success: function (data, oResponse) {
              self.getView().setBusy(false);
              if (self.hasResponseError(oResponse)) return;
              resolve(data.Parva);
            },
            error: function (e) {
              self.getView().setBusy(false);
              reject(e);
            },
          });
        });
      },

      getPrc: function () {
        var self = this;
        var oModel = self.getModel();
        var sKey = oModel.createKey("/UserParamSet", {
          Parid: "PRC",
        });
        self.getView().setBusy(true);
        return new Promise(async function (resolve, reject) {
          await oModel.read(sKey, {
            success: function (data, oResponse) {
              self.getView().setBusy(false);
              if (self.hasResponseError(oResponse)) return;
              resolve(data.Parva);
            },
            error: function (e) {
              self.getView().setBusy(false);
              reject(e);
            },
          });
        });
      },

      getTvarvcValue: function (sName) {
        var self = this;
        var oModel = self.getModel();
        var sKey = oModel.createKey("/TvarvcValueSet", {
          Name: sName,
        });
        self.getView().setBusy(true);
        return new Promise(async function (resolve, reject) {
          await oModel.read(sKey, {
            success: function (data, oResponse) {
              self.getView().setBusy(false);
              resolve(data.Low);
            },
            error: function (e) {
              self.getView().setBusy(false);
              reject(e);
            },
          });
        });
      },

      //#region ------------------------------LOG-------------------------------

      onLog: function () {
        var self = this;
        var oDialog = self.loadFragment("gestionesop.view.fragment.amm.table.TableLog");

        oDialog.open();
      },

      onCloseLog: function () {
        var self = this;
        var oDialog = sap.ui.getCore().byId("dlgLog");
        oDialog.close();
        self.unloadFragment();
      },

      onExportLog: function () {

        var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

        var oTable = sap.ui.getCore().byId("tblLog");
        var oTableModel = oTable.getModel("Log");

        var aCols = [
          {
            label: oBundle.getText("labelMessageType"),
            property: "Msgty",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelMessageId"),
            property: "Msgid",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelMessageNumber"),
            property: "Msgno",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelMessageText"),
            property: "Message",
            type: EDM_TYPE.String,
          },
        ];

        var oSettings = {
          workbook: {
            columns: aCols,
          },
          dataSource: oTableModel.getData(),
          fileName: "Lista Log.xlsx",
        };

        var oSheet = new Spreadsheet(oSettings);
        oSheet.build().finally(function () {
          oSheet.destroy();
        });
      },

      managementLogDeep: function (aMessage) {
        var self = this;
        var oModelUtility = self.getModel("Utility");
        var aMessageFormatted = [];

        if (aMessage.length === 1) {
          self.resetLog()
          MessageBox.error(aMessage[0]?.Body?.Message);
          return;
        }

        aMessage.map((oMessage) => {
          aMessageFormatted.push({
            Msgid: oMessage?.Body?.Msgid,
            Msgty: oMessage?.Body?.Msgty,
            Msgno: oMessage?.Body?.Msgno,
            Message: oMessage?.Body?.Message,
          });
        });

        oModelUtility.setProperty("/isLogVisible", true);
        self.setModel(new JSONModel(aMessageFormatted), "Log");
        MessageBox.error("Operazione non eseguita correttamente");
      },

      managementLogFI: function (aMessage) {
        var self = this;
        var oModelUtility = self.getModel("Utility");

        aMessage.map((oMessage) => {
          if (oMessage.Msgno === "084") {
            oMessage.Message = "Valorizzare almeno un campo tra Codice fiscale e Identificativo fiscale estero"
          }
        })

        if (aMessage.length === 1) {
          self.resetLog()
          MessageBox.error(aMessage[0]?.Message);
          return;
        }

        oModelUtility.setProperty("/isLogVisible", true);
        self.setModel(new JSONModel(aMessage), "Log");
        MessageBox.error("Operazione non eseguita correttamente");
      },

      onSearchField: function (oEvent) {
        var aFilters = [];
        var sQuery = oEvent.getSource().getValue();
        if (sQuery && sQuery.length > 0) {
          var filter = new Filter("Message", FilterOperator.Contains, sQuery);
          aFilters.push(filter);
        }

        var oTable = sap.ui.getCore().byId("tblLog")
        var oBinding = oTable.getBinding("items");
        oBinding.filter(aFilters, "Application");
      },
      //#endregion ---------------------------LOG---------------------------------

      //#region ------------------------------GESTIONE LOCK---------------------

      oDataCreateLock: async function (sEntitySet, sMethod, oEntry) {
        BusyIndicator.show(0);
        var oModel = this.getView().getModel("oDataLock");
        return new Promise(function (resolve, reject) {
          oModel.callFunction(sEntitySet, {
            method: sMethod,
            urlParameters: oEntry,
            success: function (oData, oResponse) {
              resolve(oResponse);
              BusyIndicator.hide();
            },
            error: function (e) {
              MessageBox.error("Backend Connection Error");
              reject(e);
              BusyIndicator.hide();
            },
          });
        });
      },

      lockSop: async function (oSop) {
        // return
        var self = this;
        var oModelUtility = self.getModel("Utility")
        await this.oDataCreateLock("/StartSoftState", "GET");

        var sConcat = oSop.Zchiavesop + oSop.Bukrs
        var oEntry = {
          Tabname: "ZFSOSPESI",
          Varkey: sConcat
        }

        var oResponse = await this.oDataCreateLock("/Lock", "POST", oEntry)
        if (oResponse.data.Type === 'E') {
          MessageBox.error(oResponse.data.Message)
          oModelUtility.setProperty("/RemoveFunctionButtons", true)
        }
        return oResponse
      },

      unlockSop: async function () {
        var self = this;
        var oSop = self.getModel("Sop").getData()

        var sConcat = oSop.Zchiavesop + oSop.Bukrs
        var oEntry = {
          Tabname: "ZFSOSPESI",
          Varkey: sConcat
        }

        await this.oDataCreateLock("/Unlock", "POST", oEntry);
        await this.oDataCreateLock("/StopSoftState", "GET");
      },
      //#endregion ---------------------------GESTIONE LOCK---------------------

      createModelWF: function () {
        var self = this;
        var oModel = self.getModel();
        var oSop = self.getModel("Sop")?.getData()
        var aFilters = [];

        self.setFilterEQ(aFilters, "Esercizio", oSop.Gjahr);
        self.setFilterEQ(aFilters, "Bukrs", oSop.Bukrs);
        self.setFilterEQ(aFilters, "Zchiavesop", oSop.Zchiavesop);

        self.getView().setBusy(true)
        oModel.read("/WfSopSet", {
          filters: aFilters,
          success: function (data) {
            self.getView().setBusy(false)
            self.setModel(new JSONModel(data.results), "WFSop");
          },
        });
      },
    });
  }
);
