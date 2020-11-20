function createATitle(title){
  var title_ = createElement('p',{class: 'task-box-title'},title);

  return title_;
}

var task_id = 0;

function createNewCard(cardTitle){
  var card_title = createElement('li',{class:'show', id: task_id, draggable: true},);
  task_id++;
  var title_button = createElement('button',{id:'list_buttons'},cardTitle);
  var delete_btn = createElement('button',{class:'del-btn'},'X');

  card_title.addEventListener('dragstart', function(e){
    e.dataTransfer.setData('text/plain', e.target.id);
  });



  card_title.appendChild(title_button);
  card_title.appendChild(delete_btn);

  delete_btn.addEventListener('click', function(){
    card_title.classList.remove('show');
    card_title.classList.add('hide');

    delete_btn.classList.add('hide');
  });
  
  
  //editing
  title_button.addEventListener('click', function(){
    
    //open up editing area
    var edit_space = createElement('input',{class:'edit', placeholder:cardTitle}, );
    card_title.appendChild(edit_space);
    edit_space.focus();

    
    edit_space.addEventListener('keyup', function(e){
      if (e.code === 'Enter'){
        cardTitle = edit_space.value;
        title_button.innerText = cardTitle;
        var newTitle = title_button;
        card_title.appendChild(newTitle);     
        card_title.appendChild(delete_btn);
        edit_space.classList.add('hide');
      }

    });
  });

  return card_title;
}


function createNewTaskBox(title){
  var box = createElement('div', {class: 'task-box'},);
  var box_title = createATitle(title);

  //list of cards 
  var cards_box = createElement('div',{class:'cards-box'},);
  var cards_list = createElement('ul',{class:'list-of-cards'},);

  cards_box.appendChild(cards_list);
  

  //add card button 
  var btn_div = createElement('div',{class:'add-card-btn show'},);
  var add_card_btn = createElement('button',{id:'card-btn'},'Add a Card...');
  btn_div.appendChild(add_card_btn);

  //add card input 
  var container_input = createElement('div',{class:'input-card hide'},);
  var input_area = createElement('input',{class:'input-space-card', type:'text',placeholder:'Enter a title for this card...',required:true},);
  var btn_new_card = createElement('button', {id:'add-card-btn-input'},'Add Card');
  var btn_abort = createElement('button',{id:'input-abort'},);
  var icon = createElement('i',{class:'fas fa-times'},);
  btn_abort.appendChild(icon);
  container_input.appendChild(input_area);
  container_input.appendChild(btn_new_card);
  container_input.appendChild(btn_abort);

  //build the box 
  box.appendChild(box_title);
  box.appendChild(cards_list);
  box.appendChild(btn_div);
  box.appendChild(container_input);

  //what happens when a new card is added: 
  //add button:
  //part 1
  add_card_btn.addEventListener('click', function(){
    btn_div.classList.remove('show');
    btn_div.classList.add('hide');

    container_input.classList.remove('hide');
    container_input.classList.add('show');
    
    input_area.focus();
  });

  //add button - part 2:
  input_area.addEventListener('keyup', function(e){
    if (e.code === 'Enter'){
      var item_added = createNewCard(input_area.value);
      cards_list.appendChild(item_added);
      input_area.value = '';
    }

    input_area.focus();
  });

  //or 
  btn_new_card.addEventListener('click', function(){
    var item_added = createNewCard(input_area.value);
    cards_list.appendChild(item_added);

    input_area.value = '';
    input_area.focus();
  });


  //exit button: 
  btn_abort.addEventListener('click', function(){
    container_input.classList.remove('show');
    container_input.classList.add('hide');

    btn_div.classList.remove('hide');
    btn_div.classList.add('show');  
  });

  //drag and drop 
  cards_list.addEventListener('drop', function(e){
    e.preventDefault();
    var dragged_el = e.dataTransfer.getData('text/plain');
    e.target.appendChild(document.getElementById(dragged_el));
  });

  cards_list.addEventListener('dragover', function(e){
    e.preventDefault();
  });

  return box;
}

// what happens when button is pressed: 
function createAddNewListCTA(){
  //variables for add button
  var container_add_btn = createElement('div',{class: 'add-task-box-btn show'},);
  var btn = createElement('button', {id: 'task-btn'}, 'Add a List');
  //variables for input box 
  var container_input = createElement('div', {class: 'add-new-list hide'},);    
  var input_space = createElement('input', {type: 'text', class:'btn-input-title', placeholder:'Enter Title...', required:true},);
  var add_btn_input = createElement('button', {id: 'Add-list'},'Add List');
  var abort_btn_input = createElement('button', {id: 'abort'},);
  var icon = createElement('i', {class: 'fas fa-times'},);

  container_add_btn.appendChild(btn);

  abort_btn_input.appendChild(icon);
  container_input.appendChild(input_space);
  container_input.appendChild(add_btn_input);
  container_input.appendChild(abort_btn_input);
    
  var page = createElement('section',{class: 'content'},);
  

  page.appendChild(container_add_btn);
  page.appendChild(container_input);

  //button1 : Add List 
  btn.addEventListener('click', function(){
    container_add_btn.classList.remove('show');
    container_add_btn.classList.add('hide');

    container_input.classList.remove('hide');
    container_input.classList.add('show');

    input_space.focus();
  });

  //button2 : Title
  //a New list is gonna get made 
  add_btn_input.addEventListener('click',function(){
    var new_list = createNewTaskBox(input_space.value);
    var position = document.querySelector('.add-new-list'); 
    position.before(new_list);

    input_space.value = '';
    input_space.focus();
  });

  //This also works for when enter is pressed:
  input_space.addEventListener('keyup', function(e){
    if (e.code === 'Enter'){
      var new_list = createNewTaskBox(input_space.value);
      var position = document.querySelector('.add-new-list'); 
      position.before(new_list);

      input_space.value = '';
      input_space.focus();
    }
  });

  //button3 : Exit 
  //no new lists 
  abort_btn_input.addEventListener('click', function(){
    container_input.classList.remove('show');
    container_input.classList.add('hide');
    input_space.value = '';

    container_add_btn.classList.remove('hide');
    container_add_btn.classList.add('show');

    var list_of_elements = document.querySelectorAll('.task-box');
    var last_one = list_of_elements[list_of_elements.length - 1];
    last_one.after(container_add_btn);

  });
  return page;

}

function createMenuBarCTA(){
  var container = document.querySelector('.menu');

  var butn = createElement('button',{class:'menu-btn show'},'Show Menu');
  var menu_title = createElement('p',{class:'menu_title_r hide'},'Menu');
  var close_btn = createElement('button', {class: 'menu-close'},'X');

  var menu_box = createElement('div',{class:'menu-open-now hide'},);
  var options_list = createElement('ul',{},);
  var option = createElement('li',{},'option');

  butn.addEventListener('click', function(){
    butn.classList.remove('show');
    butn.classList.add('hide');
    
    menu_title.classList.remove('hide');
    menu_title.classList.add('show');
    menu_box.classList.remove('hide');
    menu_box.classList.add('show');
  });

  close_btn.addEventListener('click', function(){
    menu_title.classList.remove('show');
    menu_title.classList.add('hide');

    menu_box.classList.remove('show');
    menu_box.classList.add('hide');

    butn.classList.remove('hide');
    butn.classList.add('show');


  });

  menu_box.appendChild(close_btn);
  menu_box.appendChild(options_list);
  menu_box.appendChild(option);
  // menu_box.appendChild(menu_title);
  var page = document.querySelector('.content');
  page.appendChild(menu_box);

  
  container.appendChild(butn);
  container.appendChild(menu_title);

  return container;
}





