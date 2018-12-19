
export const API = {
    IP : 'http://172.30.43.53:9090',  //王善鹏
    // IP: 'http://172.30.43.116:9090',   //佳浩
    // IP : 'http://172.30.41.109:9090',
    // IP : 'http://172.30.30.253:9090',
    KQIp: 'http://172.30.43.53:8080',
    // KQIp: 'http://119.97.234.253:9091',
    // IP : 'http://119.97.234.253:9090',  //外网IP
    login: '/sys/login',
    mainMenu: '/sys/menu/tree',  //菜单树
    mainMenuPermission: '/sys/menu/tree/user',
    PersonThree: '/organizational/tree',   //人员树状菜单
    StoreTreeData: '/organizational/store/tree', //门店人员树
    KitchenTreeTreeData: '/organizational/kitchen/tree', // 卤味厨房人员树
    searchbm: '/position',          //部门查询
    addcom: '/company',              //新增公司
    searchcom: '/company/search',          //公司查询
    joblever: '/positionLevel',   //职等
    dictSerch: '/sys/dictType',   //数据词典左
    dictionaries: '/sys/dictionaries',   //数据词典右
    Department: '/department/search',   //部门管理
    Employee: '/employee',     //人员
    Store: '/store',         //门店
    ClassManageUrl: '/scheduling',   //班次管理
    bigArea : '/sys/dictType/bigArea',    //大区查询
    allcompany: '/company/s',     //所有公司查询
    ClassSearchUrl: '/employeeScheduling', //班次查询
    BurshCardUrl: '/checkWorkHandle/search',  //补刷卡考勤查询
    HolidaySet: '/tHolidaySetting',  //假日设置
    Tacking: '/checkWorkType',   //考勤处理类型
    BatchUrl: '/punchRecordBatch/queryExecuteStateList', //手动批处理
    VersionUrl: '/app/appVersion',     //版本查询
    DailyClockUrl: '/report/store/summary/excel/output',  //每日打卡查询
    DayClockUrl: '/report/store/employee/summary/excel/output',   //人员每人打卡
    EmpDaysUrl: '/report/store/employee/days/summary/excel/output',  //emp报表
    PhoneIdUrl: '/user/unbound/' ,   //重置手机设备
    userUnbounUrl: '/userUnbound' ,  //重置手机设备记录
    processViewUrl: '/AppOASystem/taskInfo/indexPage.do' , //查看APP流程
    progresHistory: 'AppOASystem/appTask/listHistoryComment.do', //审批历程查询
    MenuId: '/sys/menu',  //id查询菜单
    userRole: '/sys/role',  //角色查询
    permissionManagerUrl: '/sys/permission' , //权限设置
    WorkRuleUrl: '/tCheckWorkRule', //考勤规则
}
