
export const loginResponse = {
  code: 200,
  data: {
    accessToken: 'admin-token'
  }
}

export const menus = [{
  name: "dashboard",
  path: "/dashboard",
  icon: "dashboard"
},{
  name: "dashboard2",
  path: "/dashboard1",
  icon: "dashboard",
  children: [{
    name: "dashboard",
    path: "/dashboard2",
    icon: "dashboard"
  }]
}]