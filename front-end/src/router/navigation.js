export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: "",
    route_name: "Dashboard",
    has_submenu: false,
    submenu_items: [],
  },
  {
    id: "unit-dashboard",
    title: "Unit Dashboard",
    icon: "",
    route_name: "UnitDashboard",
    has_submenu: false,
    submenu_items: [],
  },
  {
    id: "unit",
    title: "Unit",
    icon: "",
    route_name: "UnitList",
    has_submenu: true,
    submenu_items: [
      { title: "Units", route_name: "UnitList" },
      { title: "Create Unit", route_name: "UnitCreate" },
    ],
  },
  {
    id: "user",
    title: "User",
    icon: "",
    route_name: "UserList",
    has_submenu: true,
    submenu_items: [
      { title: "Users", route_name: "UserList" },
      { title: "Create User", route_name: "UserCreate" },
    ],
  },
  {
    id: "logout",
    title: "Logout",
    icon: "",
    route_name: "Logout",
    has_submenu: false,
    submenu_items: [],
  },
];
