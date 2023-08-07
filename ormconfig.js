const dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.js'],
      migrationsRun:true
    });
    break;
  case 'production':
    Object.assign(dbConfig,{
        type:"postgres",
        url:process.env.DATABASE_URL,
        migrationsRun:true,
        ssl:{
            rejectUnauthorizeed:false,
        }
    })

  default:
    throw new Error('unknown envrioment');
}

module.exports = dbConfig;