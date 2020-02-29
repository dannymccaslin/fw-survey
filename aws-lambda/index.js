const mysql = require('mysql');


const con = mysql.createConnection({
    host    : process.env.RDS_HOSTNAME,
    user    : process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port    : process.env.RDS_PORT,
    database: process.env.RDS_DATABASE
});

function stripchar(str) { //strip and replace characters that we don't want in text fields
str = str.replace(/["']/g, '\\"');
str = str.replace(/[&/#+()$~%:;*?<>{}]/g, ' ');
return str;
}

exports.handler = (event, context, callback) => {
    const sResult = JSON.stringify(event);
    var {reason,wish,dislike,like,twitter,facebook,instagram,twitter2,facebook2,instagram2,youtube,sm_info,agerange,rentown,comres,paperless} = JSON.parse(sResult);
    var reason = stripchar(reason);
    var wish = stripchar(wish);
    var dislike = stripchar(dislike);
    var like = stripchar(like);
    var twitter = stripchar(twitter);
    var facebook = stripchar(facebook);
    var instagram = stripchar(instagram);
    var twitter2 = stripchar(twitter2);
    var facebook2 = stripchar(facebook2);
    var instagram2 = stripchar(instagram2);
    var youtube = stripchar(youtube);
    var sminfo = stripchar(sm_info);
    var agerange = stripchar(agerange);
    var rentown = stripchar(rentown);
    var comres = stripchar(comres);
    var paperless = stripchar(paperless);
    console.log(reason, wish, dislike, like);
    
    con.query("INSERT INTO surveytable (reason, wish, dislike, likes, twitter, facebook, instagram, twitter2,facebook2,instagram2,youtube,\
        sm_info, agerange, rentown,comres,paperless) VALUES ('" +reason + "','" +wish+ "','" +dislike+ "','" +like+ "',\
        '" +twitter+ "','" +facebook+ "','" +instagram+ "','" +twitter2+ "','" +facebook2+ "','" +instagram2+ "','" +youtube+ "','" +sminfo+ 
        "','" + agerange+ "','" +rentown+ "','" +comres+ "','" +paperless+ "')", function (error, results, fields) {
        if (error) {
            con.destroy();
            throw error;
        } else {
            // connected!
            console.log(results);
            callback(error, results);
            con.end(function (err) { callback(err, results);});
        }
    });
};