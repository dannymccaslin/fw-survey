USE surveydata;
DROP TABLE surveytable;
CREATE TABLE surveytable (id INT(4) not null auto_increment primary key ,reason VARCHAR(75), wish VARCHAR(75),dislike VARCHAR(500), likes VARCHAR(500),twitter CHAR(1), facebook CHAR(1), instagram CHAR(1),twitter2 CHAR(1),facebook2 CHAR(1),
instagram2 CHAR(1),youtube CHAR(1),sm_info VARCHAR(500),agerange VARCHAR(20),rentown VARCHAR(20),comres varchar(20), credit VARCHAR(20), paperless VARCHAR(20), debit VARCHAR(20),
 debit-opt VARCHAR(20), debit-why VARCHAR(100) );