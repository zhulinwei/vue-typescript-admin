
export const loginResponse = {
  code: 200,
  data: {
    accessToken: 'admin-token'
  }
}

export const userInfoResponse = {
  code: 200,
  data: {
    user: {
      id: 0,
      username: "admin",
      password: "any",
      name: "Super Admin",
      avatar: "https://avatars0.githubusercontent.com/u/17670262?s=40&v=4",
      introduction: "I am a super administrator",
      email: "admin@test.com",
      phone: "1234567890",
      roles: ["admin"]
    }
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