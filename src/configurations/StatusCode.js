//1xx informational response

//2xx successful
const OK = 200
const CREATED = 201

//3xx rediraction

//4xx client error
const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const FORBIDDEN = 403
const NOT_FOUND = 404
const METHOD_NOT_ALLOWED = 405
const DUPLICATE_RESOURCE = 409

//5xx server error
const INTERNAL_SERVER_ERROR = 500

export default {
	OK,
	CREATED,
	BAD_REQUEST,
	UNAUTHORIZED,
	FORBIDDEN,
	NOT_FOUND,
	METHOD_NOT_ALLOWED,
	DUPLICATE_RESOURCE,
	INTERNAL_SERVER_ERROR
}