/* expostar uma require desse módulo */
module.exports.home = function(app, req, res){
  res.render("index", {validacao : {} });
}
