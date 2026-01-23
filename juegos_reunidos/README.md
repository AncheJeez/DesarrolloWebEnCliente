-- Para crear proyecto React con Sass --
npx create-react-app .
npm install sass --save-dev
npm start

( Innecesario por que React incluye Sass )
npx sass --watch src/styles/main.scss:src/styles/main.css ^
src/components/footer/footer.scss:src/components/footer.css ^
src/components/nav/nav.scss:src/components/nav.css