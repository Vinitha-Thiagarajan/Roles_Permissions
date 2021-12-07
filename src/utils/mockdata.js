export const projects = [
  {
    id: 100,
    name: "Dart",
    modulelist:[
      {
        name:"dashboard"
      },
      {
        name:"audit log"
      }
    ]
  },
  {
    id: 101,
    name: "Tardis",
    modulelist:[
      {
        name:"configuration"
      },
      {
        name:"admin"
      }
    ]
  }]
export const roles = [
  {
    id: 0,
    name: "Select roles--",
    permission: {
      view: "disabled",
      edit: "disabled",
      update: "disabled",
      delete: "disabled",
      filter: "disabled",
    }
  },
  {
    id: 1,
    name: "Support",
    project_name: "Dart",
    moduleList:[
      {
        name:"dashboard",
        isenable:true,
        permission: {
          view: "true",
          edit: "false",
          update: "false",
          delete: "true",
          filter: "false",
        }
      },
      {
        name:"audit log",
        isenable:true,
        permission: {
          view: "false",
          edit: "true",
          update: "true",
          delete: "false",
          filter: "true",
        }
      }
    ]
    

  },
  {
    id: 2,
    name: "Technical",
    project_name: "Dart",
    moduleList:[
      {
        name:"dashboard",
        isenable:true,
        permission: {
          view: "false",
          edit: "true",
          update: "false",
          delete: "true",
          filter: "false",
        }
      },
      {
        name:"audit log",
        isenable:true,
        permission: {
          view: "true",
          edit: "true",
          update: "true",
          delete: "false",
          filter: "false",
        }
      }
    ]

  },
  {
    id: 3,
    name: "Lead",
    project_name: "Dart",
    moduleList:[
      {
        name:"dashboard",
        isenable:false,
        permission: {
          view: "false",
          edit: "true",
          update: "false",
          delete: "true",
          filter: "false",
        }
      },
      {
        name:"audit log",
        isenable:true,
        permission: {
          view: "true",
          edit: "true",
          update: "true",
          delete: "false",
          filter: "false",
        }
      }
    ]

  },
  {
    id: 4,
    name: "Admin",
    project_name: "Tardis",
    moduleList:[
      {
        name:"configuration",
        isenable:true,
        permission: {
          view: "false",
          edit: "true",
          update: "false",
          delete: "true",
          filter: "false",
        }
      },
      {
        name:"admin",
        isenable:true,
        permission: {
          view: "true",
          edit: "true",
          update: "true",
          delete: "false",
          filter: "false",
        }
      }
    ]
  },
  {
    id: 5,
    name: "HR",
    project_name: "Tardis",
    moduleList:[
      {
        name:"configuration",
        isenable:true,
        permission: {
          view: "false",
          edit: "false",
          update: "false",
          delete: "false",
          filter: "false",
        }
      },
      {
        name:"admin",
        isenable:true,
        permission: {
          view: "true",
          edit: "true",
          update: "true",
          delete: "true",
          filter: "true",
        }
      }
    ]
  }
]
export const Dummy_Name = [{
  id: 1,
  name: 'All Users'
},
{
  id: 2,
  name: 'Group'
},
{
  id: 3,
  name: 'Evie'
},
{
  id: 4,
  name: 'Lari'
},
{
  id: 5,
  name: 'Maris'
},
];