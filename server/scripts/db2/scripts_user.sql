/* BEGIN USER_INCOME_RULE */
DROP TABLE "F9_STG_INSIGHT"."USER_INCOME_RULE";
CREATE TABLE "F9_STG_INSIGHT"."USER_INCOME_RULE"  (
    "FACEBOOK_ID" VARCHAR(15 OCTETS) NOT NULL , 
    "REF_ID" INTEGER NOT NULL,
    "TYPE" VARCHAR(20 OCTETS) NOT NULL , 
    "CREATED_TIME" INTEGER , 
    "CREATED_BY" INTEGER)   
		 COMPRESS YES STATIC   DISTRIBUTE BY HASH("FACEBOOK_ID")    IN "USERSPACE1"  ORGANIZE BY ROW NOT LOGGED INITIALLY;;
ALTER TABLE "F9_STG_INSIGHT"."USER_INCOME_RULE"  ADD PRIMARY KEY ("FACEBOOK_ID","REF_ID","TYPE") ENFORCED ;
CREATE INDEX USER_INCOME_RULE_REF_ID_IDX ON F9_STG_INSIGHT.USER_INCOME_RULE (REF_ID);
CREATE INDEX USER_INCOME_RULE_CREATED_TIME_IDX ON F9_STG_INSIGHT.USER_INCOME_RULE (CREATED_TIME);
CREATE INDEX USER_INCOME_RULE_CREATED_BY_IDX ON F9_STG_INSIGHT.USER_INCOME_RULE (CREATED_BY);
/* END USER_INCOME_RULE */

/* BEGIN USER_INCOME_RULE_APP */
DROP TABLE "F9_APP_INSIGHT"."USER_INCOME_RULE_APP";
CREATE TABLE "F9_APP_INSIGHT"."USER_INCOME_RULE_APP"  (
    "FACEBOOK_ID" VARCHAR(15 OCTETS) NOT NULL , 
    "INCOME_ID" INTEGER NOT NULL,
    "INCOME_NAME" VARCHAR(255 OCTETS) NOT NULL)
		 COMPRESS YES STATIC   DISTRIBUTE BY HASH("FACEBOOK_ID")    IN "USERSPACE1"  ORGANIZE BY ROW NOT LOGGED INITIALLY;;
ALTER TABLE "F9_APP_INSIGHT"."USER_INCOME_RULE_APP"  ADD PRIMARY KEY ("FACEBOOK_ID") ENFORCED ;
CREATE INDEX USER_INCOME_RULE_APP_REF_ID_IDX ON F9_APP_INSIGHT.USER_INCOME_RULE_APP (INCOME_ID);
/* END USER_INCOME_RULE */