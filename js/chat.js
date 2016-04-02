
       var socket = io();
      $(document).ready(function(){

        //var name = prompt("請輸入暱稱","guest");
        var name = "黃彥銘"

        // if(name=="" || name==null){
        //   name = "guest";
        // }

        //tell server
        socket.emit("add user",name);

        //監聽新訊息事件
        socket.on('chat message', function(data){
          appendMessage(data.username+":"+data.msg);
        });

        socket.on('add user',function(data){
          appendMessage(data.username+"已加入");
        });

        socket.on('user left',function(data){
          appendMessage(data.username+"已離開");
        });

        $('#send').click(function(){
          var text = $('#m').val();
          socket.emit('chat message', text);
          $('#m').val('');
          return false;
        });

        $("#m").keydown(function(event){
          if ( event.which == 13 ){
            $('#send').click();
          }
        });

        function appendMessage(msg){
          $('#messages').append($('<li>').text(msg));
          var message = document.getElementById("message_block");
          message.scrollTop = message.scrollHeight;

        }
      });