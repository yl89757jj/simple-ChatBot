/*
chatServer.js
Author: David Goedicke (da.goedicke@gmail.com)
Closley based on work from Nikolas Martelaro (nmartelaro@gmail.com) as well as Captain Anonymous (https://codepen.io/anon/pen/PEVYXz) who forked of an original work by Ian Tairea (https://codepen.io/mrtairea/pen/yJapwv)
*/

var express = require('express'); // web server application
var app = express(); // webapp
var http = require('http').Server(app); // connects http library to server
var io = require('socket.io')(http); // connect websocket library to server
var serverPort = 8000;


//---------------------- WEBAPP SERVER SETUP ---------------------------------//
// use express to create the simple webapp
app.use(express.static('public')); // find pages in public directory

// start the server and say what port it is on
http.listen(serverPort, function() {
  console.log('listening on *:%s', serverPort);
});
//----------------------------------------------------------------------------//


//---------------------- WEBSOCKET COMMUNICATION -----------------------------//
// this is the websocket event handler and say if someone connects
// as long as someone is connected, listen for messages
io.on('connect', function(socket) {
  console.log('a new user connected');
  var questionNum = 0; // keep count of question, used for IF condition.
  socket.on('loaded', function(){// we wait until the client has loaded and contacted us that it is ready to go.

  socket.emit('answer',"Hello I am \"Lulalulali\"."); //We start with the introduction;
  setTimeout(timedQuestion, 2500, socket,"What is your Name?"); // Wait a moment and respond with a question.

});
  socket.on('message', (data)=>{ // If we get a new message from the client we process it;
        console.log(data);
        questionNum= bot(data,socket,questionNum);	// run the bot function with the new message
      });
  socket.on('disconnect', function() { // This function  gets called when the browser window gets closed
    console.log('user disconnected');
  });
});

var name;

//--------------------------CHAT BOT FUNCTION-------------------------------//
function bot(data,socket,questionNum) {
  var input = data; // This is generally really terrible from a security point of view ToDo avoid code injection
  var answer;
  var question;
  var waitTime;
/// These are the main statments that make up the conversation.
  if (questionNum == 0) {
  answer= 'Hello ' + input + ' :-)';// output response
  waitTime =2000;
  name = input;
  question = 'How old are you?';			    	// load next question
  }
  else if (questionNum == 1) {
  if(parseInt(input)<=10){
  answer = 'Hi! My little '+name+' !'; }
  else if (parseInt(input)<=25){
	answer ='Cool! I am 17, we should be good friends!';}
  else if (parseInt(input)<=60){
 	answer = 'Really? \n You looks much younger than that!';
  }
  else if(parseInt(input)>60){
	answer = 'Wow...\n dont worry, I am good at talking with people from last centry ';
} // output response
  waitTime =6000;
  question = 'Do you code?';			    	// load next question
  }
  else if (questionNum == 2) {
	if(input.toLowerCase().includes('ye')||input.toLowerCase().includes('sure')){
		answer = 'You are a trendsetter, right? LOL ';
	}else{
		answer = 'Come on... I met you in AML class last semester ';
	}
  waitTime =2000;
  question = 'So tell me, do you prefer Java, Python or C/C++?';			    	// load next question
  }



  else if (questionNum == 3) {
	if(input.toLowerCase()=='java'){
		answer = 'Me too! \n Java the Best! ';
	}else if(input.toLowerCase()=='python'){
		answer = 'You! Dark magician!';
	}else if(input.toLowerCase()=='c++'||input.toLowerCase()=='c'){
                answer = 'You are Genius! Carry Me!';
        }else {
		answer = 'Well...if you are happy with that';
	}
  //answer= 'Ok, ' + input+' it is.';
  //socket.emit('changeBG',input.toLowerCase());
  waitTime = 2000;
  question = 'Can you help me for my assignment?';			    	// load next question
  }



  else if (questionNum == 4) {
    if(input.toLowerCase()==='yes'|| input===1){
      answer = 'You are sooooo nice';
      socket.emit('changeBG','Pink');
      waitTime =2000;
      question = 'Ready?';
    }



    else if(input.toLowerCase()==='no'|| input===0){
        socket.emit('changeBG','gray'); /// we really should look up the inverse of what we said befor.
        answer='Fine, I can wait untill you say YES';
	waitTime=2000;
	question = 'Please~~~~';
        questionNum--; // Here we go back in the question number this can end up in a loop
    }else{
      answer='I understand...';
	waitTime=2000;
	question = 'But are you going to help me?';
      questionNum--;
    }
  // load next question
  }



else if (questionNum == 5){
	if(input.toLowerCase()==='yes'|| input===1||input.toLowerCase().includes("ready")||input.toLowerCase().includes('lu')){
		answer = 'Ummm...\n It is an Algorithm Problem';
		waitTime = 2000;
		question= 'Do you know 8-Queens Problem?';
	}else {
    		answer= 'Take your time, friend';// output response
    		waitTime =2000;
    		question = 'Call me, when you are ready';
    		questionNum--;
	}
  }



else if(questionNum == 6){
	if(input.toLowerCase().includes('yes')){
		answer = 'Cool, but we are going to solve a much easier question';
		waitTime = 2000;
		question ='When should we use DFS & BFS?';
	}else{
		answer = 'Me neither...  \n Can you help me to Google it?';
		waitTime =20000;
		question= 'Got it?';
		questionNum--;
	}
}

else if(questionNum == 7){
	if(input.toLowerCase().includes('don')||input.toLowerCase()==='no'){
		answer='Hard to answer?\n Lets begin with...';
	}else{
		answer = 'Guess you got A+ in Algorithm';
	}
	waitTime = 2000;
        question = 'which is going to explore nodes level by level?\n BFS or DFS?';
}


else if(questionNum == 8){
	if(input.toLowerCase()==='bfs'){
		answer = 'plus 100 points to ' +name +' !';
		waitTime = 2000;
		question = 'Now I want to find ALL POSSIBLE pathes between two nodes\n should I use BFS?';
	}else{
		answer = 'DFS starts at the root and explores as far as possible along each branch before backtraking';
		waitTime = 6000;
		question = 'Now you must know \n which is going to explore nodes level by level?';
		questionNum--;
	}
}


else if(questionNum == 9){
	if(input.toLowerCase()==='no'){
		answer = 'Maybe you are right\n BSF is to find shortest path\n I shoud use DFS';
		waitTime = 2000;
		question ='Let me try to solve 8-Queens by DFS... \n ';
	}else {
		answer = 'Umm...But why my codes do not work...';
		waitTime = 2000;
		question =' Are you sure I can find ALL POSSIBLE pathes between two nodes by BFS???';
		questionNum--;
	}
}

else if(questionNum == 10){
	answer = 'Yeah!!! I solve it!!! \n With your Help! ';
	waitTime = 2000;
	question = 'Thank you soooooo much '+ name;
}


else if(questionNum == 11){
	answer = 'Oh, I should go to Interactive Devices Design course now.\n Lets hang out tomorrow!';
	waitTime = 2500;
	question = 'BTW, what is your phone number?';
}


  else{
    answer= 'Will call you later~';// output response

    waitTime =2000;
  }


/// We take the changed data and distribute it across the required objects.
  socket.emit('answer',answer);
  setTimeout(timedQuestion, waitTime,socket,question);
  return (questionNum+1);
}

function timedQuestion(socket,question) {
  if(question!=''){
  socket.emit('question',question);
}
  else{
    //console.log('No Question send!');
  }

}
//----------------------------------------------------------------------------//
