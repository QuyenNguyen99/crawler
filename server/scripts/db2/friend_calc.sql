
/*BEGIN FRIEND CALC SHOOL_3 INFER*/
/*
SELECT a.school_3_id,listagg(DISTINCT a.c,',') AS total_sizes, count(*) AS total_links FROM (
SELECT a.facebook_id,a.school_3_id,list_facebook_id,c FROM user_school_3 a
INNER JOIN user_friend c ON a.facebook_id = c.id2 AND c.id1 = '100000696780165'
INNER JOIN (SELECT school_3_id,concat(concat(' ',listagg(facebook_id,' ')),' ') AS list_facebook_id, count(*) AS c FROM user_school_3 WHERE facebook_id IN (SELECT id2 FROM user_friend WHERE id1 = '100000696780165') GROUP BY school_3_id ORDER BY c DESC LIMIT 3) b ON a.school_3_id = b.school_3_id 

) a
INNER JOIN user_friend b ON a.facebook_id = b.id1 AND a.list_facebook_id LIKE concat(concat('% ',b.id2),' %') 
GROUP BY a.school_3_id;
*/
/*END FRIEND CALC SHOOL_3 INFER*/

/*BEGIN FRIEND CALC MUTUAL*/
/*
SELECT a.id2,count(*) AS c FROM user_friend a 
INNER JOIN user_friend b ON a.id2 = b.id1
WHERE a.id1 = '100000696780165' AND b.id2 IN (SELECT id2 FROM user_friend WHERE id1 = '100000696780165')
GROUP BY a.id2 ORDER BY c DESC;
*/
/*END FRIEND CALC MUTUAL*/