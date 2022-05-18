var script = {};
(function () {

  script.names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  console.log("Масив : " + script.names);
  console.log("Застосований спосіб селекціонування імен : за першою буквою 'j' ");
  script.names.forEach(i =>
    (i.toLowerCase()[0] == 'j' ? SpeakGoodBye : SpeakHello).speak(i)
  )
  console.log("");
  console.log("Масив : " + script.names);
  console.log("Застосований спосіб селекціонування імен : остача від ділення на 3 chat коду першої букви ріна 0 ");
  script.names.forEach(i => {
    (i.toLowerCase().charCodeAt() % 3 != 0 ? SpeakGoodBye : SpeakHello).speak(i)
  })

})()
