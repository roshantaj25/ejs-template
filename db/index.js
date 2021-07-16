const mysql = require('mysql2');
const logger = require('../config/logger');
const dbConfigs = require('../config/db.js');

var db = mysql.createPool(dbConfigs);

module.exports.dbInstance = db;

function runQuery(query, params, callback) {
    logger.debug("runQuery = " + query);

    const sql = db.format(query, params);
    logger.debug(sql);

    db.query(query, params, function(err, results) {
        if (err) {
			logger.error("db_query_failed", sql, err);
        }
        callback(err, results);
    });
}

module.exports.runQuery = runQuery;


function runQuerySync(query, params) {
    logger.debug("runQuery = " + query);

	const sql = db.format(query, params);
	logger.debug(sql);

    return new Promise((resolve, reject) => {
		db.query(query, params, function (err, results) {
			if (err) {
				logger.error("db_query_failed", sql, err);
				var url_tmp;
				if(global.fullUrl.length > 128){
					url_tmp = global.fullUrl.substring(0,128);
					logger.info("url_tmp", url_tmp);
				} else {
					url_tmp = global.fullUrl;
				}
				return reject(err);
			}
			resolve(results);
		});
	});
}

module.exports.runQuerySync = runQuerySync;