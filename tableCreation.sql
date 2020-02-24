USE surveydata;
DROP TABLE surveytable;
CREATE TABLE surveytable (id INT(4) not null auto_increment primary key ,reason VARCHAR(75), wish VARCHAR(75),dislike VARCHAR(500),like VARCHAR(500),twitter CHAR(1), facebook CHAR(1), instagram CHAR(1),TWITTER2 CHAR(1),facebook2 CHAR(1),
instagram2 CHAR(1),youtube CHAR(1),sm_info VARCHAR(500),agerange VARCHAR(10)rentown VARCHAR(8),comres varchar(15),paperless VARCHAR(3) );