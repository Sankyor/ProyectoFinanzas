npm init -y
mkdir src
npm install -D typescript @types/node
npm i -D tsx
npm i -D pkgroll
npm i jsonwebtoken https://www.npmjs.com/package/jsonwebtoken
    npm i --save-dev @types/jsonwebtoken
npm i axios https://www.npmjs.com/package/axios
npm i bcryptjs https://www.npmjs.com/package/bcryptjs
    npm i --save-dev @types/bcryptjs
npm i dotenv https://www.npmjs.com/package/dotenv
npm i express https://www.npmjs.com/package/express
    npm i --save-dev @types/express
npm i nanoid https://www.npmjs.com/package/nanoid

    
npm init @eslint/config@latest

npm install --save-dev --save-exact prettier
    node --eval "fs.writeFileSync('.prettierrc','{}\n')"
    node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
    npm install --save-dev eslint-config-prettier




npm install pg
    npm i --save-dev @types/pg