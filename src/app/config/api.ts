import { environment } from '../../environments/environment';
export class API {
    static API_URL = environment.API;
    // static API_URL = 'https://cybersale-test.five9.vn/api';
    static API_URL_COMMON = environment.API_URL_COMMON;
    static CALLFUNC = API.API_URL_COMMON + 'admin/callfunc';
    static VIEW = API.API_URL_COMMON + 'admin/view';
    static CREATE = API.API_URL_COMMON + 'admin/create';
    static READ = API.API_URL_COMMON + 'admin/read';
    static RE_FK_ATTRIBUTE = API.API_URL_COMMON + 'admin/refkattribute';
    static FINDALLDATA = API.API_URL_COMMON + 'admin/findalldata';
    static FINDONEDATA = API.API_URL_COMMON + 'admin/findonedata';
    static GETFK = API.API_URL_COMMON + 'admin/getfkmul';
    static EXCEL = API.API_URL_COMMON + 'admin/exportexcel';
    static UPDATE_ATTRIBUTE = API.API_URL_COMMON + 'admin/updateattribute';
    static UPDATE_ATTRIBUTE_MANY = API.API_URL_COMMON + 'admin/updateattributemany';
    static UPDATE = API.API_URL_COMMON + 'admin/update';
    static UPDATEALL = API.API_URL_COMMON + 'admin/updateall';
    static DELETE = API.API_URL_COMMON + 'admin/delete';
    static DELETEALL = API.API_URL_COMMON + 'admin/deleteall';
    static APPROVEALL = API.API_URL_COMMON + 'admin/approveall';
    
    static IMAGE = environment.IMAGE + 'admin/image';
    static FILE = environment.FILE + 'admin/file';

    static TOKENINPUT = environment.API_URL_COMMON + 'admin/tokeninput';
    static UPDATE_FILTER_DEFAULT = environment.API_URL_COMMON + 'admin/updatefilterdefault';
    static HEADER_ROLE = environment.API_URL_COMMON + 'admin/headerrole';
    static SYSTEM_SETTING = environment.API_URL_COMMON + 'admin/systemsetting';
    static SYSTEM_SETTING_UPDATE = environment.API_URL_COMMON + 'admin/configsetting';
    static USER_COLUMN = environment.API_URL_COMMON + 'admin/usercolumn';
    static SYSTEM_SEND_MAIL = environment.API_URL_COMMON + 'admin/sendtestmail';
    static LIST_ROLE = environment.API_URL_COMMON + 'admin/listrole';
    static SUGGESTION_KEYWORD = environment.API_URL_COMMON + 'admin/suggestionkeyword';
    static IMPORT = API.API_URL_COMMON + 'admin/import';
    static DOWNLOADTEMPLATE = API.API_URL_COMMON + 'admin/downloadtemplate';
    static REF_APPROVE = API.API_URL_COMMON + 'admin/refapprove';
    static REF_REJECT = API.API_URL_COMMON + 'admin/refreject';
    static GET_DASHBOARD = API.API_URL_COMMON + 'admin/dashboard';
    static GET_DASHBOARDDIFF = API.API_URL_COMMON + 'admin/dashboarddiff';
    static GET_DASHBOARD_TABLE = API.API_URL_COMMON + 'admin/dashboardbytable';
    static GET_DASHBOARD_COUNT = API.API_URL_COMMON + 'admin/count';
    
    static LOGIN = API.API_URL_COMMON + 'authenticate';
    static LOGOUT = API.API_URL_COMMON + 'logout';
    static ROLE =  API.API_URL_COMMON + 'role';
    static INFORMATION = API.API_URL_COMMON + 'information';
    static UPDATEPROFILE = API.API_URL_COMMON + 'updateprofile';
    static CHANGEPASSWORD = API.API_URL_COMMON + 'changepassword';
    static FORGOTPASSWORD = API.API_URL_COMMON + 'forgotpassword';
    static RESETPASSWORD = API.API_URL_COMMON + 'resetpassword';
    static CHECK_TOKEN_RESET = API.API_URL_COMMON + 'checktokenreset?access_token={access_token}';

    // api get report data
    static STATITISC_REPORT = API.API_URL_COMMON + 'dashboard/statitisReport';


    static JOB_WAITING = API.API_URL_COMMON + 'api/waiting';
    static JOB_INITIAL = API.API_URL_COMMON + 'api/initial';
    static JOB_PAUSED = API.API_URL_COMMON + 'api/paused';
    static JOB_CANCELED = API.API_URL_COMMON + 'api/canceled';
    static JOB_RESULT = API.API_URL_COMMON + 'api/jobresult';
    static JOB_TOTAL_RESULT = API.API_URL_COMMON + 'api/jobtotalresult';
    static JOB_UPDATE_SORT = API.API_URL_COMMON + 'api/jobupdatesort';
    static JOB_DAILY_RESULT = API.API_URL_COMMON + 'api/jobdailyresult';
    static JOB_MONTHLY_RESULT = API.API_URL_COMMON + 'api/jobmonthlyresult';
    static JOB_YEARLY_RESULT = API.API_URL_COMMON + 'api/jobyearlyresult';

    static JOB_ERROR_TOTALLY = API.API_URL_COMMON + 'api/joberrortotally';
    static JOB_ERROR_YEARLY = API.API_URL_COMMON + 'api/joberroryearly';
    static JOB_ERROR_MONTHLY = API.API_URL_COMMON + 'api/joberrormonthly';
    static JOB_ERROR_DAILY = API.API_URL_COMMON + 'api/joberrordaily';

    static JOB_FROM_DATE_TO_DATE_RESULT = API.API_URL_COMMON + 'api/jobfromdatetodateresult';
    static JOB_HEAT_CHART_DATA = API.API_URL_COMMON + 'api/heatchartdata';
    static JOB_EXACTLY_DATE = API.API_URL_COMMON + 'api/exactlydate';
    static OPTION_KEY = API.API_URL_COMMON + 'api/optionkey';
    static UPDATE_OPTION_KEY = API.API_URL_COMMON + 'api/updateoptionkey';

}