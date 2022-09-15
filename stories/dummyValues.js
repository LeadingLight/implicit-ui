export const directRenderExampleUi = {
  name: "Routes",
  children: [
    {
      name: "Route",
      props: { element: { name: "Content", render: true }, path: "/somePath" },
    },
    {
      name: "Route",
      props: {
        element: { name: "Content", render: true },
        path: "/someOtherPath",
      },
    },
  ],
};

export const dummyStackedUi = {
  name: "Router",
  children: [
    {
      name: "Routes",
      children: [
        {
          name: "Route",
          props: {
            path: "/inside/*",
            element: {
              render: true,
              name: "StyledContainer",
              props: { text: "This is a container" },
            },
          },
          children: [
            {
              name: "SideMenu",
              props: {
                config: [
                  {
                    title: "Dashboard",
                    link: "/inside/dashboard",
                    icon: "mdDashboard",
                  },
                  {
                    title: "Aaa",
                    link: "/inside/aaa",
                    icon: "mdEventNote",
                  },
                  {
                    title: "Bbb",
                    link: "/inside/bbb",
                    icon: "mdCreditCard",
                  },
                  {
                    title: "Ccc",
                    link: "/inside/ccc",
                    icon: "mdAssessment",
                  },
                  {
                    title: "Ddd",
                    link: "/inside/ddd",
                    icon: "mdArticle",
                  },
                  {
                    title: "Eee",
                    link: "/inside/eee",
                    icon: "mdFactCheck",
                  },
                  { title: "Fff", link: "/inside/fff", icon: "mdQuiz" },
                  {
                    title: "Ggg",
                    link: "/inside/ggg",
                    icon: "mdSupportAgent",
                  },
                ],
              },
            },
            {
              name: "StyledContainer",
              props: { text: "This is a container" },
              children: [
                {
                  name: "StyledContainer",
                  props: { text: "This is a container" },
                },
                {
                  name: "Routes",
                  children: [
                    {
                      name: "Route",
                      props: {
                        element: {
                          name: "StyledContainer",
                          props: { text: "This is a container" },
                          render: true,
                        },
                        index: "index",
                      },
                    },
                    {
                      name: "Route",
                      props: {
                        element: {
                          name: "StyledContainer",
                          props: { text: "This is a container" },
                          render: true,
                        },
                        path: "/surveys",
                      },
                    },
                    {
                      name: "Route",
                      props: {
                        element: {
                          name: "StyledContainer",
                          props: { text: "This is a container" },
                          render: true,
                        },
                        path: "/dashboard",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
