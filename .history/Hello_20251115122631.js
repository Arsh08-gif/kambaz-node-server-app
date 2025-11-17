console.log("Hello world!!");
export default function Hello(app) {
    const sayHello = (req, res) => {
        res.send("Life is good!");
    };
    const sayWelcome = (req, res) => {
        res.send("Welcome to Full Stack Development!");
    };

    // app.get('/hello', (req, res) => {
    // res.send('Life is good!')
    // });
    // app.get('/', (req, res) => {
    // res.send('Welcome to Full Stack Development!')
    // });
}
