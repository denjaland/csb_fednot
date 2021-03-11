export default [
  {
    id: 1,
    label: {
      en: "Succession Agreement",
      fr: 'Pacte successoral',
      nl: 'Erfovereenkomst'
    },
    register: 1,
    data: {
      declarers: [ null ], // erflater
      involved: [ null ]    // betrokken partijen  
    },
    component: "succession-agreement",
    code: 60,
    repertorium_required: false,
    limits: {
      combinations: [6,10,14],
      max: 99
    }
  },
  {
    id: 2,
    label: {
      nl: 'Authentiek testament',
      fr: 'Testament authentique',
      en: 'Authentic will'
    },
    register: 1,
    code: 10,
    data: {
      declarers: [],
      location: null
    },
    component: "declarer",
    repertorium_required: true,
    limits: {
      combinations: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      max: 99
    }
  },
  {
    id: 3,
    label: {
      nl: 'Eigenhandig testament',
      fr: 'Testament olographe',
      en: 'Own will'
    },
    register: 1,
    code: 20,
    data: {
      declarers: [],
      location: 1
    },
    component: "own-testament",
    repertorium_required: false,
    limits: {
      combinations: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      max: 99
    }
  },
  {
    id: 4,
    label: {
      nl: 'Eigenhandig testament na overlijden',
      fr: 'Testament olographe après décès',
      en: 'Own will after death'
    },
    register: 1,
    code: 25,
    data: {
      declarers: []
    },
    component: "declarer",
    repertorium_required: false,
    limits: {
      combinations: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      max: 99
    }
  },
  {
    id: 5,
    label: {
      nl: "Verklaring van behoud",
      fr: "Déclaration de maintien",
      en: "Retention declaration"
    },
    register: 1,
    code: 30,
    data: {
      declarers: []
    },
    component: "declarer",
    repertorium_required: false,
    limits: {
      combinations: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      max: 99
    }
  },
  {
    id: 6,
    label: {
      fr: 'Institution contractuelle et donations entre époux de biens futurs',
      nl: "Contractuele erfstelling en giften tussen echtgenoten van toekomstige goederen",
      en: "Contractual inheritance and gifts between spouses of future goods"
    },
    code: 40, 
    register: 1,
    data: {
      declarers: []
    },
    component: "declarer",
    repertorium_required: false,
    limits: {
      combinations: [1,10,14],
      max: 99
    }
  },
  {
    id: 7,
    label: {
      nl: "Internationaal testament",
      fr: "Testament international",
      en: 'International will'
    },
    register: 1,
    code: 70,
    data: {
      declarers: []
    },
    component: "declarer",
    repertorium_required: false,
    limits: {
      combinations: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      max: 99
    }
  },
  {
    id: 8,
    label: {
      nl: "Voorafgaande overeenkomst of overeenkomst volgend op de echtscheiding die een afwijking inhoudt betreffende de al gedane regeling van de erfrechtelijke devolutie",
      fr: "Convention préalable ou postérieure au divorce qui déroge aux dispositions antérieures concernant la dévolution successorale",
      en: "Prior agreement or agreement following the divorce containing a deviation from the settlement of inheritance devolution already made"
    },
    code: 80,
    register: 1,
    data: {
      declarers: []
    },
    component: "declarer",
    repertorium_required: false,
    limits: {
      combinations: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      max: 99
    }
  },
  {
    id: 9,
    label: {
      nl: "Andere akten die een invloed kunnen hebben op de erfrechtelijke devolutie",
      fr: "Autres actes qui ont un impact sur la dévolutoin successorale",
      en: "Other acts that may affect inheritance devolution"
    },
    register: 1,
    code: 90,
    data: {
      description: '',
      declarers: []
    },
    component: "other-deed",
    repertorium_required: false,
    limits: {
      combinations: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      max: 99
    }
  },
  {
    id: 10,
    label: {
      nl: "”Valkeniers” bedingen (tem 31/08/2018) en huwelijksvoordelen onder voorwaarde van overleven",
      fr: "Clauses ”Valkeniers” (jusqu’au 31/08/2018) et avantages matrimoniaux sous condition de survie",
      en: "“Falconers” stipulations (until 31/08/2018) and marriage benefits on condition of survival"
    },
    register: 1,
    code: 50,
    data: {
      declarers: []
    },
    component: "declarer",
    repertorium_required: false,
    limits: {
      combinations: [1,6,14],
      max: 99
    }
  },
  /*{
    id: 11,
    label: "Herroeping",
    register: 1,
    data: {
      declarers: []
    },
    component: "declarer"
  },*/
  {
    id: 12,
    label: {
      nl: "Samenlevingsovereenkomst (art. 1478 Burgerlijk wetboek)",
      fr: "Contrat de cohabitation légale (art. 1478 Code civile)",
      en: "Cohabitation agreement (art. 1478 Civil Code)"
    },
    register: 2,
    data: {
      declarers: [null, null],
    },
    code: 20,
    component: "two-declarers",
    repertorium_required: false,
    limits: {
      combinations: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      max: 99
    }
  },
  {
    id: 13,
    label: {
      nl: "Verklaring van anticipatieve inbreng",
      fr: "Déclaration d'apport anticipé",
      en: "Declaration of advance contribution"
    },
    register: 2,
    data: {
      declarers: [null, null],
    },
    code: 30,
    component: "two-declarers",
    repertorium_required: false,
    limits: {
      combinations: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      max: 99
    }
  },
  {
    id: 14,
    label: {
      nl: "Huwelijksovereenkomst",
      fr: "Contrat de mariage",
      en: "Wedding contract"
    },
    register: 2,
    data: {
      declarers: [{}, {}],
      regime: null
    },
    code: 10,
    component: "marriage-contract",
    repertorium_required: false,
    limits: {
      combinations: [1,6,10],
      max: 1
    }
  },
  {
    id: 15,
    label: {
      nl: "Wijzigingsakte huwelijksvermogenstelsel",
      fr: "Acte modificatif du régime matrimonial",
      en: "Amending deed for matrimonial property regime"
    },
    register: 2,
    code: 15,
    repertorium_required: false,
    data: {
      declarers: [{}, {}],
      regime: null,
      previous: null
    },
    component: 'change-matrimonial-regime',
    combinations: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  },
  /*
  {
    id: 16,
    label: {
      nl: "Vonnis",
      en: "Verdict",
      fr: "Verdict"
    },
    register: 2
  },
  {
    id: 17,
    label: {
      nl: "Arrest",
      en: "Judgement",
      fr: "Jugement"
    },
    register: 2
  }
  */
]