"use strict";

function rendomUserAge() {
  var list = [];

  for (var i = 0; i < 50; i++) {
    var a = "Mozilla/5.0(WindowsNT10.0;Win64;x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/" + 59 + Math.round(Math.random() * 10) + ".0.3497." + Math.round(Math.random() * 100) + "Safari/537.36";
    list.push(a);
  }

  return list;
}

module.exports = {
  rendomUserAge: rendomUserAge
};