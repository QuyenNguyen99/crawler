import { AdminFormService } from "app/common/services/admin_form.service";
import { AdminFormFieldService } from "app/common/services/admin_form_field.service";
import { AdminFormTabService } from "app/common/services/admin_form_tab.service";
import { AdminOtherService } from "app/common/services/admin_other.service";
import { AdminPageService } from "app/common/services/admin_page.service";
import { AdminPageCellService } from "app/common/services/admin_page_cell.service";
import { AdminPageLineService } from "app/common/services/admin_page_line.service";
import { AdminTableService } from "app/common/services/admin_table.service";
import { AdminTableColumnService } from "app/common/services/admin_table_column.service";
import { FilterDefaultService } from "app/common/services/filter_default.service";
import { FilterDefaultFieldService } from "app/common/services/filter_default_field.service";
import { FilterUserService } from "app/common/services/filter_user.service";
import { FilterUserAdminTableColumnMulService } from "app/common/services/filter_user_admin_table_column_mul.service";
import { FilterUserFieldService } from "app/common/services/filter_user_field.service";
import { MailSettingsService } from "app/common/services/mail_settings.service";
import { RoleService } from "app/common/services/role.service";
import { RoleItemService } from "app/common/services/role_item.service";
import { RoleRoleItemMulService } from "app/common/services/role_role_item_mul.service";
import { SettingsFilesService } from "app/common/services/settings_files.service";
import { SettingsImagesService } from "app/common/services/settings_images.service";
import { SettingsMessageService } from "app/common/services/settings_message.service";
import { SettingsTokenService } from "app/common/services/settings_token.service";
import { SystemSettingService } from "app/common/services/system_setting.service";
import { UserRoleMulService } from "app/common/services/user_role_mul.service";
import { UserService } from "app/common/services/user.service";
import { UserAdminTableColumnMulService } from "app/common/services/user_admin_table_column_mul.service";
import { JobService } from "../models/job.service";
import { JobDetailService } from "../models/job_detail.service";
import { JobJobTypeMulService } from "../models/job_job_type_mul.service";
import { JobScheduleService } from "../models/job_schedule.service";
import { JobScheduleDetailService } from "../models/job_schedule_detail.service";
import { JobScheduleJobTypeMulService } from "../models/job_schedule_job_type_mul.service";
import { JobTypeService } from "../models/job_type.service";
import { LogService } from "../models/log.service";
import { ApiService } from "../models/api.service";
import { ApiServerService } from "../models/api_server.service";

export class CommonTableService {
    static list_obj = {};
    static flag = false;
    static get_list_class(user_service: UserService) {
        if(!CommonTableService.flag) {
            CommonTableService.flag = true;
            
			CommonTableService.list_obj["admin_form"] = new AdminFormService(user_service._db,user_service.http);
			CommonTableService.list_obj["admin_form_field"] = new AdminFormFieldService(user_service._db,user_service.http);
			CommonTableService.list_obj["admin_form_tab"] = new AdminFormTabService(user_service._db,user_service.http);
			CommonTableService.list_obj["admin_other"] = new AdminOtherService(user_service._db,user_service.http);
			CommonTableService.list_obj["admin_page"] = new AdminPageService(user_service._db,user_service.http);
			CommonTableService.list_obj["admin_page_cell"] = new AdminPageCellService(user_service._db,user_service.http);
			CommonTableService.list_obj["admin_page_line"] = new AdminPageLineService(user_service._db,user_service.http);
			CommonTableService.list_obj["admin_table"] = new AdminTableService(user_service._db,user_service.http);
			CommonTableService.list_obj["admin_table_column"] = new AdminTableColumnService(user_service._db,user_service.http);
			CommonTableService.list_obj["filter_default"] = new FilterDefaultService(user_service._db,user_service.http);
			CommonTableService.list_obj["filter_default_field"] = new FilterDefaultFieldService(user_service._db,user_service.http);
			CommonTableService.list_obj["filter_user"] = new FilterUserService(user_service._db,user_service.http);
			CommonTableService.list_obj["filter_user_admin_table_column_mul"] = new FilterUserAdminTableColumnMulService(user_service._db,user_service.http);
			CommonTableService.list_obj["filter_user_field"] = new FilterUserFieldService(user_service._db,user_service.http);
			CommonTableService.list_obj["mail_settings"] = new MailSettingsService(user_service._db,user_service.http);
			CommonTableService.list_obj["role"] = new RoleService(user_service._db,user_service.http);
			CommonTableService.list_obj["role_item"] = new RoleItemService(user_service._db,user_service.http);
			CommonTableService.list_obj["role_role_item_mul"] = new RoleRoleItemMulService(user_service._db,user_service.http);
			CommonTableService.list_obj["settings_files"] = new SettingsFilesService(user_service._db,user_service.http);
			CommonTableService.list_obj["settings_images"] = new SettingsImagesService(user_service._db,user_service.http);
			CommonTableService.list_obj["settings_message"] = new SettingsMessageService(user_service._db,user_service.http);
			CommonTableService.list_obj["settings_token"] = new SettingsTokenService(user_service._db,user_service.http);
			CommonTableService.list_obj["system_setting"] = new SystemSettingService(user_service._db,user_service.http);
			CommonTableService.list_obj["user"] = new UserService(user_service._db,user_service.http);
			CommonTableService.list_obj["user_admin_table_column_mul"] = new UserAdminTableColumnMulService(user_service._db,user_service.http);
			CommonTableService.list_obj["user_role_mul"] = new UserRoleMulService(user_service._db,user_service.http);
			CommonTableService.list_obj["job"] = new JobService(user_service._db,user_service.http);
			CommonTableService.list_obj["job_detail"] = new JobDetailService(user_service._db,user_service.http);
			CommonTableService.list_obj["job_job_type_mul"] = new JobJobTypeMulService(user_service._db,user_service.http);
			CommonTableService.list_obj["job_schedule"] = new JobScheduleService(user_service._db,user_service.http);
			CommonTableService.list_obj["job_schedule_detail"] = new JobScheduleDetailService(user_service._db,user_service.http);
			CommonTableService.list_obj["job_schedule_job_type_mul"] = new JobScheduleJobTypeMulService(user_service._db,user_service.http);
			CommonTableService.list_obj["job_type"] = new JobTypeService(user_service._db,user_service.http);
			CommonTableService.list_obj["log"] = new LogService(user_service._db,user_service.http);
			CommonTableService.list_obj["api"] = new ApiService(user_service._db,user_service.http);
			CommonTableService.list_obj["api_server"] = new ApiServerService(user_service._db,user_service.http);
			
        }
        return CommonTableService.list_obj;
    }
    static getAttributeSelect(table_name) {
        var attributes = CommonTableService.list_obj[table_name].attributeNotGet();
        var rs = [{id:'',text:'-- Chọn --'}];
        for(var i in attributes) {
            rs.push({id: i,  text: attributes[i]});
        }
        return rs;
    }
}