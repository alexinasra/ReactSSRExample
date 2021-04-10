module.exports = function generateString(len) {
  var text = "";
  var char_list =
    "AdefghklnoVWXpqyBCwxUYZamFGHIuOPQijRbczDEJKLMNstSTrv";
  for (var i = 0; i < len; i++) {
    text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  return text;
}
