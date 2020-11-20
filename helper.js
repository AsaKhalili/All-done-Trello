function createElement(tagName, attributes, content){
  // part 1 : create tag 
  var elemnt = document.createElement(tagName); 

  // part 2 : set attributes 
  for (var key in attributes){
    elemnt.setAttribute(key, attributes[key]);
  }

  // part 3 : add content 
  if (typeof content !== "undefined"){
    if (content instanceof HTMLElement){
      elemnt.appendChild(content);
    } else {
      elemnt.innerText = content;
    }
  }

  return elemnt;
}