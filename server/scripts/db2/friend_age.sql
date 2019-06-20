/*
CREATE TABLE "F9_APP_INSIGHT"."FRIEND_AGE"  (
    "FACEBOOK_ID" VARCHAR(15 OCTETS) NOT NULL , 
    "AGE" INTEGER NOT NULL, 
    "TOTAL_SIZES" INTEGER, 
    "TOTAL_LINKS" INTEGER)   
   COMPRESS YES STATIC  
   DISTRIBUTE BY HASH("FACEBOOK_ID", "AGE")   
     IN "USERSPACE1"  
   ORGANIZE BY ROW NOT LOGGED INITIALLY ;
ALTER TABLE "F9_APP_INSIGHT"."FRIEND_AGE" ADD PRIMARY KEY ("FACEBOOK_ID", "AGE") ENFORCED ;
CREATE INDEX FRIEND_AGE_AGE_IDX ON F9_APP_INSIGHT.FRIEND_AGE (AGE);
CREATE INDEX FRIEND_AGE_FACEBOOK_ID_IDX ON F9_APP_INSIGHT.FRIEND_AGE (FACEBOOK_ID);
CREATE INDEX FRIEND_AGE_TOTAL_SIZES_IDX ON F9_APP_INSIGHT.FRIEND_AGE (TOTAL_SIZES);
*/

/*
INSERT INTO F9_APP_INSIGHT.FRIEND_AGE(FACEBOOK_ID,AGE,TOTAL_SIZES) 
SELECT c.id1 AS "FACEBOOK_ID",a.age AS "AGE",count(*) AS "TOTAL_SIZES" FROM F9_APP_INSIGHT.user_age a
INNER JOIN F9_APP_INSIGHT.user_friend c ON a.facebook_id = c.id2
INNER JOIN F9_APP_INSIGHT.user_profile p ON c.id1 = p.facebook_id
GROUP BY c.id1,a.age HAVING count(*) > 5
*/

/*
CREATE TABLE "F9_APP_INSIGHT"."USER_AGE_ALL"  (
    "FACEBOOK_ID" VARCHAR(15 OCTETS) NOT NULL , 
    "AGE" INTEGER NOT NULL)   
   COMPRESS YES STATIC  
   DISTRIBUTE BY HASH("FACEBOOK_ID")   
     IN "USERSPACE1"  
   ORGANIZE BY ROW  ;
ALTER TABLE "F9_APP_INSIGHT"."USER_AGE" ADD PRIMARY KEY ("FACEBOOK_ID") ENFORCED ;
CREATE INDEX USER_AGE_AGE_ID_IDX ON F9_APP_INSIGHT.USER_AGE (AGE);
*/


/*
INSERT INTO F9_APP_INSIGHT.FRIEND_AGE(FACEBOOK_ID,AGE,TOTAL_SIZES) 
select facebook_id,AGE,total_sizes from (
SELECT c.id1 AS "FACEBOOK_ID",a.AGE AS "AGE",count(*) AS "TOTAL_SIZES",
ROW_NUMBER() OVER (PARTITION BY c.id1 order by count(*) desc) rownumber FROM F9_APP_INSIGHT.USER_AGE a
INNER JOIN F9_APP_INSIGHT.user_friend c ON a.facebook_id = c.id2
INNER JOIN F9_APP_INSIGHT.user_profile p ON c.id1 = p.facebook_id
INNER JOIN F9_APP_INSIGHT.user_hometown_all d ON c.id1 = d.facebook_id
INNER JOIN F9_APP_INSIGHT.user_hometown_all e ON c.id2 = e.facebook_id AND d.hometown_id = e.hometown_id
where a.facebook_id not in (select facebook_id from F9_APP_INSIGHT.user_age_all)
GROUP BY c.id1,a.AGE HAVING count(*) > 5 order by total_sizes desc) where rownumber in (1,2); 
*/

/*
INSERT INTO F9_APP_INSIGHT.FRIEND_AGE(FACEBOOK_ID,AGE,TOTAL_SIZES) 
select facebook_id,AGE,TOTAL_SIZES from (
select a.facebook_id,d.age,count(*) as "TOTAL_SIZES",ROW_NUMBER() OVER (PARTITION BY a.facebook_id order by count(*) desc) rownumber FROM F9_APP_INSIGHT.user_profile a 
INNER JOIN F9_APP_INSIGHT.user_hometown b ON a.facebook_id = b.facebook_id
INNER JOIN F9_APP_INSIGHT.user_friend c ON a.facebook_id = c.id1
INNER JOIN F9_APP_INSIGHT.user_age d ON c.id2 = d.facebook_id
INNER JOIN F9_APP_INSIGHT.user_hometown_all e ON c.id2 = e.facebook_id AND e.hometown_id = b.hometown_id
where a.facebook_id not in (select facebook_id from F9_APP_INSIGHT.user_age_all)
group by a.facebook_id,d.age having count(*) > 5 order by total_sizes desc) where rownumber in (1,2); 
*/

/*
SELECT a.id1,c.age, count(DISTINCT a.id2) AS "TOTAL_SIZES",COUNT(*) AS "TOTAL_LINKS", count(DISTINCT a.id2) * COUNT(*) AS "SCORE" FROM user_friend a
--INNER JOIN USER_HOMETOWN_ALL h2 ON a.id1 = h2.facebook_id
--INNER JOIN USER_HOMETOWN_ALL h ON a.id2 = h.facebook_id AND h.hometown_id = h2.hometown_id
INNER JOIN user_friend  b ON a.id2 = b.id1
INNER JOIN user_age2 c ON a.id2 = c.facebook_id
INNER JOIN user_age2 d ON b.id2 = d.facebook_id AND d.age = c.age
INNER JOIN USER_FRIEND e ON e.id1 = b.id2 AND e.id2 = a.id1
WHERE a.id1 IN ('100000201729964','1047475951')
GROUP BY a.id1,c.age 
HAVING COUNT(*) > count(DISTINCT a.id2) AND count(DISTINCT a.id2) > 5 
ORDER BY a.id1,total_sizes desc;
*/

/*
SELECT a.id1,a.age,a.total_sizes, a.total_links,a.score FROM (
SELECT a.id1,a.age,max(a.total_sizes) AS "TOTAL_SIZES",count(e.id2) AS "TOTAL_LINKS", count(e.id2) / max(a.total_sizes) AS score,
ROW_NUMBER() OVER (PARTITION BY a.id1 order by (count(e.id2) / max(a.total_sizes)) desc) as rownumber FROM (
SELECT cc.id1,cc.age,cc.list_ids,cc.total_sizes FROM (
SELECT a.id1,b.age,concat(concat(' ',listagg(DISTINCT cast(a.id2 AS CLOB(100000 OCTETS)),' ')),' ') AS "LIST_IDS",
count(*) AS "TOTAL_SIZES",
ROW_NUMBER() OVER (PARTITION BY a.id1 order by count(*) desc) as rownumber FROM USER_FRIEND a
INNER JOIN user_age b ON a.id2 = b.facebook_id
WHERE a.id1 IN (SELECT facebook_id FROM user_company_all WHERE company_id = 149159)
GROUP BY a.id1, b.age HAVING count(*) > 5 ORDER BY a.id1,total_sizes desc
) cc WHERE cc.rownumber IN (1,2)
) a 
INNER JOIN F9_APP_INSIGHT.user_friend d ON d.id1 =  a.id1 AND a.LIST_IDS LIKE concat(concat('% ',d.id2),' %')
INNER JOIN F9_APP_INSIGHT.user_friend e ON e.id1 =  d.id2 AND a.LIST_IDS LIKE concat(concat('% ',e.id2),' %')
GROUP BY a.id1,a.age HAVING count(e.id2) / max(a.total_sizes) > 2.5 ORDER BY a.id1, score DESC
) a WHERE a.rownumber = 1;
*/