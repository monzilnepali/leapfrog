let lexer = new Lexer();
let input = 'Andrew->china:hello chine';
var token = lexer.tokenize(input);
var dig = new Diagram();
dig.init(token[0]);