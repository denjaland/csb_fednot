import Vue from "vue";
import Router from "vue-router";

import Home from "./modules/crf/registrations/index";
import ConsultIndex from "./modules/crf/consultations/index";
import ConsultCreate from "./modules/crf/consultations/create";
import ConsultView from "./modules/crf/consultations/view";
import ConsultViewDeed from "./modules/crf/consultations/view-deed-one";
import NewInscription from "./modules/crf/registrations/create";
import ViewRegistration from "./modules/crf/registrations/view";
import EditRegistration from "./modules/crf/registrations/edit";
import CapConsultIndex from "./modules/cpc/consultations/index";
import CapConsultCreate from "./modules/cpc/consultations/create";

Vue.use(Router);

const routes = [
  { path: "/", redirect: "/nl/crf/registrations" },
  { path: "/:locale", redirect: "/:locale/crf/registrations"},

  { path: "/:locale/crf", redirect: "/:locale/crf/registrations"},
  { path: "/:locale/crf/registrations", component: Home },
  { path: "/:locale/crf/registrations/create", component: NewInscription },
  { path: "/:locale/crf/registrations/:id", component: ViewRegistration },
  { path: "/:locale/crf/registrations/:id/versions/:version", component: ViewRegistration },
  { path: "/:locale/crf/registrations/:id/edit", component: EditRegistration },
  { path: "/:locale/crf/consultations", component: ConsultIndex },
  { path: "/:locale/crf/consultations/create", component: ConsultCreate },
  { path: "/:locale/crf/consultations/:id", component: ConsultView },
  { path: "/:locale/crf/consultations/:id/registrations/:deed_id", component: ConsultViewDeed },

  { path: "/:locale/cpc", redirect: "/:locale/cpc/consultations"},
  { path: "/:locale/cpc/consultations", component: CapConsultIndex},
  { path: "/:locale/cpc/consultations/create", component: CapConsultCreate},
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
