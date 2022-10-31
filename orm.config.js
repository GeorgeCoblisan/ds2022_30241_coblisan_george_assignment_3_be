require('dotenv').config();

module.exports = {
  url: 'postgres://yyrgqgapaawyvt:92aabfd02971c5825b17fa25ad6062349c2133393f36dae8686df22866014130@ec2-44-210-228-110.compute-1.amazonaws.com:5432/d6f7qgfkfl6m44',
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity.js'],
};