module.exports.iniciaChat = function(app, req, res){

/* recupera os valores contidos na prorpiedade body do request */
  var dadosForm = req.body;
//console.log(dadosForm);
  req.assert('apelido','Nome ou apelido é obrigatório').notEmpty();
  req.assert('apelido','Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

  var erros = req.validationErrors();

  /* Validação do nome do usuário */
  if(erros){
    res.render("index", {validacao : erros});
    return;
  }

/* mensagem para o cliente */
app.get('io').emit(
  'msgParaCliente',
  {apelido: dadosForm.apelido, mensagem: 'acabou de entrar no chat'}
)

  res.render('chat', {dadosForm : dadosForm});
}
