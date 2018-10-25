
export const API = {
    // IP : 'http://172.30.43.53:9090',  //王善鹏
    // IP: 'http://172.30.43.116:9090',
    // IP : 'http://172.30.41.109:9090',
    // IP : 'http://172.30.30.253:9090',
    IP : 'http://119.97.234.253:9090',  //外网IP
    login: '/sys/login',
    PersonThree: '/organizational/tree',   //人员树状菜单
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
    DailyClockUrl: '/tAppSignRecord/store/summary/excel/output',  //每日打卡查询
    DayClockUrl: '/tAppSignRecord/employee/summary/excel/output',   //人员每人打卡
    EmpDaysUrl: '/tAppSignRecord/employee/days/summary/excel/output',  //emp报表
    PhoneIdUrl: '/user/unbound/' ,   //重置手机设备
    userUnbounUrl: '/userUnbound'   //重置手机设备记录
}
