import Vue from "vue";
import Vuex from "vuex";

import roles from "./store/roles";
import users from "./store/users";
import people from "./store/people";
import register_types from "./store/register_types";
import registration_types from "./store/registration_types";
import studies from "./store/studies";
import marriage_regimes from "./store/marriage_regimes";
import countries from "./store/countries";
import deed_locations from "./store/deed_locations";


import _ from "lodash";
import moment from "moment";





Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [],
  state: {
    meta: {
      deed_locations,
      roles,
      users,
      people,
      register_types,
      registration_types,
      studies,
      marriage_regimes,
      countries
    },
    data: {
      deeds: [],
      consultations: [],
      messages: [],
      emails: []
    },
    state: {
      user: null,
      study: null
    },
    switches: {
      study: false,
      user: false
    },
    settings: {
      rpp: 5,
      action_button_type: 1, // 1: 'smart button', 2: 1 icoon met dropdown, 3: aparte iconen per actie
      select_search_info_position: 1, // 1: within dropdown, 2: underneath, 3: both
      enable_additional_registration: true,
      allow_all_notaries_for_support: false,
      allow_multiple_registrations: true,
      consultation_history_enabled: true,
      consultation_register_checkboxes: false,
      enable_versioning_of_registrations: true
    },
    notifications: {
      id: 0,
      messages: []
    }
  },
  getters: {
    meta: (state) => (type, id) => {
      return state.meta[type].find((o) => o.id === id);
    },
    consultation: (state) => (id) => {
      let results = _.filter(state.data.consultations, function(c) { 
        return parseInt(c.consultation_id) === parseInt(id) &&
          (parseInt(state.state.user.role_id) === 3 || (c.study.type === 'be' && parseInt(state.state.user.study_id) === parseInt(c.study.be.id)))
      });
      if(results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    },
    deed: (state) => (id) => {
      let results = _.filter(state.data.deeds, function(d) { 
        return parseInt(d.deed_id) === parseInt(id) &&
        (parseInt(state.state.user.role_id) === 3 || (d.study.type === 'be' && parseInt(state.state.user.study_id) === parseInt(d.study.be.id)))
      
      });
      if(results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    }
  },
  mutations: {
    markRead(state, message) {
      state.data.messages = _.map(state.data.messages, function(m) {
        if (m.id === message.id && m.read === false) {
          m.read = true
        }
        return m;
      });
    },
    addNotification(state, message) {
      let m = _.merge({}, { id: state.notifications.id++ }, message);
      state.notifications.messages.push(m);

      setTimeout(function () {
        state.notifications.messages.splice(m, 1);
      }, 3000);
    },
    sendEmail(state, email) {
      let self = this;
      state.data.emails.unshift(
        _.merge({}, {
          id: state.data.emails.length + 1,
          sent: new Date(),
          user: _.cloneDeep(state.state.user)
        }, email) 
      );
    },
    addConsultation(state, consultation) {
      consultation.consultation_id = state.data.consultations.length + 1;
      consultation.user = _.cloneDeep(state.state.user);
      switch (consultation.study.type) {
        case "be":
          consultation.study.be = _.cloneDeep(state.state.study);
          consultation.study.foreign = null;
          break;
        case "foreign":
        case "other":

        default:
        // do nothing...
      }

      let results = _.filter(_.cloneDeep(state.data.deeds), function (deed) {
        let acts = _.filter(_.cloneDeep(deed.acts), function (a) {
          let test = (
            consultation.registers.includes(a.register) &&
            _.map(a.data.declarers, function (d) {
              return d.id;
            }).includes(consultation.person.id)
          );

          if(test && a.register === 2 && consultation.partner !== null && consultation.partner.id !== null) {
            // extra test dat partner ook moet voorkomen...
            test = _.map(a.data.declarers, function (d) {
              return d.id;
            }).includes(consultation.partner.id)
          }

          return test;



        });
        return acts.length > 0;
      });

      consultation.results = _.map(results, function (r) {
        r.acts = _.filter(_.cloneDeep(r.acts), function (a) {
          let test = (
            consultation.registers.includes(a.register) &&
            _.map(a.data.declarers, function (d) {
              return d.id;
            }).includes(consultation.person.id)
          );

          if(test && a.register === 2 && consultation.partner !== null && consultation.partner.id !== null) {
            // extra test dat partner ook moet voorkomen...
            test = _.map(a.data.declarers, function (d) {
              return d.id;
            }).includes(consultation.partner.id)
          }

          return test;
        });

        r.declarers = [];
        r.registers = [];
  
        _.each(r.acts, function (a) {
          _.each(a.data.declarers, function (d) {
            r.declarers.push(d);
          });
  
          r.registers.push(
            _.filter(state.meta.register_types, function (el) {
              return el.id === a.register;
            })[0]
          );
        });
        r.declarers = _.uniqBy(r.declarers, "rrn");
        r.registers = _.uniqBy(r.registers, "id");

        return r;
      });

      state.data.consultations.push(consultation);
    },
    addDeed(state, deed) {
      deed.deed_id = state.data.deeds.length + 1;
      deed.user = state.state.user;
      switch (deed.study.type) {
        case "be":
          deed.study.be = state.state.study;
          deed.study.foreign = null;
          break;
        case "foreign":
        case "other":

        default:
        // do nothing...
      }

      // generate references for the acts...
      deed.acts = _.map(deed.acts, function (a) {
        a.reference = moment().format("YYYYMMDD-HHmmss-SSS-") + a.act_id;
        a.cancelled_at = null;
        return a;
      });

      // generate registers cache...
      deed.declarers = [];
      deed.registers = [];

      deed.naban = 'NAP-' + moment().format("YYYYMMDD-HHmmss-SSS");

      _.each(deed.acts, function (a) {
        _.each(a.data.declarers, function (d) {
          deed.declarers.push(d);
        });

        deed.registers.push(
          _.filter(state.meta.register_types, function (el) {
            return el.id === a.register;
          })[0]
        );
      });
      deed.declarers = _.uniqBy(deed.declarers, "rrn");
      deed.registers = _.uniqBy(deed.registers, "id");

      deed.staging = [];
      // push myself to the staging...
      deed.staging.push({
        type: "creation",
        status: "promoted",
        deed: _.cloneDeep(deed),
        created: moment().format("YYYY-MM-DD HH:mm:ss")
      });

      state.data.deeds.push(deed);

      // Let's add a message for new users...
      _.each(deed.acts, function(a) {
        if(a.register === 1) {
          // new act for CRT
          _.each(a.data.declarers, function(d) {
            if(d.dod !== null) {
              let consultations = _.filter(state.data.consultations, function(c) {
                return c.person.id === d.id && c.registers.includes(1);
              });

              let uniqueUsers = _.uniq(_.map(consultations, function(c) { return c.user.id}));

              _.each(uniqueUsers, function(u) {
                let c = _.findLast(consultations, function(c) {
                  return c.user.id === u
                });
                state.data.messages.push({
                  id: state.data.messages.length + 1,
                  read: false,
                  user: c.user,
                  message: 'crt_after_consultation_of_deceased',
                  payload: {
                    consultation: c,
                    deceased: d
                  }
                });

                // and let's add the email too...
                state.data.emails.unshift(
                  {
                    id: state.data.emails.length + 1,
                    sent: new Date(),
                    user: c.user,
                    to: c.user,
                    type: 'crt_after_consultation',
                    payload: {
                      consultation: c,
                      deceased: d
                    },
                    subject: {
                      reference: c.reference
                    }
                  } 
                );
              });

            }
          })
        }
      });
    },
    promote(state, deed) {
      let staging = _.cloneDeep(deed.staging);
      let newdeed = _.cloneDeep(
        _.first(
          _.filter(deed.staging, function (s) {
            return s.status === "pending";
          })
        ).deed
      );
      newdeed.user = _.cloneDeep(deed.user); // creation user
      newdeed.staging = _.map(staging, function (s) {
        if (s.status === "pending") {
          s.status = "promoted";
          s.approver = state.state.user;
        }
        return s;
      });

      // update the item in our state...
      state.data.deeds[
        state.data.deeds.indexOf(
          _.first(
            _.filter(state.data.deeds, function (d) {
              return d.deed_id === deed.deed_id;
            })
          )
        )
      ] = newdeed;
    },
    reject(state, deed) {
      state.data.deeds[
        state.data.deeds.indexOf(
          _.first(
            _.filter(state.data.deeds, function (d) {
              return d.deed_id === deed.deed_id;
            })
          )
        )
      ].staging = _.map(
        state.data.deeds[
          state.data.deeds.indexOf(
            _.first(
              _.filter(state.data.deeds, function (d) {
                return d.deed_id === deed.deed_id;
              })
            )
          )
        ].staging,
        function (s) {
          if (s.status === "pending") {
            s.status = "rejected";
            s.approver = state.state.user;
          }
          return s;
        }
      );
    },
    stageDeed(state, deed) {
      deed.user = state.state.user;
      switch (deed.study.type) {
        case "be":
          deed.study.be = state.state.study;
          deed.study.foreign = null;
          break;
        case "foreign":
        case "other":

        default:
        // do nothing...
      }

      // generate references for the acts...
      deed.acts = _.map(deed.acts, function (a) {
        a.reference =
          a.reference || moment().format("YYYYMMDD-HHmmss-SSS-") + a.act_id;
        a.cancelled_at = a.cancelled_at || null;
        return a;
      });

      // generate registers cache...
      deed.declarers = [];
      deed.registers = [];

      _.each(deed.acts, function (a) {
        _.each(a.data.declarers, function (d) {
          deed.declarers.push(d);
        });

        deed.registers.push(
          _.filter(state.meta.register_types, function (el) {
            return el.id === a.register;
          })[0]
        );
      });
      deed.declarers = _.uniqBy(deed.declarers, "rrn");
      deed.registers = _.uniqBy(deed.registers, "id");

      deed.staging = [];

      state.data.deeds[
        state.data.deeds.indexOf(
          _.first(
            _.filter(state.data.deeds, function (d) {
              return d.deed_id === deed.deed_id;
            })
          )
        )
      ].staging.push({
        type: "correct",
        status: "pending",
        deed: _.cloneDeep(deed),
        created: moment().format("YYYY-MM-DD HH:mm:ss")
      });
    },

    removeTestData(state) {
      state.data.deeds = [];
      state.data.consultations = [];
      state.data.messages = [];
      state.data.emails = [];
    },
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem("deeds")) {
        state.data = _.merge(
          {},
          state.data,
          JSON.parse(localStorage.getItem("deeds"))
        );
      }
      if (localStorage.getItem("settings")) {
        state.settings = _.merge(
          {},
          state.settings,
          JSON.parse(localStorage.getItem("settings"))
        );
      }
      if (localStorage.getItem("context")) {
        state.state = _.merge(
          {},
          state.state,
          JSON.parse(localStorage.getItem("context"))
        );
      }
    },
    state_user(state, user) {
      state.state.user = user;
      if (state.state.user === null) {
        state.state.study = null;
      } else {
        state.state.study = _.filter(state.meta.studies, function (s) {
          return s.id === user.study_id;
        })[0];
      }
    },
    state_study(state, study) {
      state.state.study = _.filter(state.meta.studies, function (s) {
        return s.id === study.id;
      })[0];
      state.switches.study = false;
    },
    setting(state, setting) {
      state.settings = _.merge({}, state.settings, setting);
    },
    switch(state, sw) {
      state.switches[sw] = !state.switches[sw];
    }
  }
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  console.debug(state);
  localStorage.setItem("deeds", JSON.stringify(state.data));
  localStorage.setItem("settings", JSON.stringify(state.settings));
  localStorage.setItem("context", JSON.stringify(state.state));
});

export default store;
