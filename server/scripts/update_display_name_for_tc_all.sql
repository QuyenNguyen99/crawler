/*
update tc_all a inner join (
select a1.id,
concat(
IF(a9.name is not null,concat(a9.name,' => '),''),
IF(a8.name is not null,concat(a8.name,' => '),''),
IF(a7.name is not null,concat(a7.name,' => '),''),
IF(a6.name is not null,concat(a6.name,' => '),''),
IF(a5.name is not null,concat(a5.name,' => '),''),
IF(a4.name is not null,concat(a4.name,' => '),''),
IF(a3.name is not null,concat(a3.name,' => '),''),
IF(a2.name is not null,concat(a2.name,' => '),''),
IF(a1.name is not null,concat(a1.name),'')
) as display_name
from tc_all a1 
left join tc_all a2 ON a1.pid = a2.id
left join tc_all a3 ON a2.pid = a3.id
left join tc_all a4 ON a3.pid = a4.id
left join tc_all a5 ON a4.pid = a5.id
left join tc_all a6 ON a5.pid = a6.id
left join tc_all a7 ON a6.pid = a7.id
left join tc_all a8 ON a7.pid = a8.id
left join tc_all a9 ON a8.pid = a9.id
) b ON a.id = b.id set a.display_name = b.display_name
*/