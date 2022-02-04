const query = {
  source: (size) => `
    query {
      source(size: ${size}){
        currentPage
        totalPages
        totalElements
        size
        numberOfElements
        hasNextPage
        results{
          source
          description
          alias
          type {
            type
            isactive
            isgroup
          }
          isactive
          numPrevDays
          dashTriggerId
          availabilitySchedule
        }
      }
    }`,
  addSource: (params) =>
    ` mutation{\n            createSource(source: \"${params.source}\", description: \"${params.description}\" ,alias:  \"${params.alias}\", availabilitySchedule:  \"${params.availabilitySchedule}\", numPrevDays: ${params.numPrevDays}, isactive:${params.isactive} , type:  \"${params.type}\", dashTriggerId:\"${params.dashTriggerId}\"){\n                source{\n                    source\n                    description\n                    dashTriggerId\n                    numPrevDays\n              type {\n          type\n          isactive\n          isgroup\n        }\n        isactive\n                    alias\n                    availabilitySchedule\n                }\n            }\n } `
  ,
  updateSource: (params) =>
    ` mutation{\n            updateSource(source: \"${params.source}\", description: \"${params.description}\" ,alias:  \"${params.alias}\", availabilitySchedule:  \"${params.availabilitySchedule}\", numPrevDays: ${params.numPrevDays}, isactive:${params.isactive} ,  dashTriggerId:\"${params.dashTriggerId}\"){\n                source{\n                    source\n                    description\n                    dashTriggerId\n                    numPrevDays\n              type {\n          type\n          isactive\n          isgroup\n        }\n       isactive\n                    alias\n                    availabilitySchedule\n                      }\n            }\n } `
  ,
  deleteSource: (params) =>
    ` mutation{\n  deleteSource(source: \"${params.source}\"){\n    deleteSource\n  }\n} `
  ,
  sourceMap: (size) => `
    query {
      sourceMap(size: ${size}){
        currentPage
        totalPages
        totalElements
        size
        numberOfElements
        hasNextPage
        results{
          id
          source{
            source
            description
            alias
            type {
              type
              isactive
              isgroup
            }
            isactive
            numPrevDays
            dashTriggerId
            availabilitySchedule
          },
          childSource{
            source
            description
            alias
            type {
              type
              isactive
              isgroup
            }
            isactive
            numPrevDays
            dashTriggerId
            availabilitySchedule
          },
          isoptional
        }
      }
    }`,
  addSourceMap: (params) =>
    `mutation{\n  createSourceMap(source:\"${params.source}\" , childSource:\"${params.childSource}\", isoptional: ${params.isoptional}){\n    sourceMap{\n  id\n    source{\n        source\n        description\n        alias\n        type {\n          type\n          isactive\n          isgroup\n        }\n        isactive\n        numPrevDays\n        dashTriggerId\n        availabilitySchedule\n      },\n      childSource{\n        source\n        description\n        alias\n        type {\n          type\n          isactive\n          isgroup\n        }\n        isactive\n        numPrevDays\n        dashTriggerId\n        availabilitySchedule\n      },\n      isoptional\n    }\n  }\n}`
  ,
  updateSourceMap: (params) =>
    `mutation{\n            updateSourceMap(source:\"${params.source}\" , childSource:\"${params.childSource}\", isoptional: ${params.isoptional} ){\n              sourceMap{\n          id\n      source{\n                  source\n                },\n                childSource{\n                  source\n                },\n                isoptional\n              }\n            }\n}`
  ,
  deleteSourceMap: (params) =>
    `mutation{\n  deleteSourceMap(source: \"${params.source}\" ,  childSource:\"${params.childSource}\" ){\n    deleteSourceMap\n  }\n} `
  ,
  sourceType: () => `{\n  sourceType{\n    isactive\n    isgroup\n    type\n  }\n}\n\n`,
  dashboardList: (params) => {
    let sourceName = ""
    if (params.sourceName === "") {
      sourceName = `sourceName: \"${params.sourceName}\"`
    }
    else {
      sourceName = `sourceName: ${params.sourceName}`
    }

    return `
    query {
      dataAvailability(size: ${params.size}, ${sourceName},startLogdate: \"${params.startLogdate}\" ,endLogdate: \"${params.endLogdate}\"){
    		currentPage
        totalPages
        totalElements
        size
        numberOfElements
        hasNextPage
        results{
          id
          source{
            source
            type {
              isgroup
            }
          }
          status{
        		status
          }
          logdate
          comments
          lastUpdatedTs
        }
      }
    }`},
  sourceDash: (size) => `
    query {
      source(size: ${size}, isactive:true){
        currentPage
        totalPages
        totalElements
        size
        numberOfElements
        hasNextPage
        results{
          source
          type {
            isgroup
          }
        }
      }
    }`,
  slackalert: () => `
    query {
      slackAlertLevel{
        results{
          alertLevel
        }
      }
    }`,
  slack: (params) => {
    let alert = ""
    if (params.alertLevel && params.alertLevel !== "") {
      alert = `alertLevel: \"${params.alertLevel}\"`
    }
    let sourceName = ""
    if (params.sourceName) {
      sourceName = `sourceName: ${params.sourceName}`
    }
    let isActive = ""
    if (params.isActive) {
      isActive = `isActive: ${params.isActive}`
    }
    return `
    query {
      slackSubscription(size:${params.size}, ${alert} ${sourceName} ${isActive}){
        results{
          id
          source{
            source
          },
          alertLevel{
            alertLevel
          },
          slackChannels,
          isActive
        },
        totalElements,
        size,
        hasNextPage,
        currentPage,
        totalPages
      }
    }
    `},
  slackaddupdate: (params) =>
    `mutation{\n  slackSubscription(source: \"${params.source}\", alertLevel: \"${params.alertLevel}\", slackChannels:\"${params.slackChannels}\", isActive: ${params.isActive}){\n     slackSubscription{\n      id\n      source{\n            source\n          },\n          alertLevel{\n            alertLevel\n          },\n          slackChannels,\n          isActive\n    }\n  }\n}`
  ,
  deleteSlack: (params) =>
    `mutation{\n  deleteSlackSubscription(source: \"${params.source}\", alertLevel: \"${params.alertLevel}\"){\n    deleteSlackSubscription\n  }\n}`
  ,
  addMaintenance: (params) =>
    `mutation{\n  createMaintenanceReason(comments: \"${params.comments}\", failureDelayReason: \"${params.failureDelayReason}\",logdate:\"${params.logdate}\",source:\"${params.source}\",status:\"${params.status}\"){\n    maintenanceReason{\n      id,\n      source{\n        source\n      },\n      logdate,\n      status,\n      failureDelayReason{\n        reason\n      },\n      comments\n    }\n  }\n}`,
  updateMaintenance: (params) =>
    `mutation{\n  updateMaintenanceReason(comments: \"${params.comments}\", failureDelayReason: \"${params.failureDelayReason}\",logdate:\"${params.logdate}\",source:\"${params.source}\",status:\"${params.status}\"){\n    maintenanceReason{\n      id,\n      source{\n        source\n      },\n      logdate,\n      status,\n      failureDelayReason{\n        reason\n      },\n      comments\n    }\n  }\n}`,
  deleteMaintenance: (params) =>
    `mutation{\n  deleteMaintenanceReason(source: \"${params.source.source}\", logdate: \"${params.logdate}\"){\n    deleteMaintenanceReason\n  }\n}`
  ,
  Maintenance: (params) => {
    let startLogdate = ""
    if (params.startLogdate) {
      startLogdate = `startLogdate: \"${params.startLogdate}\"`
    }
    let endLogdate = ""
    if (params.endLogdate) {
      endLogdate = `endLogdate: \"${params.endLogdate}\"`
    }
    let sourceName = ""
    if (params.sourceName) {
      sourceName = `sourceName: ${params.sourceName}`
    }

    let failureDelayReason = ""
    if (params.failureDelayReason) {
      failureDelayReason = `failureDelayReason: \"${params.failureDelayReason}\"`
    }
    return `
    query {
      maintenanceReasons(size:${params.size}, ${sourceName} ${startLogdate} ${endLogdate} ${failureDelayReason}){
        results{
          id,
          source{
            source
          },
          logdate,
          status,
          failureDelayReason{
            reason
          },
          comments
        },
        totalElements,
        size,
        hasNextPage,
        currentPage,
        totalPages
      }
    }
    `},
  reasonLookup: () => `
    query {
      maintenanceStatusLookup{
        id,
        reason
      }
    }`,
  DetailSource: (sourceName) => `
    query {
      sourceMap(sourceName: ${sourceName}){
        results{
          id
          source{
            source
          },
          childSource{
            source
            type {
              isactive
              isgroup
            }
          }
        }
      }
    }`,
  AuditLog: (sourceName) => `
    query {
    auditLog(sourceName:${sourceName}){
      results{
          id
          fileSizeMb
          status
          additionalInfo
          numRecords
          updateTs
        }
      }
    }`,
  SourceHistory: (sourceName) => `
    query {
      dataHistory(sourceName:${sourceName}){
        results{
          id
          source{source}
          status{status}
          comments
          createdTs
          }
        }
    }`,
  Me: () => `
    query {
      me{
        username,
        firstName,
        lastName,
        email,
        isActive
        ,groups{
          id,
          name,
          permissions
        },
        id,
        permissions
      }
    }
    `,
  User: (email) => `
    query {
      users(email:  \"${email}\"){
        results{
          username
          email
          token
        }
      }
    }
    `,
  createDashboard: (params) =>
    `mutation{\n  createCustomDashboard(dashboardTitle: \"${params.dashboardTitle}\", isActive: ${params.isActive}, logdateWindow: \"${params.logdateWindow}\", sources: ${params.sources}){\n    customDashboard\n {\n  id\n dashboardTitle\n }\n }\n}`
  ,
  updateDashboard: (params) => {
    let id = ""
    if (params.id) {
      id = `id: ${params.id}`
    }
    let logdateWindow = ""
    if (params.logdateWindow) {
      logdateWindow = `logdateWindow: \"${params.logdateWindow}\"`
    }
    return `mutation{\n  updateCustomDashboard(dashboardTitle: \"${params.dashboardTitle}\", isActive: ${params.isActive},  sources: ${params.sources}, ${logdateWindow} ${id} ){\n    customDashboard\n {\n  id\n dashboardTitle\n }\n }\n}`
  }
  ,
  deleteDashboard: (params) =>
    `mutation{\n  deleteCustomDashboard(id: ${params.id} ){\n  deleteCustomDashboard\n }\n}`
  ,
  getCustomDash: () =>
    `query{
      customDashboard{
        id
        user{
          username
        }
        dashboardTitle
        logdateWindow
        isActive
        sources {
          source
        }
      }
    }
    `,
  Admin: (size) =>
    `query{
      users(size:${size}){
        results{
          id
          groups{
            id 
            name
            permissions
          }
          username
          email
          isActive
    
        }
        numberOfElements
        totalPages
        totalElements
        hasNextPage
      }
    }
    `,
  AdminGroup: () =>
    `query{
      groups{
        id
        name
        userSet{
          username
        }
      }
    }`,
  UpdateGroup: (params) =>
    `mutation{\n updateUserGroup(groupIds:${params.groupIds}, userId:${params.userId}) \n{  user { \n id \n groups{\n  id \n name \n permissions \n} \n username \n email\n isActive  \n}\n} \n }`,
  Expectation: () =>
    `query{
      masterExpectations{
        expectationId
        expectationName
        attributes
      }
    }`,
  PipelineHistory: () =>
    `query{
      groupByPipelineExpectations {
        results {
          sourceName
          pipelineExpectations {
            id
            sourceName
            source {
              sourceName
              sourceType
              cron
              sourceId
            }
            validationType
            expectation {
              expectationId
              expectationName
            }
            status
            expectationValue
          }
        }
      }
    }`,
  UpdatePipelineHistory: (params) =>
    `mutation{\n updatePipelineExpectation(\n sourceId:${params.sourceId}, expectationId:${params.expectationId}, expectationValue:\"${params.expectationValue}\",id:${params.id}, sourceName:\"${params.sourceName}\", status:${params.status}, validationType:\"${params.validationType}\") \n{  pipelineExpectation { \n id \n} \n }}`,
  CreatePipelineHistory: (params) =>
    `mutation{\n createPipelineExpectation(\n sourceId:${params.sourceId}, expectationId:${params.expectationId}, expectationValue:"${params.expectationValue}", sourceName:\"${params.sourceName}\", status:${params.status}, validationType:\"${params.validationType}\") \n{  pipelineExpectation { \n id \n} \n }}`,
  DeletePipelineHistory: (params) =>
    `mutation{\n deletePipelineExpectation(id:${params.id}) \n{  deleteMessage  }}`,
  PipelineValidation: (params) =>
    `query{
      pipelineValidationsStore(sourceName:"${params.source}", runTime: "${params.runtime}") {
        sourceName
          preValidation {
            expectationSuiteName
            value
          }
          postValidation{
            expectationSuiteName
            value
          }
        }
    }`,
    UpdateSourceClassification: (params) =>
    `mutation{\n updatePipelineSourceClassification(\n sourceId:${params.sourceId}, \n   sourceName:\"${params.sourceName}\", \n   sourceType:\"${params.sourceType}\", \n   cron:\"${params.cron}\"  \n  ) \n{  pipelineSourceClassification { \n sourceId \n} \n } \n}`,
    CreateSourceClassification: (params) =>
    `mutation{\n createPipelineSourceClassification(\n sourceName:\"${params.sourceName}\",  \n  sourceType:\"${params.sourceType}\", \n   cron:\"${params.cron}\"  \n  ) \n{  pipelineSourceClassification { \n sourceId \n} \n } \n}`,
    PipelineSourceClassification: (name) =>
    `query{
      pipelineSourceClassification(sourceName:\"${name}\"){
        sourceId
        sourceName
        sourceType
        cron
      }
    }`,
}


export default query