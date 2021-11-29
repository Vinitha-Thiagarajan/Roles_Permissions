export const projects = [
  {
    id: 0,
    name: "Dart",
  },
  {
    id: 1,
    name: "Audience Report",
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
      filtered: "disabled",
    }
  },
  {
    id: 1,
    name: "Support",
    project_name: "Dart",
    permission: {
      view: "true",
      edit: "disabled",
      update: "disabled",
      delete: "true",
      filtered: "false",
    }

  },
  {
    id: 2,
    name: "Technical",
    project_name: "Dart",
    permission: {
      view: "false",
      edit: "disabled",
      update: "true",
      delete: "false",
      filtered: "true",
    }

  },
  {
    id: 3,
    name: "Lead",
    project_name: "Dart",
    permission: {
      view: "disabled",
      edit: "true",
      update: "false",
      delete: "true",
      filtered: "disabled",
    }

  },
  {
    id: 4,
    name: "Admin",
    project_name: "Audience Report",
    permission: {
      view: "true",
      edit: "false",
      update: "disabled",
      delete: "true",
      filtered: "true",
    }
  },
  {
    id: 5,
    name: "HR",
    project_name: "Audience Report",
    permission: {
      view: "disabled",
      edit: "disabled",
      update: "true",
      delete: "true",
      filtered: "false",
    }
  }
]
