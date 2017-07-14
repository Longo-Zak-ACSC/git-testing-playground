angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;

    /*
     * api.myjson.com/bins/wpi5v
     * $.get("https://api.myjson.com/bins/:id", function(data, textStatus, jqXHR) {});
     *$.ajax({
    	url:"https://api.myjson.com/bins",
    	type:"POST",
    	data:'{"key":"value"}',
    	contentType:"application/json; charset=utf-8",
   	dataType:"json",
    	success: function(data, textStatus, jqXHR){
    		
		}
	});


	$.ajax({
    		url:"https://api.myjson.com/bins/:id",
    		type:"PUT",
    		data:'{"key_updated":"value_updated"}',
    		contentType:"application/json; charset=utf-8",
    		dataType:"json",
    		success: function(data, textStatus, jqXHR){

    		}
	}); 
     *
     *
     */	


    /*
     *
     *
     * LOCAL STORAGE UTILIZED 
     * SO DATA IS NOT LOST ON BROWSER REFRESH
     * IT IS LOST WHEN BROWSER IS CLOSED
    */
    if (localStorage.getItem("todos") !== null) {
    	todoList.todos = JSON.parse(localStorage.todos);
    } else {
    	todoList.todos = [
      	    {text:'learn AngularJS', done:true},
      	    {text:'build an AngularJS app', done:false}
    	];
    }

    if (localStorage.getItem("deadTodos") !== null) {
	todoList.showArchives = true;
	todoList.deadTodos = JSON.parse(localStorage.deadTodos);
    } else {
	todoList.showArchives = false;
    	todoList.deadTodos = [];
    }
 
 
    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
      localStorage.todos = JSON.stringify(todoList.todos);
    };
 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) {
		todoList.todos.push(todo);
	} else {
		todoList.showArchives = true;
		todoList.deadTodos.push(todo);		
      	} 
      });
       
      localStorage.todos = JSON.stringify(todoList.todos); 
      localStorage.deadTodos = JSON.stringify(todoList.deadTodos);
    };
  });
