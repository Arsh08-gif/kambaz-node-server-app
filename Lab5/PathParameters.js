export default function PathParameters(app) {
 const add = (req, res) => {
   const { a, b } = req.params;
   const sum = parseInt(a) + parseInt(b);
   res.send(sum.toString());
 };
 const substract = (req, res) => {
   const { a, b } = req.params;
   const sub = parseInt(a) - parseInt(b);
   res.send(sub.toString());
 };
 const divide = (req,res) => {
    const {a,b} = req.params;
    const div = parseInt(a) / parseInt(b);
    res.send(div.toString());
 }
 const multiply = (req,res) => {
    const {a,b} = req.params;
    const mult = parseInt(a) * parseInt(b);
    res.send(mult.toString());
 }
 app.get("/lab5/add/:a/:b", add);
 app.get("/lab5/subtract/:a/:b", substract);
 app.get("/lab5/div/:a/:b",divide);
 app.get("/lab5/mult/:a/:b",multiply)
};

