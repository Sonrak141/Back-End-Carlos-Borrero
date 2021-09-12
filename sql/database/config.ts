import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
	client: 'mysql',
	connection: {
		host: process.env.HOST,
		user: process.env.USERDB,
		password: process.env.PASSWORDDB,
		database: process.env.DATABASE,
	},
}