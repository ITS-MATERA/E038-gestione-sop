sap.ui.define(
  ["./BaseAmministrazioneController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../model/formatter"],
  function (BaseAmministrazioneController, Filter, FilterOperator, JSONModel, formatter) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.InputSop", {
      formatter: formatter,

      onInit: function () {
        var self = this;

        self.acceptOnlyNumber("iptNumProvvedimento");
        self.acceptOnlyTotChar("cbxGjahr", 4);
        self.noWrite("cbxZtipoprovv")
        self.noWrite("cbxZautemit")

        this.getRouter().getRoute("amm.inputSop").attachPatternMatched(this._onObjectMatched, this);

        var oModelFirstSop = new JSONModel({
          Gjahr: "",
          Zragdest: "",
          Zzamministr: "",
          Fipos: "",
          Fistl: "",
          Zgeber: "",
          ZufficioCont: "",
          Descufficio: "",
          Zfunzdel: "",
          Zdescriz: "",
          Ztipoprovv: "",
          Zautemit: "",
          Zdataprovv: null,
          Znprovv: "",
          Zcausale: "",
          ZztipologiaSop: "",
          DescTipologia: "",
          IdAutorizzazione: {}
        });

        self.setModel(oModelFirstSop, "FirstSop");

      },

      onNavBack: function () {
        var self = this;
        self.getRouter().navTo("amm.selectType");
        self.resetPreWizard()
      },

      _onObjectMatched: async function (oEvent) {
        var self = this;
        self.checkPermissions("A", "Registra")
        var oModel = self.getModel();
        var oArguments = oEvent.getParameter("arguments");
        var oModelFirstSop = self.getModel("FirstSop")

        if (oArguments.Reset === "true") {
          var oModelFirstSop = new JSONModel({
            Gjahr: "",
            Zragdest: "",
            Zzamministr: "",
            Fipos: "",
            Fistl: "",
            Zgeber: "",
            ZufficioCont: "",
            Descufficio: "",
            Zfunzdel: "",
            Zdescriz: "",
            Ztipoprovv: "",
            Zautemit: "",
            Zdataprovv: null,
            Znprovv: "",
            Zcausale: "",
            ZztipologiaSop: "",
            DescTipologia: ""
          });

          self.setModel(oModelFirstSop, "FirstSop");
        }

        if (!self.getModel("AuthorityCheck")) {
          self.getPermissionSop();
        }

        this._sTypeSop = oArguments.type;

        self.getView().setBusy(true);
        oModel.read("/UserParamSet('PRC')", {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            if (self.hasResponseError(oResponse)) return;
            oModelFirstSop.setProperty("/Zzamministr", data.Parva);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });



        this._setDataUfficio();
      },

      onValueHelpRagioneria: function () {
        var self = this;
        var oModelRagioneria = self.getModel("ZSS4_CO_GEST_TIPOLOGICHE_SRV");
        var oFirstSop = self.getModel("FirstSop").getData();
        var oModel = self.getModel();
        var aFilters = [];
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.Ragioneria");

        var dCurrentDate = new Date();
        var sCurrentDate = dCurrentDate.getFullYear().toString() + (dCurrentDate.getMonth() + 1).toString() + dCurrentDate.getDate().toString();

        self.setFilterEQ(aFilters, "ANNO", oFirstSop.Gjahr);
        self.setFilterEQ(aFilters, "FASE", "GEST");
        self.setFilterEQ(aFilters, "LOEKZ", "");
        aFilters.push(new Filter("DATBIS", FilterOperator.GE, sCurrentDate));
        aFilters.push(new Filter("DATAB", FilterOperator.LE, sCurrentDate));
        self.setFilterEQ(aFilters, "MC", "X");
        self.setFilterEQ(aFilters, "REALE", "R");

        oModel.read("/UserParamSet('FIK')", {
          success: function (data) {
            self.setFilterEQ(aFilters, "FIKRS", data.Parva);
          },
          error: function () { },
        });

        self.getView().setBusy(true);

        oModelRagioneria.read("/ZES_RAGIONERIA_SET", {
          filters: aFilters,
          success: function (data) {
            self.getView().setBusy(false);
            var aData = data.results;
            var aRagioneria = [];
            aData.map((oData) =>
              aRagioneria.push({
                Zragdest: oData.CODICE_RAGIONERIA,
                // Description: oData.DESCR_ESTESA,
              })
            );
            var oModelJson = new JSONModel();
            oModelJson.setData(aRagioneria);
            var oSelectDialog = sap.ui.getCore().byId("sdRagioneria");
            oSelectDialog?.setModel(oModelJson, "Ragioneria");
            oDialog.open();
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onValueHelpRagioneriaClose: function (oEvent) {
        var self = this;
        var FirstSop = self.getModel("FirstSop");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        FirstSop.setProperty("/Zragdest", self.setBlank(oSelectedItem?.getTitle()));
        self.unloadFragment();
      },

      // onValueHelpIdAutorizzazione: function () {
      //   var self = this;
      //   var oModel = self.getModel();
      //   var oFirstSop = self.getModel("FirstSop").getData();
      //   var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.IdAutorizzazione");

      //   var aFilters = [];

      //   self.setFilterEQ(aFilters, "Anno", oFirstSop.Gjahr);
      //   self.setFilterEQ(aFilters, "Fipos", oFirstSop.Fipos);
      //   self.setFilterEQ(aFilters, "Fistl", oFirstSop.Fistl);

      //   self.getView().setBusy(true);
      //   oModel.read("/IdAutorizzazioneSet", {
      //     filters: aFilters,
      //     success: function (data) {
      //       self.getView().setBusy(false);
      //       self.setModelDialog("IdAutorizzazione", data, "sdIdAutorizzazione", oDialog);
      //     },
      //     error: function () {
      //       self.getView().setBusy(false);
      //     },
      //   });
      // },

      // onValueHelpIdAutorizzazioneClose: function (oEvent) {
      //   var self = this;
      //   var oModelFirstSop = self.getModel("FirstSop");
      //   var oSelectedItem = oEvent.getParameter("selectedItem");

      //   oModelFirstSop.setProperty("/Zgeber", self.setBlank(oSelectedItem?.getTitle()));
      //   self.unloadFragment();
      // },

      onCreateCausale: function () {
        var self = this;
        var oModelFirstSop = self.getModel("FirstSop");
        var oFirstSop = oModelFirstSop.getData();

        var sDescZtipoprovv = self.getView().byId("cbxZtipoprovv")?.getSelectedItem()?.getText();
        var sDescZautemit = self.getView().byId("cbxZautemit")?.getSelectedItem()?.getText();

        if (oFirstSop.Ztipoprovv && oFirstSop.Zautemit && oFirstSop.Zdataprovv && oFirstSop.Znprovv) {
          var sZtipoprov = sDescZtipoprovv.slice(0, 4);
          var sZautemit = sDescZautemit.slice(0, 4);
          var sZdataprovv = formatter.dateToString(oFirstSop.Zdataprovv);

          oModelFirstSop.setProperty("/Zcausale", sZtipoprov + " " + sZautemit + " " + sZdataprovv + " " + oFirstSop.Znprovv);
        } else {
          oModelFirstSop.setProperty("/Zcausale", "");
        }
      },

      onEsercizioChange: function (oEvent) {
        this._setDataUfficio();
      },

      onUfficioChange: function () {
        this._setDataUfficio(true);
      },

      onNavForward: async function () {
        var self = this;
        var sSceltaOperativa = self.getView().byId("rbSceltaOperativa").getSelectedIndex();
        var oFirstSop = self.getModel("FirstSop").getData();

        if (oFirstSop.Zfunzdel) {
          sSceltaOperativa = 1
        }

        var oParameters = {
          Gjahr: oFirstSop.Gjahr,
          Zragdest: oFirstSop.Zragdest,
          Zzamministr: oFirstSop.Zzamministr,
          Fipos: oFirstSop.Fipos,
          Fistl: oFirstSop.Fistl,
          Zgeber: this._setZgeber(),
          ZufficioCont: oFirstSop.ZufficioCont,
          Zfunzdel: oFirstSop.Zfunzdel,
          Ztipoprovv: oFirstSop.Ztipoprovv,
          Zautemit: oFirstSop.Zautemit,
          Zdataprovv: oFirstSop.Zdataprovv?.toString(),
          Znprovv: oFirstSop.Znprovv,
          Zcausale: oFirstSop.Zcausale,
          TypeSop: this._sTypeSop,
          ZztipologiaSop: oFirstSop.ZztipologiaSop,
          DescTipologia: oFirstSop.DescTipologia,
          Zprovgiud: this._setProvvedimento()
        };

        var bCheck = await this._checkFirstSop();

        if (!bCheck) {
          return;
        }

        if (this._sTypeSop === "1" && sSceltaOperativa === 0) {
          self.getRouter().navTo("amm.create.scenary1", oParameters);
        }
        if (this._sTypeSop === "1" && sSceltaOperativa === 1) {
          self.getRouter().navTo("amm.create.scenary2", oParameters);
        }
        if (this._sTypeSop === "2" && sSceltaOperativa === 0) {
          self.getRouter().navTo("amm.create.scenary3", oParameters);
        }
        if (this._sTypeSop === "2" && sSceltaOperativa === 1) {
          self.getRouter().navTo("amm.create.scenary4", oParameters);
        }
      },

      _setDataUfficio: async function (bMessageError = false) {
        var self = this;
        var oModel = self.getModel();
        var oModelFirstSop = self.getModel("FirstSop");
        var oFirstSop = oModelFirstSop.getData();

        if (!oFirstSop.Gjahr) {
          oModelFirstSop.setProperty("/ZufficioCont", "");
          oModelFirstSop.setProperty("/Descufficio", "");
          oModelFirstSop.setProperty("/Zfunzdel", "");
          oModelFirstSop.setProperty("/Zdescriz", "");
          oModelFirstSop.setProperty("/ZztipologiaSop", "");
          oModelFirstSop.setProperty("/DescTipologia", "");
          return;
        }

        if (!oFirstSop.ZufficioCont) {
          oModelFirstSop.setProperty("/ZufficioCont", await self.getUfficio());
        }

        var sKey = oModel.createKey("/UfficioPreWizardSet", {
          Gjahr: oFirstSop.Gjahr,
          ZufficioCont: oModelFirstSop.getProperty("/ZufficioCont"),
        });

        self.getView().setBusy(true);

        oModel.read(sKey, {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            oModelFirstSop.setProperty("/Descufficio", self.setBlank(data.Descufficio));
            oModelFirstSop.setProperty("/Zfunzdel", self.setBlank(data.Zfunzdel));
            oModelFirstSop.setProperty("/Zdescriz", self.setBlank(data.Zdescriz));
            oModelFirstSop.setProperty("/ZztipologiaSop", self.setBlank(data.ZztipologiaSop));
            oModelFirstSop.setProperty("/DescTipologia", self.setBlank(data.DescTipologia));
            if (bMessageError) {
              if (self.hasResponseError(oResponse)) {
                oModelFirstSop.setProperty("/ZufficioCont", "");
                oModelFirstSop.setProperty("/Descufficio", "");
                oModelFirstSop.setProperty("/Zfunzdel", "");
                oModelFirstSop.setProperty("/Zdescriz", "");
                oModelFirstSop.setProperty("/ZztipologiaSop", "");
                oModelFirstSop.setProperty("/DescTipologia", "");
              }

            }

          },
        });
      },

      _checkFirstSop: function () {
        var self = this;
        var oModel = self.getModel();
        var oFirstSop = self.getModel("FirstSop").getData();
        var oAuthorityCheck = self.getModel("AuthorityCheck").getData();

        var oParameters = {
          AgrName: oAuthorityCheck.AgrName,
          Fikrs: oAuthorityCheck.Fikrs,
          Prctr: oAuthorityCheck.Prctr,
          Fipos: oFirstSop.Fipos,
          Fistl: oFirstSop.Fistl,
          Gjahr: oFirstSop.Gjahr,
          Zautemit: oFirstSop.Zautemit,
          Zcausale: oFirstSop.Zcausale,
          Zdataprovv: oFirstSop.Zdataprovv ? formatter.dateToString(oFirstSop.Zdataprovv) : "",
          Zfunzdel: oFirstSop.Zfunzdel,
          Zgeber: this._setZgeber(),
          Znprovv: oFirstSop.Znprovv,
          Zragdest: oFirstSop.Zragdest,
          Ztipoprovv: oFirstSop.Ztipoprovv,
          ZufficioCont: oFirstSop.ZufficioCont,
          Zzamministr: oFirstSop.Zzamministr,
        };

        return new Promise(async function (resolve, reject) {
          self.getView().setBusy(true);
          await oModel.callFunction("/CheckPreWizardAmm", {
            method: "GET",
            urlParameters: oParameters,
            success: function (data) {
              self.getView().setBusy(false);
              resolve(self.hasMessageError(data) ? false : true);
            },
            error: function (error) {
              self.getView().setBusy(false);
              reject(error);
            },
          });
        });
      },

      onFiposChange: function (oEvent) {
        var self = this;

        var oModelFirstSop = self.getModel("FirstSop")
        oModelFirstSop.setProperty("/Fipos", oEvent.getParameter("value"))
      },

      onFistlChange: function (oEvent) {
        var self = this;


        var oModelFirstSop = self.getModel("FirstSop")
        oModelFirstSop.setProperty("/Fistl", oEvent.getParameter("value"))
      },

      onAmministrazioneChange: function (oEvent) {
        var self = this

        var oModelFirstSop = self.getModel("FirstSop")
        oModelFirstSop.setProperty("/Zzamministr", oEvent.getParameter("value"))
      },

      _setProvvedimento: function () {
        var self = this;
        var oFirstSop = self.getModel("FirstSop").getData();

        var sDescZtipoprovv = self.getView().byId("cbxZtipoprovv")?.getSelectedItem()?.getText();
        var sDescZautemit = self.getView().byId("cbxZautemit")?.getSelectedItem()?.getText();
        var sZdataprovv = formatter.dateToString(oFirstSop.Zdataprovv);

        var sProvvedimento = sDescZtipoprovv + " " + sDescZautemit + " " + sZdataprovv + " " + oFirstSop.Znprovv
        return sProvvedimento
      },

      _setZgeber: function () {
        var self = this;
        var oFirstSop = self.getModel("FirstSop").getData();
        var oIdAutorizzazione = oFirstSop.IdAutorizzazione

        if (oIdAutorizzazione?.TYPE && oIdAutorizzazione?.ZZNUMERO && oIdAutorizzazione?.ZZANNO) {
          return oIdAutorizzazione.TYPE + "-" + oIdAutorizzazione.ZZNUMERO + "-" + oIdAutorizzazione.ZZANNO
        }
      }
    });
  }
);
