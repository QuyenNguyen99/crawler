var Adapter = function (settings) {

	var mysql = require('mysql');

	var initializeConnectionSettings = function () {
		if (settings.server) {
			settings.host = settings.server;
		}
		if (settings.username) {
			settings.user = settings.username;
		}

		if (!settings.host) {
			throw new Error('Unable to start mysql-activerecord - no server given.');
		}
		if (!settings.port) {
			settings.port = 3306;
		}
		if (!settings.user) {
			settings.user = '';
		}
		if (!settings.password) {
			settings.password = '';
		}
		if (!settings.database) {
			throw new Error('Unable to start mysql-activerecord - no database given.');
		}

		return settings;
	};

	var connection;
	var connectionSettings;
	var pool;
	var list_cache_db = [];
	var limit_cache = 10;

	get_db = function () {
		for (var item of list_cache_db) {
			if (!item.flag_conection) {
				return item;
			}
		}
		if (list_cache_db.length < limit_cache) {
			connectionSettings = initializeConnectionSettings();
			var item = new mysql.createConnection(connectionSettings);
			if (settings.charset) {
				item.query('SET NAMES ' + settings.charset);
			}
			list_cache_db.push(item);
			handleDisconnect(item, list_cache_db.length - 1);
			return item;
		}
		return list_cache_db[Math.floor(Math.random() * limit_cache)];
	}

	if (settings && settings.pool) {
		pool = settings.pool.pool;
		connection = settings.pool.connection;
	} else {
		connectionSettings = initializeConnectionSettings();
		connection = new mysql.createConnection(connectionSettings);
		list_cache_db.push(connection);
	}

	if (settings.charset) {
		connection.query('SET NAMES ' + settings.charset);
	}

	var whereClause = {},
		selectClause = [],
		orderByClause = '',
		groupByClause = '',
		havingClause = '',
		limitClause = -1,
		offsetClause = -1,
		joinClause = [],
		lastQuery = '';

	var resetQuery = function (newLastQuery) {
		whereClause = {};
		selectClause = [];
		orderByClause = '';
		groupByClause = '';
		havingClause = '',
			limitClause = -1;
		offsetClause = -1;
		joinClause = [];
		lastQuery = (typeof newLastQuery === 'string' ? newLastQuery : '');
		rawWhereClause = {};
		rawWhereString = {};
	};

	this.reset_query_string = function (newLastQuery) {
		resetQuery(newLastQuery);
	}

	var rawWhereClause = {};
	var rawWhereString = {};

	var escapeFieldName = function (str) {
		return (typeof rawWhereString[str] === 'undefined' && typeof rawWhereClause[str] === 'undefined' ? '`' + str.replace('.', '`.`') + '`' : str);
	};

	var buildDataString = function (dataSet, separator, clause) {
		if (!clause) {
			clause = 'WHERE';
		}
		var queryString = '', y = 1;
		if (!separator) {
			separator = ', ';
		}
		var useSeparator = true;

		var datasetSize = getObjectSize(dataSet);

		for (var key in dataSet) {
			useSeparator = true;

			if (dataSet.hasOwnProperty(key)) {
				if (clause == 'WHERE' && rawWhereString[key] == true) {
					queryString += key;
				}
				else if (dataSet[key] === null) {
					queryString += escapeFieldName(key) + (clause == 'WHERE' ? " is NULL" : "=NULL");
				}
				else if (typeof dataSet[key] !== 'object') {
					queryString += escapeFieldName(key) + "=" + connection.escape(dataSet[key]);
				}
				else if (typeof dataSet[key] === 'object' && Object.prototype.toString.call(dataSet[key]) === '[object Array]' && dataSet[key].length > 0) {
					if(typeof(dataSet[key][0]) == 'number') {
						queryString += escapeFieldName(key) + ' in (' + dataSet[key].join(',') + ')';
					} else {
						queryString += escapeFieldName(key) + ' in ("' + dataSet[key].join('", "') + '")';
					}
					
				}
				else {
					useSeparator = false;
					datasetSize = datasetSize - 1;
				}

				if (y < datasetSize && useSeparator) {
					queryString += separator;
					y++;
				}
			}
		}
		if (getObjectSize(dataSet) > 0) {
			queryString = ' ' + clause + ' ' + queryString;
		}
		return queryString;
	};

	var buildJoinString = function () {
		var joinString = '';

		for (var i = 0; i < joinClause.length; i++) {
			joinString += (joinClause[i].direction !== '' ? ' ' + joinClause[i].direction : '') + ' JOIN ' + escapeFieldName(joinClause[i].table) + ' ON ' + joinClause[i].relation;
		}

		return joinString;
	};

	var mergeObjects = function () {
		for (var i = 1; i < arguments.length; i++) {
			for (var key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) {
					arguments[0][key] = arguments[i][key];
				}
			}
		}
		return arguments[0];
	};

	var getObjectSize = function (object) {
		var size = 0;
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				size++;
			}
		}
		return size;
	};

	var trim = function (s) {
		var l = 0, r = s.length - 1;
		while (l < s.length && s[l] == ' ') {
			l++;
		}
		while (r > l && s[r] == ' ') {
			r -= 1;
		}
		return s.substring(l, r + 1);
	};

	this.connectionSettings = function () { return connectionSettings; };
	this.connection = function () { return connection; };

	this.where = function (whereSet, whereValue, isRaw) {
		if (typeof whereSet === 'object' && typeof whereValue === 'undefined') {
			whereClause = mergeObjects(whereClause, whereSet);
		}
		else if ((typeof whereSet === 'string' || typeof whereSet === 'number') && typeof whereValue != 'undefined') {
			if (isRaw) {
				rawWhereClause[whereSet] = true;
			}
			whereClause[whereSet] = whereValue;
		}
		else if ((typeof whereSet === 'string' || typeof whereSet === 'number') && typeof whereValue === 'object' && Object.prototype.toString.call(whereValue) === '[object Array]' && whereValue.length > 0) {
			whereClause[whereSet] = whereValue;
		}
		else if (typeof whereSet === 'string' && typeof whereValue === 'undefined') {
			rawWhereString[whereSet] = true;
			whereClause[whereSet] = whereValue;
		}
		return that;
	};

	this.count = function (tableName, responseCallback) {
		if (typeof tableName === 'string') {
			var combinedQueryString = 'SELECT COUNT(*) as count FROM ' + escapeFieldName(tableName)
				+ buildJoinString()
				+ buildDataString(whereClause, ' AND ', 'WHERE');
			var connection = get_db();
			connection.flag_conection = true;
			connection.query(combinedQueryString, function (err, res) {
				connection.flag_conection = false;
				if (err) {
					handleDisconnect(connection);
					responseCallback(err, null);
				} else {
					responseCallback(null, res[0]['count']);
				}
			});
			resetQuery(combinedQueryString);
		}

		return that;
	};

	this.join = function (tableName, relation, direction) {
		joinClause.push({
			table: tableName,
			relation: relation,
			direction: (typeof direction === 'string' ? trim(direction.toUpperCase()) : '')
		});
		return that;
	};

	this.select = function (selectSet) {
		if (Object.prototype.toString.call(selectSet) === '[object Array]') {
			for (var i = 0; i < selectSet.length; i++) {
				selectClause.push(selectSet[i]);
			}
		}
		else {
			if (typeof selectSet === 'string') {
				var selectSetItems = selectSet.split(',');
				for (var i = 0; i < selectSetItems.length; i++) {
					selectClause.push(trim(selectSetItems[i]));
				}
			}
		}
		return that;
	};

	this.comma_separated_arguments = function (set) {
		var clause = '';
		if (Object.prototype.toString.call(set) === '[object Array]') {
			clause = set.join(', ');
		}
		else if (typeof set === 'string') {
			clause = set;
		}
		return clause;
	};

	this.group_by = function (set) {
		groupByClause = this.comma_separated_arguments(set);
		return that;
	};

	this.having = function (set) {
		havingClause = this.comma_separated_arguments(set);
		return that;
	};

	this.order_by = function (set) {
		orderByClause = this.comma_separated_arguments(set);
		return that;
	};

	this.limit = function (newLimit, newOffset) {
		if (typeof newLimit === 'number') {
			limitClause = newLimit;
		}
		if (typeof newOffset === 'number') {
			offsetClause = newOffset;
		}
		return that;
	};

	this.ping = function () {
		connection.ping();
		return that;
	};

	this.insert_core = function (tableName, dataSet, responseCallback, verb, querySuffix) {
		if (typeof verb === 'undefined') {
			var verb = 'INSERT';
		}
		if (Object.prototype.toString.call(dataSet) !== '[object Array]') {
			if (typeof querySuffix === 'undefined') {
				var querySuffix = '';
			}
			else if (typeof querySuffix !== 'string') {
				var querySuffix = '';
			}

			if (typeof tableName === 'string') {
				var combinedQueryString = verb + ' into ' + escapeFieldName(tableName)
					+ buildDataString(dataSet, ', ', 'SET');

				if (querySuffix != '') {
					combinedQueryString = combinedQueryString + ' ' + querySuffix;
				}
				//console.log('insert_core', combinedQueryString);

				var connection = get_db();
				connection.flag_conection = true;
				connection.query(combinedQueryString, function (err, rows) {
					connection.flag_conection = false;
					if (err) {
						handleDisconnect(connection);
					}
					responseCallback(err, rows);

				});
				resetQuery(combinedQueryString);
			}
		}
		else {
			this.doBatchInsert(verb, tableName, dataSet, responseCallback);
		}
		return that;
	};

	this.insert_ignore = function (tableName, dataSet, responseCallback, querySuffix) {
		return this.insert_core(tableName, dataSet, responseCallback, 'INSERT IGNORE', querySuffix);
	};

	this.doBatchInsert = function (verb, tableName, dataSet, responseCallback) {
		if (Object.prototype.toString.call(dataSet) !== '[object Array]') {
			throw new Error('Array of objects must be provided for batch insert!');
		}

		if (dataSet.length === 0) return false;

		var map = [];
		var columns = [];
		var escColumns = [];

		for (var aSet in dataSet) {
			for (var key in dataSet[aSet]) {
				if (columns.indexOf(key) == -1) {
					columns.push(key);
					escColumns.push(escapeFieldName(key));
				}
			}
		}

		for (var i = 0; i < dataSet.length; i++) {
			(function (i) {
				var row = [];

				for (var key in columns) {
					if (dataSet[i].hasOwnProperty(columns[key])) {
						row.push(that.escape(dataSet[i][columns[key]]));
					} else {
						row.push('NULL');
					}
				}

				if (row.length != columns.length) {
					throw new Error('Cannot use batch insert into ' + tableName + ' - fields must match on all rows (' + row.join(',') + ' vs ' + columns.join(',') + ').');
				}
				map.push('(' + row.join(',') + ')');
			})(i);
		}

		that.query(verb + ' INTO ' + escapeFieldName(tableName) + ' (' + escColumns.join(', ') + ') VALUES' + map.join(','), responseCallback);
		return that;
	};

	this.get_query = function (tableName) {
		var combinedQueryString;
		if (typeof tableName === 'string') {
			combinedQueryString = 'SELECT ' + (selectClause.length === 0 ? '*' : selectClause.join(','))
				+ ' FROM ' + escapeFieldName(tableName)
				+ buildJoinString()
				+ buildDataString(whereClause, ' AND ', 'WHERE')
				+ (groupByClause !== '' ? ' GROUP BY ' + groupByClause : '')
				+ (havingClause !== '' ? ' HAVING ' + havingClause : '')
				+ (orderByClause !== '' ? ' ORDER BY ' + orderByClause : '')
				+ (limitClause !== -1 ? ' LIMIT ' + limitClause : '')
				+ (offsetClause !== -1 ? ' OFFSET ' + offsetClause : '');
		}
		return combinedQueryString;
	}

	this.get_core = function (tableName, responseCallback) {
		var combinedQueryString = this.get_query(tableName);
		// console.log('get_core', combinedQueryString);
		if (combinedQueryString) {
			var connection = get_db();
			connection.flag_conection = true;
			connection.query(combinedQueryString, function (err, rows) {
				connection.flag_conection = false;
				if (err) {
					handleDisconnect(connection);
				}
				responseCallback(err, rows);
			});
		}
		resetQuery(combinedQueryString);

		return that;
	};

	this.update_core = function (tableName, newData, responseCallback) {
		if (typeof tableName === 'string') {
			var combinedQueryString = 'UPDATE ' + escapeFieldName(tableName)
				+ buildDataString(newData, ', ', 'SET')
				+ buildDataString(whereClause, ' AND ', 'WHERE')
				+ (limitClause !== -1 ? ' LIMIT ' + limitClause : '');
			//console.log('update_core', combinedQueryString);

			var connection = get_db();
			connection.flag_conection = true;
			// console.log('combinedQueryString', combinedQueryString);
			connection.query(combinedQueryString, function (err, rows) {
				connection.flag_conection = false;
				if (err) {
					handleDisconnect(connection);
				}
				responseCallback(err, rows);
			});
			resetQuery(combinedQueryString);
		}

		return that;
	};

	this.escape = function (str) {
		return connection.escape(str);
	};

	this.delete_core = function (tableName, responseCallback) {
		if (typeof tableName === 'string') {
			var combinedQueryString = 'DELETE FROM ' + escapeFieldName(tableName)
				+ buildDataString(whereClause, ' AND ', 'WHERE')
				+ (limitClause !== -1 ? ' LIMIT ' + limitClause : '');
			//console.log('delete_core', combinedQueryString);

			var connection = get_db();
			connection.flag_conection = true;
			connection.query(combinedQueryString, function (err, rows) {
				connection.flag_conection = false;
				if (err) {
					handleDisconnect(connection);
				}
				responseCallback(err, rows);
			});
			resetQuery(combinedQueryString);
		}

		return that;
	};

	this._last_query = function () {
		return lastQuery;
	};

	this.query_core = function (sqlQueryString, responseCallback) {
		//console.log('query_core', sqlQueryString);
		var connection = get_db();
		connection.flag_conection = true;
		connection.query(sqlQueryString, function (err, rows) {
			connection.flag_conection = false;
			if (err) {
				handleDisconnect(connection);
			}
			// console.log(sqlQueryString);
			responseCallback(err, rows);
		});
		resetQuery(sqlQueryString);
		return that;
	};

	this.disconnect = function () {
		return connection.end();
	};

	this.forceDisconnect = function () {
		return connection.destroy();
	};

	this.releaseConnection = function () {
		pool.releaseConnection(connection);
	};

	this.releaseConnection = function () {
		pool.releaseConnection(connection);
	};

	var reconnectingTimeout = false;

	function handleDisconnect(connectionInstance,i = 0) {
		connectionInstance.on('error', function (err) {
			console.log('handleDisconnect',err);
			if (err.code == 'PROTOCOL_PACKETS_OUT_OF_ORDER' || err.code == 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR' || err.code == 'ECONNREFUSED' || err.code == 'PROTOCOL_CONNECTION_LOST') {
				if (settings.reconnectTimeout === false) return;
				var reconnectingTimeout = setTimeout(function () {
					var item = new mysql.createConnection(connectionInstance.config);
					connectionInstance.end();
					list_cache_db[i] = item;
					handleDisconnect(item,i);
				}, settings.reconnectTimeout || 2000);
				throw err;
			}
		});
	}

	// if (!pool) {
		handleDisconnect(connection);
	// }

	var that = this;

	return this;
};

var mysqlPool; // this should be initialized only once.
var mysqlCharset;

var Pool = function (settings) {
	if (!mysqlPool) {
		var mysql = require('mysql');

		var poolOption = {
			createConnection: settings.createConnection,
			waitForConnections: settings.waitForConnections,
			connectionLimit: settings.connectionLimit,
			queueLimit: settings.queueLimit
		};
		Object.keys(poolOption).forEach(function (element) {
			// Avoid pool option being used by mysql connection.
			delete settings[element];
			// Also remove undefined elements from poolOption
			if (!poolOption[element]) {
				delete poolOption[element];
			}
		});

		// Confirm settings with Adapter.
		var db = new Adapter(settings);
		var connectionSettings = db.connectionSettings();

		Object.keys(connectionSettings).forEach(function (element) {
			poolOption[element] = connectionSettings[element];
		});

		mysqlPool = mysql.createPool(poolOption);
		mysqlCharset = settings.charset;
	}

	this.pool = function () {
		return mysqlPool;
	};

	this.getNewAdapter = function (responseCallback) {
		mysqlPool.getConnection(function (err, connection) {
			if (err) {
				throw err;
			}
			var adapter = new Adapter({
				pool: {
					pool: mysqlPool,
					enabled: true,
					connection: connection
				},
				charset: mysqlCharset
			});
			responseCallback(adapter);
		});
	};

	this.disconnect = function (responseCallback) {
		this.pool().end(responseCallback);
	};

	return this;
};

exports.Adapter = Adapter;
exports.Pool = Pool;
