angular.module('todoApp', [])
  .controller('TodoListController', function($scope, $http) {
    var todoList = this;
	
    todoList.urlParams = new URLSearchParams(window.location.search);
    todoList.data_url = "https://api.myjson.com/bins/16ez9b";
    todoList.remainingTodos = 0;
    todoList.user = "guest";
    todoList.selectedUser = todoList.user;
    todoList.showTodos = true;

    todoList.setUser = function(user) {
        todoList.user = user;
	todoList.showArchives = false;
        todoList.showTodos = false;
    	
	switch(user.toLowerCase()) {
		case "mom":
			todoList.data_url = "https://api.myjson.com/bins/79i8j";
    			httpRequest("GET", todoList.data_url, null);
			todoList.setQuery(user);
			todoList.selectedUser = user;
			break;
		case "pappa":
			todoList.data_url = "https://api.myjson.com/bins/12thar";
    			httpRequest("GET", todoList.data_url, null);
			todoList.setQuery(user);
			todoList.selectedUser = user;
			break;
		case "jules":
			todoList.data_url = "https://api.myjson.com/bins/9n8nn";
    			httpRequest("GET", todoList.data_url, null);
			todoList.setQuery(user);
			todoList.selectedUser = user;
			break;
		case "celia":
			todoList.data_url = "https://api.myjson.com/bins/s3oer";
    			httpRequest("GET", todoList.data_url, null);
			todoList.setQuery(user);
			todoList.selectedUser = user;
			break;
		case "guest":
			todoList.data_url = "https://api.myjson.com/bins/16ez9b";
    			httpRequest("GET", todoList.data_url, null);
			todoList.setQuery(user);
			todoList.selectedUser = user;
			break;
		default:
			todoList.data_url = "https://api.myjson.com/bins/16ez9b";
    			httpRequest("GET", todoList.data_url, null);
			todoList.setQuery('guest');
			todoList.selectedUser = 'guest';
			break;
	}
    };

    todoList.setQuery = function(query) {
    	todoList.urlParams.append('user', query);
    };

    function httpRequest(type, url, data){
        $http({
	    method: type,
	    url: url,
	    data: data
	}).then(function mySuccess(response) {	
		todoList.todos_data = angular.fromJson(response.data); 
		todoList.remaining();
    		
		todoList.showTodos = true;

		if (todoList.todos_data.deadTodos.length > 0){
		    todoList.showArchives = true;
		}
	    }, function myError(response){
	    	console.log("there was an error: " + response.status);
	});
    }

    function getObjectKeyIndex(obj, keyToFind) {
    	var i = 0;

    	for (key in obj) {
        	if (obj[key].text == keyToFind) {
            		return i;
        	}
        	i++;
    	}

    	return null;
    }

    //Initial data load
    httpRequest("GET", todoList.data_url, null);
    
    if (todoList.urlParams.get('user')) {
	todoList.query = todoList.urlParams.get('user');
    	todoList.setUser(todoList.query);
	todoList.selectedUser = todoList.query;
    }
 
    todoList.addTodo = function() {
      var newTodo = {text:todoList.todoText, done:false};
      todoList.todos_data.todos.push(newTodo);
      todoList.todoText = '';
      
      httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data)); 
    };
 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos_data.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var currentTodos = todoList.todos_data.todos;
      var temp = [];
      angular.forEach(currentTodos, function(todo) {
        if (!todo.done) {
		temp.push(todo);
	} else {
		todoList.showArchives = true;
		todoList.todos_data.deadTodos.push(todo);		
      	} 
      });

      todoList.todos_data.todos = temp;
      httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data));
    };

    todoList.clear = function(data) {
	var ok = confirm(data + " WILL BE PERMENTLY DELETED.");
	
	if (ok) {
	    switch(data) {
		case "todos":			
			todoList.todos_data.todos = [];
			httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data));
	    		break;
		case "deadTodos":
			todoList.todos_data.deadTodos = [];	
			todoList.showArchives = false;
			httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data));
	    		break;
	    	case "everything":			
			todoList.todos_data.todos = [];
			todoList.todos_data.deadTodos = [];	
			todoList.showArchives = false;
			httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data));
	    		break;
    	    }
	}
    };


    todoList.manageTodo = {
	edit: function(todo) {
		todo['editing'] = true;
		todo['edit_text'] = todo.text;
	},
	save: function(todo) {	
		todo['editing'] = false;
		todo.text = todo.edit_text;	    			
		delete todo['editing'];
		delete todo['edit_text'];
	    	httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data));
	},
	cancel: function(todo) {		
		todo['editing'] = false;
		delete todo['editing'];
		delete todo['edit_text'];
	},
	remove: function(todo) {
		var todoIndex = getObjectKeyIndex(todoList.todos_data.todos, todo.text);
	
		var ok = confirm("ARE YOU SURE? YOU CAN'T GET IT BACK ONCE YOU DELETE IT.");    
	
		if (ok) {
	    		todoList.todos_data.todos.splice(todoIndex,1);
	    		httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data));
		}
    	}
    };
  });
