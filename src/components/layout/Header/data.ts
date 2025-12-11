export const menuData = {
  "about-us": {
    title: "About Us",
    href: "/",
    items: {
      mission: {
        title: "Our Mission",
        href: "/our-mission",
        icon: "/static/images/mission.svg",
        hasSubmenu: false,
        // items: {
        // 	targets: {
        // 		title: '2XEE target , trends , and analysis (EE in NDCs)',
        // 		href: '#',
        // 		icon: '/static/images/target.svg',
        // 		hasSubmenu: false,
        // 	},
        // },
      },
      approach: {
        title: "Our Approach",
        href: "/our-mission#approach",
        icon: "/static/images/approached.svg",
        hasSubmenu: true,
        items: {
          elevate: {
            title: "Elevate",
            href: "/our-mission#elevate",
            icon: "/static/images/elevate.svg",
            hasSubmenu: false,
          },
          support: {
            title: "Support",
            href: "/our-mission#support",
            icon: "/static/images/support.svg",
            hasSubmenu: false,
          },
          invest: {
            title: "Invest",
            href: "/our-mission#invest",
            icon: "/static/images/invest.svg",
            hasSubmenu: true,
            items: {
              marketplace: {
                title: "Marketplace",
                href: "/invest#market-place",
                icon: "/static/images/market.svg",
                hasSubmenu: false,
              },
              "green-technology": {
                title: "Green Technology Selector",
                href: "#",
                icon: "/static/images/green.svg",
                hasSubmenu: false,
              },
            },
          },
        },
      },
      secretariat: {
        title: "Secretariat",
        href: "/our-mission#secretariat",
        icon: "/static/images/Secretariat.svg",
        hasSubmenu: false,
      },
      history: {
        title: "History",
        href: "/our-mission#history",
        icon: "/static/images/history.svg",
        hasSubmenu: false,
      },
    },
  },
  "call-to-action": {
    title: "Call To Action",
    href: "/call-to-action",
    items: {
      "add-the-playbook-of-key-actions": {
        title: "Playbook of Key Actions",
        href: "https://test-mission-efficiency.pantheonsite.io/sites/default/files/2024-08/missionefficiency-actionsplaybook%202.pdf",
        icon: "/static/images/activities-icon.svg",
        hasSubmenu: false,
      },
      "mission-efficiency-pledge": {
        title: "Mission Efficiency Pledge",
        href: "/mission-efficiency-pledge",
        icon: "/static/images/pledge.svg",
        hasSubmenu: false,
      },
      "un-energy-compact": {
        title: "UN Energy Compact",
        href: "/call-to-action#UN-energy-compact",
        icon: "/static/images/un-compact.svg",
        hasSubmenu: false,
      },
      NDCs: {
        title: "NDCs",
        href: "/call-to-action#cta-ndc",
        icon: "/static/images/ndc.svg",
        hasSubmenu: false,
      },
    },
  },
  "our-work": {
    title: "Our Work",
    href: "/",
    items: {
      "country-engagement": {
        title: "Country and Regional Engagement",
        href: "/country-engagement",
        icon: "/static/images/country-engagement.svg",
        hasSubmenu: true,
        items: {
          india: {
            title: "India",
            href: "/country-engagement/india",
            hasSubmenu: false,
            icon: "/static/flags/in.svg",
          },
          kenya: {
            title: "Kenya (Coming soon)",
            href: "#",
            icon: "/static/flags/ke.svg",
            hasSubmenu: false,
          },
          asean: {
            title: "ASEAN (Coming soon)",
            href: "#",
            icon: "/static/images/asean.svg",
            hasSubmenu: false,
          },
          africa: {
            title: "Africa (Coming soon)",
            href: "#",
            icon: "/static/images/africa.svg",
            hasSubmenu: false,
          },
        },
        "un-energy-compact": {
          title: "UN Energy Compact",
          href: "/call-to-action#UN-energy-compact",
          icon: "/static/images/events.svg",
          hasSubmenu: false,
        },
        NDCs: {
          title: "NDCs (to be further developed)",
          href: "/call-to-action#cta-ndc",
          icon: "/static/images/involved.svg",
          hasSubmenu: false,
        },
      },
      "raising-ambition": {
        title: "Raising Ambition",
        href: "#",
        icon: "/static/images/raising.svg",
        hasSubmenu: true,
        items: {
          about: {
            title: "COP",
            href: "#",
            icon: "/static/images/about-info.svg",
            hasSubmenu: false,
          },
          members: {
            title: "G20",
            href: "#",
            icon: "/static/images/members-icon.svg",
            hasSubmenu: false,
          },
        },
      },
    },
  },
  "get-involved": {
    title: "Get Involved",
    href: "/get-involved",
    items: {
      taskforces: {
        title: "Taskforces",
        href: "/get-involved#taskforces",
        icon: "/static/images/mission.svg",
        hasSubmenu: true,
        items: {
          "global-ambition-taskforce": {
            title: "Global Ambition Taskforce",
            href: "#",
            icon: "/static/images/global-icon.svg",
            hasSubmenu: false,
            items: {
              about: {
                title: "About",
                href: "#",
                icon: "/static/images/about-info.svg",
                hasSubmenu: false,
              },
              members: {
                title: "Members",
                href: "#",
                icon: "/static/images/members-icon.svg",
                hasSubmenu: false,
              },
              activities: {
                title: "Activities",
                href: "#",
                icon: "/static/images/activities-icon.svg",
                hasSubmenu: false,
              },
              news: {
                title: "News",
                href: "#",
                icon: "/static/images/news.svg",
                hasSubmenu: false,
              },
            },
          },
          "narrative-taskforce": {
            title: "Narrative Taskforce",
            href: "#",
            icon: "/static/images/approached.svg",
            hasSubmenu: false,
            items: {
              about: {
                title: "About",
                href: "#",
                icon: "/static/images/about-info.svg",
                hasSubmenu: false,
              },
              members: {
                title: "Members",
                href: "#",
                icon: "/static/images/members-icon.svg",
                hasSubmenu: false,
              },
              activities: {
                title: "Activities",
                href: "#",
                icon: "/static/images/activities-icon.svg",
                hasSubmenu: false,
              },
              news: {
                title: "News",
                href: "#",
                icon: "/static/images/news.svg",
                hasSubmenu: false,
              },
            },
          },
          "marketplace-taskforce": {
            title: "Marketplace Taskforce",
            href: "#",
            icon: "/static/images/market-taskforce.svg",
            hasSubmenu: false,
            items: {
              about: {
                title: "About",
                href: "#",
                icon: "/static/images/about-info.svg",
                hasSubmenu: false,
              },
              members: {
                title: "Members",
                href: "#",
                icon: "/static/images/members-icon.svg",
                hasSubmenu: false,
              },
              activities: {
                title: "Activities",
                href: "#",
                icon: "/static/images/activities-icon.svg",
                hasSubmenu: false,
              },
              news: {
                title: "News",
                href: "#",
                icon: "/static/images/news.svg",
                hasSubmenu: false,
              },
            },
          },
        },
      },
      partners: {
        title: "Partners & Coalitions",
        href: "/get-involved#mission-efficiency-partners",
        icon: "/static/images/partners.svg",
        hasSubmenu: false,
      },
      calendar: {
        title: "Calendar of Energy Efficiency Events",
        href: "/events",
        icon: "/static/images/sector-icon.svg",
        hasSubmenu: false,
      },
      speakers: {
        title: "Energy Efficiency Champions & Speakers",
        href: "#",
        icon: "/static/images/features-icon.svg",
        hasSubmenu: false,
      },
    },
  },
  resources: {
    title: "Tools & Resources",
    href: "/",
    items: {
      "energy-efficiency-101": {
        title: "Energy Efficiency 101",
        href: "/elevate#energy-efficiency-101",
        icon: "/static/images/electric-energy.svg",
        hasSubmenu: false,
      },
      tools: {
        title: "Tools",
        href: "/toolkit",
        icon: "/static/images/tools-icon.svg",
        hasSubmenu: true,
        items: {
          "mission-efficiency-toolkit": {
            title: "Mission Efficiency Toolkit",
            href: "#",
            icon: "/static/images/global-icon.svg",
            hasSubmenu: false,
          },
          "cfd-tool": {
            title: "CFD Tool",
            href: "/support#/cfd-tool",
            icon: "/static/images/cfd-tool.svg",
            hasSubmenu: false,
          },
          "demand-flexibility-model": {
            title: "Demand Flexibility Model",
            href: "/country-engagement/india/demand-flexibility-model",
            icon: "/static/images/dfm-icon.svg",
            hasSubmenu: false,
          },
        },
      },
      "sector-resources": {
        title: "Sector Resources",
        href: "/support#sector-resources-and-partners",
        icon: "/static/images/sector-icon.svg",
        hasSubmenu: false,
      },
      trainings: {
        title: "Trainings",
        href: "/trainings",
        icon: "/static/images/training-icon.svg",
        hasSubmenu: false,
      },
    },
  },
};
